
// comandos para iniciar/manipular o banco de dados
// npm install prisma --save
// npx prisma
// npx prisma init
// npm install @prisma/client

/******************************************************
 * 
 * Objetivo: Arquivo responsavel pela manipulação de dados com o BD 
 *      (insert, update, delete, select)
 * autor: Lucas Camilo
 * Data Criacao: 06/10/2022
 * Versão:1.0
 * 
*******************************************************/


const { MESSAGE_SUCCESS, MESSAGE_ERROR } = require('./messages/config.js')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { application } = require('express')
const { json } = require('body-parser')
const app = express()

//configuracoes do cors para liberar o acesso a API
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    app.use(cors())
    next()
})

//permite receber um JSON nas requisicoes
const jsonParser = bodyParser.json()

/****************************************************************************
* rota para CRUD de aluno, C == create, R == Read, U == Update, D == Delete *
* Data: 10/10/2022                                                          *
****************************************************************************/

app.get('/v1/alunos', cors(), async function (request, response, next) {

    let statusCode
    let message

    const controllerAluno = require('./controller/controllerAluno.js')
    const dadosAlunos = await controllerAluno.listarAluno()

    if (dadosAlunos) {

        statusCode = 200
        message = dadosAlunos

    } else {
        statusCode = 400
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }
    response.status(statusCode)
    response.json(message)

})
app.get('/v1/aluno/:id', cors(), async function (request, response, next) {

    let statusCode
    let message
    let id = request.params.id

    if (id != '' && id != undefined) {
        const controllerAluno = require('./controller/controllerAluno.js')
        const dadosAluno = await controllerAluno.buscarAluno(id)

        if (dadosAluno) {

            statusCode = 200
            message = dadosAluno

        } else {
            statusCode = 400
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    }else{
        
        statusCode = 400
        message == MESSAGE_ERROR.REQUIRED_ID
        
    }
    response.status(statusCode)
    response.json(message)
})
app.post('/v1/aluno', cors(), jsonParser, async function (request, response) {

    let statusCode
    let message
    let headerContentType

    //recebe o tipo de content-type que foi enviado no header da aquisicao  
    headerContentType = request.headers['content-type']

    //validar se content type é do tipo  
    //v1/application/json
    if (headerContentType == 'application/json') {

        //recebe do corpo da mensagem conteudo
        let dadosBody = request.body

        if (JSON.stringify(dadosBody) != '{}') {

            const controllerAluno = require('./controller/controllerAluno.js')
            //encaminha os dados do body
            const novoaluno = await controllerAluno.novoAluno(dadosBody)


            statusCode = novoaluno.status
            message = novoaluno.message

        } else {

            statusCode = 404
            message = MESSAGE_ERROR.EMPTY_BODY

        }

    } else {

        statusCode = 415
        message = MESSAGE_ERROR.CONTENT_TYPE

    }
    response.status(statusCode)
    response.json(message)

})
app.put('/v1/aluno/:id', cors(), jsonParser, async function (request, response) {

    let statusCode
    let message
    let headerContentType

    //recebe o tipo de content-type que foi enviado no header da aquisicao  
    headerContentType = request.headers['content-type']

    if (headerContentType == 'application/json') {

        //recebe do corpo da mensagem conteudo
        let dadosBody = request.body

        if (JSON.stringify(dadosBody) != '{}') {
            //recebe o id enviado por parametro na requisição
            let id = request.params.id

            //validacao do id na requisição
            if (id != '' && id != undefined) {

                dadosBody.id = id
                const controllerAluno = require('./controller/controllerAluno.js')
                //encaminha os dados do body

                const atualizarAluno = await controllerAluno.atualizarAluno(dadosBody)


                statusCode = atualizarAluno.status
                message = atualizarAluno.message

            } else {

                statusCode = 400
                message = MESSAGE_ERROR.REQUIRED_ID

            }

        } else {

            statusCode = 404
            message = MESSAGE_ERROR.EMPTY_BODY

        }

    } else {

        statusCode = 415
        message = MESSAGE_ERROR.CONTENT_TYPE

    }
    response.status(statusCode)
    response.json(message)

})
app.delete('/v1/aluno/:id', cors(), jsonParser, async function (request, response) {

    let statusCode
    let message

    let id = request.params.id


    if (id != '' && id != undefined) {

        const controllerAluno = require('./controller/controllerAluno.js')
        
        const buscarAluno = await controllerAluno.buscarAluno(id)
        
        const excluirAluno = await controllerAluno.deletarAluno(id)

        statusCode = excluirAluno.status
        message = excluirAluno.message

    } else {

        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID

    }

    response.status(statusCode)
    response.json(message)

})
app.get('/v1/cursos', cors(), async function (request, response, next) {

    let statusCode
    let message

    const controllerCurso = require('./controller/controllerCurso.js')
    const dadosCurso = await controllerCurso.listarCurso()

    if (dadosCurso) {

        statusCode = 200
        message = dadosCurso

    } else {
        statusCode = 400
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }
    response.status(statusCode)
    response.json(message)

})
app.get('/v1/curso/:id', cors(), async function (request, response, next) {

    let statusCode
    let message
    let id = request.params.id

    if (id != '' && id != undefined) {
        const controllerCurso = require('./controller/controllerCurso.js')
        const dadosCurso = await controllerCurso.buscarCurso(id)

        if (dadosCurso) {

            statusCode = 200
            message = dadosCurso

        } else {
            statusCode = 400
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    }else{
        
        statusCode = 400
        message == MESSAGE_ERROR.REQUIRED_ID
        
    }
    response.status(statusCode)
    response.json(message)
})
app.post('/v1/curso', cors(), jsonParser, async function (request, response) {

    let statusCode
    let message
    let headerContentType

    //recebe o tipo de content-type que foi enviado no header da aquisicao  
    headerContentType = request.headers['content-type']

    //validar se content type é do tipo  
    //v1/application/json
    if (headerContentType == 'application/json') {

        //recebe do corpo da mensagem conteudo
        let dadosBody = request.body

        if (JSON.stringify(dadosBody) != '{}') {

            const controllerCurso = require('./controller/controllerCurso.js')
            //encaminha os dados do body
            const novocurso = await controllerCurso.novoCurso(dadosBody)


            statusCode = novocurso.status
            message = novocurso.message

        } else {

            statusCode = 404
            message = MESSAGE_ERROR.EMPTY_BODY

        }

    } else {

        statusCode = 415
        message = MESSAGE_ERROR.CONTENT_TYPE

    }
    response.status(statusCode)
    response.json(message)

})
app.put('/v1/curso/:id', cors(), jsonParser, async function (request, response) {

    let id = request.params.id
    let statusCode
    let message
    let headerContentType

    //recebe o tipo de content-type que foi enviado no header da aquisicao  
    headerContentType = request.headers['content-type']

    if (headerContentType == 'application/json') {

        //recebe do corpo da mensagem conteudo
        let dadosBody = request.body

        if (JSON.stringify(dadosBody) != '{}') {
            //recebe o id enviado por parametro na requisição
            

            //validacao do id na requisição
            if (id != '' && id != undefined) {

                dadosBody.id = id
                const controllerCurso = require('./controller/controllerCurso.js')
                //encaminha os dados do body

                const atualizarCurso= await controllerCurso.atualizarCurso(dadosBody)


                statusCode = atualizarCurso.status
                message = atualizarCurso.message

            } else {

                statusCode = 400
                message = MESSAGE_ERROR.REQUIRED_ID

            }

        } else {

            statusCode = 404
            message = MESSAGE_ERROR.EMPTY_BODY

        }

    } else {

        statusCode = 415
        message = MESSAGE_ERROR.CONTENT_TYPE

    }
    response.status(statusCode)
    response.json(message)

})
app.delete('/v1/curso/:id', cors(), jsonParser, async function (request, response) {

    let statusCode
    let message

    let id = request.params.id


    if (id != '' && id != undefined) {

        const controllerCurso = require('./controller/controllerCurso.js')
        
        const buscarCurso = await controllerCurso.buscarCurso(id)
        
        const excluirCurso = await controllerCurso.deletarCurso(id)

        statusCode = excluirCurso.status
        message = excluirCurso.message

    } else {

        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID

    }

    response.status(statusCode)
    response.json(message)

})
app.listen(8080, function () {

    console.log('servidor aguardando requisicoes')

})
