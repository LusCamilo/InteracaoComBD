/**********************************************************************
 * 
 * objetivo: Arquivo responsavel pela manipulação de dados com o BD 
 *      (insert, update, delete, select)
 * autor: Lucas
 * Data criacao: 027/10/2022
 * Versao: 1.0
 * 
***********************************************************************/



const insertCurso = async (curso) => {

    try {
        
        //import da classe prismaClient, que é respnsavel pelas interacoes com BD
        const { PrismaClient } = require('@prisma/client')

        //instancia da classe PrismaClient
        const prisma = new PrismaClient()

        let sql = `insert into tbl_curso(

            nome,
            carga_horaria,
            icone,
            sigla
            
        )
        values( 
            '${curso.nome}',
            ${curso.carga_horaria},
            '${curso.icone}',
            '${curso.sigla}'
        )`
        //executa o script sql no banco de dados ($executeRawUnsafe permite encaminhar um variavel contendo um script
        const result = await prisma.$executeRawUnsafe(sql)

        // verifica se o script foi executado com sucesso no banco de dados
        if (result) {
            return true
        } else {
            return false
        }

    } catch (error) {

        return false

    } 
    
    
}

//funcao para atualizar um registro no banco de dados
const updateCurso = async (curso) => {

    try {

        //import da classe prismaClient, que é respnsavel pelas interacoes com BD
        const { PrismaClient } = require('@prisma/client')

        //instancia da classe PrismaClient
        const prisma = new PrismaClient()

        let sql = `update tbl_curso set 
            nome          = '${curso.nome}',
            carga_horaria = '${curso.carga_horaria}',
            icone         = '${curso.icone}',
            sigla         = '${curso.sigla}'
            where id      = '${curso.id}'
            
        `
        //executa o script sql no banco de dados ($executeRawUnsafe permite encaminhar um variavel contendo um script
        const result = await prisma.$executeRawUnsafe(sql)

        // verifica se on script foi executado com sucesso no banco de dados
        if (result) {
            return true
        } else {
            return false
        }

    } catch (error) {

        return false

    }


}

//funcao para deletar um registro no banco de dados
const deleteCurso = async (id) => {
    try {

        //import da classe prismaClient, que é respnsavel pelas interacoes com BD
        const { PrismaClient } = require('@prisma/client')

        //instancia da classe PrismaClient
        const prisma = new PrismaClient()

        let sql = `delete from tbl_curso where id = ${id};`

        //executa o script sql no banco de dados ($executeRawUnsafe permite encaminhar um variavel contendo um script)
        const result = await prisma.$executeRawUnsafe(sql)

        // verifica se on script foi executado com sucesso no banco de dados
        if (result) {
            return true
        } else {
            return false
        }

    } catch (error) {

        return false

    }
}

//funcao para retornar todos os registros do banco de dados
const selectAllCursos = async () => {

    //import da classe prismaClient, que é respnsavel pelas interacoes com BD
    const { PrismaClient } = require('@prisma/client')

    //instancia da classe PrismaClient
    const prisma = new PrismaClient()

    //criamos um objeto do tipo rsAluno para receber os dados do banco de dados 
    //atraves de um script SQL (select)
    const rsCursos = await prisma.$queryRaw`select cast(id as float) as id, nome, carga_horaria, icone, sigla from tbl_curso`

    if (rsCursos.length > 0)
        return rsCursos

    else
        return false



}
const selectByIDCurso = async (id) => {

    //import da classe prismaClient, que é respnsavel pelas interacoes com BD
    const { PrismaClient } = require('@prisma/client')

    //instancia da classe PrismaClient
    const prisma = new PrismaClient()

    let sql = `select cast(id as float) as 
        id, 
        nome,
        carga_horaria,
        icone,
        sigla
        from tbl_curso
        where id = ${id};
    `

    //atraves de um script SQL (select)
    const rsCurso = await prisma.$queryRawUnsafe(sql)

    if (rsCurso.length > 0) {
        return rsCurso
    }
    else {
        return false
    }
}

module.exports = { selectAllCursos, insertCurso, updateCurso, deleteCurso, selectByIDCurso}