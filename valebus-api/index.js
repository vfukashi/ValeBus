const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Conexão com o seu banco de dados
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
    // Usando SHA2 para segurança da senha
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

// IMPORTANTE: '0.0.0.0' é fundamental para o Android Studio
app.listen(3000, '0.0.0.0', () => {
    console.log("Servidor ValeBus rodando na porta 3000");
});