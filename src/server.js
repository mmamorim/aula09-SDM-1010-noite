import sgdb from '../database/sgdb.js'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import cria_rotas from './rotas/cria-rotas.js'

await sgdb.init()

const app = express()
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(cors())

app.get('/', function (req, res) {
    res.send('🚒 Hello World')
})

cria_rotas(app,'/jogos','jogos')
cria_rotas(app,'/jogadores','jogadores')
cria_rotas(app,'/frutas','frutas') 


app.listen(3000, () => {
    console.log('🔥 estou escutando na porta 3000');
})

