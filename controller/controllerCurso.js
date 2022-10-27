/**********************************************************************
 * 
 * objetivo: Arquivo responsavel pela validacao e tratamento dos dados 
 * entre o model e a API
 * autor: Lucas Camilo
 * Data criacao: 27/10/2022
 * Versao: 1.0
 * 
***********************************************************************/

const {MESSAGE_ERROR, MESSAGE_SUCCESS} = require('../messages/config')

const novoCurso = async (curso) => {

    //validacao de campos obrigatorios
    if (curso.nome == '' || curso.nome == undefined || curso.carga_horaria == '' || curso.carga_horaria == undefined || curso.icone == '' || curso.icone == undefined || curso.sigla == '' || curso.sigla == undefined) {

        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }

    } else {

        //import da model de cursos
        const novocurso = require('../model/DAO/curso.js')

        //chama a funcao para inserir um novo curso
        const result = await novocurso.insertCurso(curso)

        if (result) {
            return { status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }

    }

}
const atualizarCurso = async (curso) => {

    //validacao de campos obrigatorios
    if (curso.nome == '' || curso.nome == undefined || curso.carga_horaria == '' || curso.carga_horaria == undefined || curso.icone == '' || curso.icone == undefined || curso.sigla == '' || curso.sigla == undefined) {

        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }


    } else if (curso.id == '' || curso.id == undefined) {

        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }

    } else {

        //import da model de cursos
        const atualizarCurso = require('../model/DAO/curso.js')

        //chama a funcao para inserir um novo curso
        const result = await atualizarCurso.updateCurso(curso)


        if (result) {
            return { status: 201, message: MESSAGE_SUCCESS.UPDATE_ITEM }
        } else {

            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }

        }

    }

}
const deletarCurso = async (id) => {


    if (id == '' && id == undefined) {

        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }

    } else {

        const buscaDecurso = await buscarCurso(id)

        if (buscaDecurso) {

            //import da model de cursos
            const deletarcurso = require('../model/DAO/curso.js')

            const result = await deletarcurso.deleteCurso(id)

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
const listarCurso = async () => {

    let dadoscursosJSON = {}

    const { selectAllCursos } = require('../model/DAO/curso.js')

    const dadoscursos = await selectAllCursos()

    if (dadoscursos) {

        dadoscursosJSON.cursos = dadoscursos
        return dadoscursosJSON
    } else {
        return false
    }

}
const buscarCurso = async (id) => {

    if (id == '' && id == undefined) {

        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }

    } else {

        let dadoscursoJSON = {}

        const {selectByIDCurso} = require('../model/DAO/curso.js')

        const dadoscurso = await selectByIDCurso(id)

        if (dadoscurso) {

            dadoscursoJSON.curso = dadoscurso
            return dadoscursoJSON

        } else {
            return false
        }
    }

}


module.exports = {novoCurso, atualizarCurso, deletarCurso, listarCurso, buscarCurso}