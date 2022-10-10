import sgdb from '../database/sgdb.js'
import express from 'express'
import bodyParser from 'body-parser'

await sgdb.init()

const app = express()
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.get('/', function (req, res) {
    res.send('🚒 Hello World')
})

app.get('/jogos', function (req, res) {
    console.log('alguém fez requisição GET /jogos');
    res.json(sgdb.db.jogos)
})

app.get('/jogos/:id', function (req, res) {
    console.log('alguém fez requisição GET /jogos/:id');
    console.log(req.params);
    let jogo = sgdb.db.jogos[req.params.id]
    if (jogo == undefined) {
        res.json({})
    }
    res.json(jogo)
})

app.get('/jogadores', function (req, res) {
    console.log('alguém fez requisição GET /jogadores');
    res.json(sgdb.db.jogadores)
})

app.get('/jogadores/:id', function (req, res) {
    console.log('alguém fez requisição GET /jogadores/:id');
    console.log(req.params);
    let jogador = sgdb.db.jogadores[req.params.id]
    if (jogador == undefined) {
        res.json({})
    }
    res.json(jogador)
})

app.post('/jogos', function (req, res) {
    console.log('alguém fez requisição POST /jogos');
    console.log('conteúdo do body:', req.body);
    if (sgdb.db.jogos[req.body.id] != undefined) {
        res.status(400).send('ERRO: ID já existe!')
    } else {
        sgdb.db.jogos[req.body.id] = req.body
        sgdb.write()
        res.status(200).json(req.body)
    }
})

app.put('/jogos/:id', function (req, res) {
    console.log('alguém fez requisição PUT /jogos');
    console.log('conteúdo do body:', req.body);
    console.log('id recebido como parâmetro:', req.params.id);
    if (sgdb.db.jogos[req.params.id] == undefined) {
        res.status(400).send('ERRO: ID não existe!')
    } else {
        if (req.body.id != req.params.id) {
            res.status(400).send('ERRO: ID diferentes!')
        } else {
            sgdb.db.jogos[req.params.id] = req.body
            sgdb.write()
            res.status(200).json(req.body)
        }
    }
})

app.delete('/jogos/:id', function (req, res) {
    console.log('alguém fez requisição DELETE /jogos');
    console.log('id recebido como parâmetro:', req.params.id);
    if (sgdb.db.jogos[req.params.id] == undefined) {
        res.status(400).send('ERRO: ID não existe!')
    } else {
        let obj = sgdb.db.jogos[req.params.id] 
        delete sgdb.db.jogos[req.params.id]
        sgdb.write()
        res.status(200).json(obj)
    }
})


app.listen(3000, () => {
    console.log('🔥 estou escutando na porta 3000');
})

