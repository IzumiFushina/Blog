// suzy.js
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const mysql = require('mysql2');

// Configurar a conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'phpmyadmin',
    password: 'Gustavo',
    database: 'mydb',
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        throw err;
    }
    console.log('Conexão com o banco de dados MySQL estabelecida.');
});

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configuração do middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rota padrão para a página suzy.ejs
app.get('/suzy', (req, res) => {
    const comments1 = []; // Substitua isso com os comentários reais do artigo 1
    const comments2 = []; // Substitua isso com os comentários reais do artigo 2
    const comments3 = []; // Substitua isso com os comentários reais do artigo 3

    res.render('suzy', {
        comments1: comments1,
        comments2: comments2,
        comments3: comments3,
    });
});

// Rota para lidar com o envio de comentários (solicitações POST)
app.post('/suzy/comentarios', (req, res) => {
    try {
        // Lógica para processar os comentários
        const novoComentario = {
            user: req.body.user,
            text: req.body.text,
        };

        // Inserir o comentário no banco de dados
        db.query('INSERT INTO comentarios SET ?', novoComentario, (err, results) => {
            if (err) {
                console.error('Erro ao inserir comentário no banco de dados:', err);
                return res.status(500).send('Erro interno do servidor');
            }
            console.log('Comentário inserido com sucesso:', results);
            // Redirecione para a página principal ou faça algo mais
            return res.redirect('/suzy');
        });
    } catch (error) {
        console.error('Erro interno:', error);
        return res.status(500).send('Erro interno do servidor: ' + error.message);
    }
});

// ... (código para outras rotas)

// Porta em que o servidor irá escutar
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
