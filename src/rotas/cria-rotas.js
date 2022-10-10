import sgdb from '../../database/sgdb.js'

function cria_rotas(app,nome_rota,nome_base) {

    app.get(nome_rota, function (req, res) {
        console.log('alguém fez requisição GET '+nome_rota);
        res.json(sgdb.db[nome_base])
    })

    app.get(nome_rota+'/:id', function (req, res) {
        console.log('alguém fez requisição GET '+nome_rota);
        console.log(req.params);
        let jogo = sgdb.db[nome_base][req.params.id]
        if (jogo == undefined) {
            res.json({})
        }
        res.json(jogo)
    })

    app.post(nome_rota, function (req, res) {
        console.log('alguém fez requisição POST '+nome_rota);
        console.log('conteúdo do body:', req.body);
        if (sgdb.db[nome_base][req.body.id] != undefined) {
            res.status(400).send('ERRO: ID já existe!')
        } else {
            sgdb.db[nome_base][req.body.id] = req.body
            sgdb.write()
            res.status(200).json(req.body)
        }
    })

    app.put(nome_rota+'/:id', function (req, res) {
        console.log('alguém fez requisição PUT '+nome_rota);
        console.log('conteúdo do body:', req.body);
        console.log('id recebido como parâmetro:', req.params.id);
        if (sgdb.db[nome_base][req.params.id] == undefined) {
            res.status(400).send('ERRO: ID não existe!')
        } else {
            if (req.body.id != req.params.id) {
                res.status(400).send('ERRO: ID diferentes!')
            } else {
                sgdb.db[nome_base][req.params.id] = req.body
                sgdb.write()
                res.status(200).json(req.body)
            }
        }
    })

    app.delete(nome_rota+'/:id', function (req, res) {
        console.log('alguém fez requisição DELETE '+nome_rota);
        console.log('id recebido como parâmetro:', req.params.id);
        if (sgdb.db[nome_base][req.params.id] == undefined) {
            res.status(400).send('ERRO: ID não existe!')
        } else {
            let obj = sgdb.db[nome_base][req.params.id]
            delete sgdb.db[nome_base][req.params.id]
            sgdb.write()
            res.status(200).json(obj)
        }
    })

}

export default cria_rotas 