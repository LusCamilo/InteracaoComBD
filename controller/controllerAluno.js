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
const novoAluno = async (aluno) => {

    //validacao de campos obrigatorios
    if (aluno.nome == '' || aluno.nome == undefined || aluno.foto == '' || aluno.foto == undefined || aluno.rg == '' || aluno.rg == undefined || aluno.cpf == '' || aluno.cpf == undefined || aluno.email == '' || aluno.email == undefined || aluno.data_nasc == '' || aluno.data_nasc == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
        //validacao para verificar email valido
    } else if (!aluno.email.includes('@')) {

        return { status: 400, message: MESSAGE_ERROR.INVALID_EMAIL }

    } else {

        //import da model de alunos
        const novoAluno = require('../model/DAO/aluno.js')
        //import da model AlunoCurso (tabela de relação entre aluno e curso)
        const novoAlunoCurso = require('../model/DAO/aluno_curso.js')
        //chama a funcao para inserir um novo aluno
        const resultnovoAluno = await novoAluno.insertAluno(aluno)

        if (resultnovoAluno) {

            let idNovoAluno = await novoAluno.selectLastId()

            if (idNovoAluno > 0) {

                let alunoCurso = {}
                //retorna o ano corrente 
                let anoMatricula = new Date().getFullYear()
                //cria a matricula do aluno
                let numeroMatricula = `${idNovoAluno}${aluno.curso[0].idCurso}${anoMatricula}`

                //cria o objeto json com todas as chaves e valores
                alunoCurso.idAluno = idNovoAluno
                alunoCurso.idCurso = aluno.curso[0].idCurso
                alunoCurso.matricula = numeroMatricula
                alunoCurso.statusAluno = 'cursando'

                const resultNovoAlunoCurso = await novoAlunoCurso.insertAlunoCurso(alunoCurso)

                if (resultNovoAlunoCurso) {
                    return { status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM }
                } else {
                    await deletarAluno(idNovoAluno)
                    return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
                }
            } else {
                await deletarAluno(idNovoAluno)
                return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
            }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}
const atualizarAluno = async (aluno) => {

    //validacao de campos obrigatorios
    if (aluno.nome == '' || aluno.nome == undefined || aluno.foto == '' || aluno.foto == undefined || aluno.rg == '' || aluno.rg == undefined || aluno.cpf == '' || aluno.cpf == undefined || aluno.email == '' || aluno.email == undefined || aluno.data_nasc == '' || aluno.data_nasc == undefined) {

        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }

        //validacao para verificar email valido
    } else if (!aluno.email.includes('@')) {

        return { status: 400, message: MESSAGE_ERROR.INVALID_EMAIL }

    } else if (aluno.id == '' || aluno.id == undefined) {

        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }

    } else {

        //import da model de alunos
        const atualizarAluno = require('../model/DAO/aluno.js')

        //chama a funcao para inserir um novo aluno
        const result = await atualizarAluno.updateAluno(aluno)


        if (result) {
            return { status: 201, message: MESSAGE_SUCCESS.UPDATE_ITEM }
        } else {

            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }

        }

    }

}
const deletarAluno = async (id) => {


    if (id == '' && id == undefined) {

        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }

    } else {

        const buscaDeAluno = await buscarAluno(id)

        if (buscaDeAluno) {

            //import da model de alunos
            const deletarAluno = require('../model/DAO/aluno.js')

            const result = await deletarAluno.deleteAluno(id)

            if (result) {

                return { status: 201, message: MESSAGE_SUCCESS.DELETE_ITEM }

            } else {

                return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }

            }
        } else {

            return { status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB }

        }

    }
}
const listarAluno = async () => {

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
const buscarAluno = async (id) => {

    if (id == '' && id == undefined) {

        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }

    } else {

        let dadosAlunoJSON = {}

        const { selectByIdAluno } = require('../model/DAO/aluno.js')
        const { selectAlunoCurso } = require('../model/DAO/aluno_curso.js')

        const dadosAluno = await selectByIdAluno(id)

        if (dadosAluno) {

            const dadosAlunoCurso = await selectAlunoCurso(id)

            if (dadosAlunoCurso) {

                //adiciona a chave curso dentro do objeto dos dados do aluno e 
                //acrescenta os dados do curso do Aluno

                dadosAluno[0].curso = dadosAlunoCurso

                //Criamos uma chave alunos no JSON para retornar o array de alunos
                dadosAlunoJSON.aluno = dadosAluno

                return dadosAlunoJSON

            } else {

                dadosAlunoJSON.aluno = dadosAluno
                return dadosAlunoJSON
                
            }

        } else {
            return false
        }
    }

}

module.exports = { listarAluno, novoAluno, atualizarAluno, deletarAluno, buscarAluno }