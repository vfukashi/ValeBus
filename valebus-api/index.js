const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Conexão
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234', 
    database: 'valebus'
});

db.connect((err) => {
    if (err) console.error('Erro ao conectar ao MySQL:', err.message);
    else console.log('Conectado ao Banco ValeBus com sucesso!');
});

// LOGIN E CADASTRO (Mantidos e simplificados)
app.post('/cadastro', (req, res) => {
    const { name, email, password } = req.body; 
    db.query("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, SHA2(?, 256))", [name, email, password], (err) => {
        if (err) return res.status(500).json({ error: "Erro" });
        res.status(201).json({ message: "OK" });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query("SELECT id, nome FROM usuarios WHERE email = ? AND senha = SHA2(?, 256)", [email, password], (err, result) => {
        if (err || result.length === 0) return res.status(401).json({ error: "Erro" });
        res.json(result[0]);
    });
});

// ROTA DE BUSCA CORRIGIDA PARA A TABELA 'LINHAS'
app.get('/buscar', (req, res) => {
    const termo = req.query.q || '';
    const p = `%${termo}%`;
    
    // Mudamos de 'onibus' para 'linhas' que é o nome real no seu MySQL
    const query = "SELECT id, numero_linha, nome_linha FROM linhas WHERE numero_linha LIKE ? OR nome_linha LIKE ?";

    db.query(query, [p, p], (err, result) => {
        if (err) {
            console.error("ERRO NO BANCO:", err.sqlMessage);
            return res.json([]); // Retorna lista vazia para o app não travar
        }
        res.json(result);
    });
});

app.listen(3000, '0.0.0.0', () => {
    console.log("Servidor ON para Emulador Android");
});