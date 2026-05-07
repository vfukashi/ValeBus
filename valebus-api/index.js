const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'valebus'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
    } else {
        console.log('Conectado ao Banco de Dados ValeBus!');
    }
});

// ROTA DE CADASTRO
app.post('/cadastro', (req, res) => {
    const { name, email, password } = req.body;
    const query = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, SHA2(?, 256))";
    db.query(query, [name, email, password], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ erro: "Erro ao cadastrar no banco." });
        }
        res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
    });
});

// LOGIN
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = "SELECT id, nome, email FROM usuarios WHERE email = ? AND senha = SHA2(?, 256)";
    db.query(query, [email, password], (err, result) => {
        if (err) return res.status(500).json({ erro: err });
        if (result.length > 0) {
            res.json({ mensagem: "Login realizado!", usuario: result[0] });
        } else {
            res.status(401).json({ mensagem: "E-mail ou senha incorretos." });
        }
    });
});

// Buscar todas as linhas (para listar na Home)
app.get('/linhas', (req, res) => {
    const query = "SELECT id, codigo, nome FROM linhas ORDER BY codigo";
    db.query(query, (err, result) => {
        if (err) return res.status(500).json({ erro: err });
        res.json(result);
    });
});

// ⚠️ DEVE VIR ANTES de /linhas/:id — senão o Express confunde com id = "1/horarios"
// Buscar horários de uma linha pelo ID (usado na Home para calcular próximo/último)
app.get('/linhas/:id/horarios', (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT sl.id as sub_linha_id, sl.codigo, sl.sentido,
               h.dia_tipo, h.horario, h.observacao
        FROM sub_linhas sl
        JOIN horarios h ON h.sub_linha_id = sl.id
        WHERE sl.linha_id = ?
        ORDER BY sl.id, h.dia_tipo, h.horario
    `;
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ erro: err });
        res.json(result);
    });
});

// Buscar detalhes completos de uma linha pelo ID
app.get('/linhas/:id', (req, res) => {
    const { id } = req.params;

    db.query("SELECT * FROM linhas WHERE id = ?", [id], (err, linhas) => {
        if (err) return res.status(500).json({ erro: err });
        if (linhas.length === 0) return res.status(404).json({ erro: "Linha não encontrada" });

        const linha = linhas[0];

        db.query("SELECT * FROM sub_linhas WHERE linha_id = ?", [id], (err, subLinhas) => {
            if (err) return res.status(500).json({ erro: err });

            if (subLinhas.length === 0) {
                return res.json({ ...linha, sub_linhas: [] });
            }

            const subLinhaIds = subLinhas.map(s => s.id);

            db.query(
                "SELECT * FROM horarios WHERE sub_linha_id IN (?) ORDER BY horario",
                [subLinhaIds],
                (err, horarios) => {
                    if (err) return res.status(500).json({ erro: err });

                    const subLinhasComHorarios = subLinhas.map(sub => ({
                        ...sub,
                        horarios: horarios.filter(h => h.sub_linha_id === sub.id)
                    }));

                    res.json({ ...linha, sub_linhas: subLinhasComHorarios });
                }
            );
        });
    });
});

// ─── Rota: listar alertas ativos ─────────────────────────────────────────────
// Adicione este bloco no seu index.js junto às outras rotas

app.get('/alertas', (req, res) => {
    const sql = `
    SELECT id, tipo, titulo, descricao, linha, criado_em
    FROM alertas
    WHERE ativo = 1
    ORDER BY criado_em DESC
  `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar alertas:', err);
            return res.status(500).json({ erro: 'Erro ao buscar alertas.' });
        }
        res.json(results);
    });
});

// ─── Rota: desativar alerta (dispensar) ──────────────────────────────────────
// Chamada quando o usuário aperta "Dispensar" em um alerta

app.patch('/alertas/:id/desativar', (req, res) => {
    const { id } = req.params;

    const sql = `UPDATE alertas SET ativo = 0 WHERE id = ?`;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erro ao desativar alerta:', err);
            return res.status(500).json({ erro: 'Erro ao desativar alerta.' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ erro: 'Alerta não encontrado.' });
        }
        res.json({ mensagem: 'Alerta desativado com sucesso.' });
    });
});

// ─── Rotas de favoritos ───────────────────────────────────────────────────────
// Adicione este bloco no seu index.js junto às outras rotas

// Helper: retorna o dia_tipo baseado no dia da semana atual
function getDiaTipo() {
  const dia = new Date().getDay(); // 0=Dom, 1=Seg ... 6=Sab
  if (dia === 0) return 'domingo_feriado';
  if (dia === 6) return 'sabado';
  return 'semana';
}

// ─────────────────────────────────────────────────────────────────────────────
// GET /favoritos/:usuario_id
// Retorna as linhas favoritas do usuário com o próximo horário do dia
// ─────────────────────────────────────────────────────────────────────────────
app.get('/favoritos/:usuario_id', (req, res) => {
  const { usuario_id } = req.params;
  const diaTipo   = getDiaTipo();
  const horaAtual = new Date().toTimeString().slice(0, 8); // HH:MM:SS

  const sql = `
    SELECT
      l.id         AS linha_id,
      l.codigo,
      l.nome,
      l.descricao,
      (
        SELECT CONCAT(sl.sentido, '|', sl.origem, '|', TIME_FORMAT(h.horario, '%H:%i'))
        FROM sub_linhas sl
        JOIN horarios h ON h.sub_linha_id = sl.id
        WHERE sl.linha_id = l.id
          AND h.dia_tipo  = ?
          AND h.horario   > ?
        ORDER BY h.horario ASC
        LIMIT 1
      ) AS proximo_raw
    FROM favoritos f
    JOIN linhas l ON l.id = f.linha_id
    WHERE f.usuario_id = ?
    ORDER BY l.codigo ASC
  `;

  db.query(sql, [diaTipo, horaAtual, usuario_id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar favoritos:', err);
      return res.status(500).json({ erro: 'Erro ao buscar favoritos.' });
    }

    const favoritos = results.map(row => {
      let proximo = null;
      if (row.proximo_raw) {
        const [sentido, origem, horario] = row.proximo_raw.split('|');
        proximo = { sentido, origem, horario };
      }
      return {
        linha_id:  row.linha_id,
        codigo:    row.codigo,
        nome:      row.nome,
        descricao: row.descricao,
        proximo,
      };
    });

    res.json(favoritos);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /favoritos/ids?usuario_id=X&linha_id=Y
// Retorna se uma linha específica está favoritada pelo usuário
// Usado pela LineDetailScreen para saber se a estrela fica cheia ou vazia
// ─────────────────────────────────────────────────────────────────────────────
app.get('/favoritos/ids', (req, res) => {
  const { usuario_id, linha_id } = req.query;

  if (!usuario_id || !linha_id) {
    return res.status(400).json({ erro: 'usuario_id e linha_id são obrigatórios.' });
  }

  const sql = `
    SELECT id FROM favoritos WHERE usuario_id = ? AND linha_id = ? LIMIT 1
  `;

  db.query(sql, [usuario_id, linha_id], (err, results) => {
    if (err) {
      console.error('Erro ao verificar favorito:', err);
      return res.status(500).json({ erro: 'Erro interno.' });
    }
    res.json({ favoritado: results.length > 0 });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /favoritos
// Adiciona uma linha aos favoritos  { usuario_id, linha_id }
// ─────────────────────────────────────────────────────────────────────────────
app.post('/favoritos', (req, res) => {
  const { usuario_id, linha_id } = req.body;

  if (!usuario_id || !linha_id) {
    return res.status(400).json({ erro: 'usuario_id e linha_id são obrigatórios.' });
  }

  const sql = `INSERT IGNORE INTO favoritos (usuario_id, linha_id) VALUES (?, ?)`;

  db.query(sql, [usuario_id, linha_id], (err) => {
    if (err) {
      console.error('Erro ao favoritar:', err);
      return res.status(500).json({ erro: 'Erro ao salvar favorito.' });
    }
    res.json({ mensagem: 'Linha favoritada com sucesso.' });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /favoritos
// Remove uma linha dos favoritos  { usuario_id, linha_id }
// ─────────────────────────────────────────────────────────────────────────────
app.delete('/favoritos', (req, res) => {
  const { usuario_id, linha_id } = req.body;

  if (!usuario_id || !linha_id) {
    return res.status(400).json({ erro: 'usuario_id e linha_id são obrigatórios.' });
  }

  const sql = `DELETE FROM favoritos WHERE usuario_id = ? AND linha_id = ?`;

  db.query(sql, [usuario_id, linha_id], (err, result) => {
    if (err) {
      console.error('Erro ao desfavoritar:', err);
      return res.status(500).json({ erro: 'Erro ao remover favorito.' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Favorito não encontrado.' });
    }
    res.json({ mensagem: 'Favorito removido com sucesso.' });
  });
});

app.listen(3000, '0.0.0.0', () => {
    console.log("Servidor ValeBus rodando na porta 3000");
});