/**********************************************************************
 * 
 * objetivo: Arquivo responsavel pela validacao e tratamento dos dados 
 * entre o model e a API
 * autor: Lucas Camilo
 * Data criacao: 06/10/2022
 * Versao: 2.0
 * 
***********************************************************************/

const { MESSAGE_SUCCESS, MESSAGE_ERROR } = require('../messages/config.js')
const novoAluno = async function (aluno) {

    //validacao de campos obrigatorios
    if (aluno.nome == '' || aluno.nome == undefined || aluno.foto == '' || aluno.rg == '' || aluno.cpf == '' || aluno.email == '' || aluno.data_nasc == '') {

        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}

        //validacao para verificar email valido
    } else if (!aluno.email.includes('@')) {

        return {status: 400, message: MESSAGE_ERROR.INVALID_EMAIL}

    } else {

        //import da model de alunos
        const novoAluno = require('../model/DAO/aluno.js')

        //chama a funcao para inserir um novo aluno
        const result = await novoAluno.insertAluno(aluno)


        if (result) {
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM}
        } else {

            return {status: 500, message:MESSAGE_ERROR.INTERNAL_ERROR_DB}

        }

    }

}
const atualizarAluno = async function (aluno) {

    //validacao de campos obrigatorios
    if (aluno.nome == '' || aluno.nome == undefined || aluno.foto == '' || aluno.rg == '' || aluno.cpf == '' || aluno.email == '' || aluno.data_nasc == '') {

        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}

        //validacao para verificar email valido
    } else if (!aluno.email.includes('@')) {

        return {status: 400, message: MESSAGE_ERROR.INVALID_EMAIL}

    }else if (aluno.id == ''|| aluno.id == undefined) {
        
        return {status: 400,  message: MESSAGE_ERROR.REQUIRED_ID}

    } else {

        //import da model de alunos
        const atualizarAluno = require('../model/DAO/aluno.js')

        //chama a funcao para inserir um novo aluno
        const result = await atualizarAluno.updateAluno(aluno)


        if (result) {
            return {status: 201, message: MESSAGE_SUCCESS.UPDATE_ITEM}
        } else {

            return {status: 500, message:MESSAGE_ERROR.INTERNAL_ERROR_DB}

        }

    }

}
const deletarAluno = async function (id) {


    if (id == '' && id == undefined) {
        
        return {status: 400,  message: MESSAGE_ERROR.REQUIRED_ID}

    }else{

        //import da model de alunos
        const deletarAluno = require('../model/DAO/aluno.js')

        //chama a funcao para inserir um novo aluno
        const result = await deletarAluno.deleteAluno(id)


        if (result) {
            return {status: 201, message: MESSAGE_SUCCESS.DELETE_ITEM}
        } else {

            return {status: 500, message:MESSAGE_ERROR.INTERNAL_ERROR_DB}

        }
    }

}
const listarAluno = async function () {

    let dadosAlunosJSON = {}

    const { selectAllAlunos } = require('../model/DAO/aluno.js')

    const dadosAlunos = await selectAllAlunos()

    //Conversão do tipo de dado BigInt para Int (????????????)
    if (dadosAlunos) {

        //dadosAlunos.reverse()

        dadosAlunosJSON.alunos = dadosAlunos
        return dadosAlunosJSON
    } else {
        return false
    }

}

module.exports = { listarAluno, novoAluno, atualizarAluno, deletarAluno }