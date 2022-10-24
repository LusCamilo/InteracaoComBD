/**********************************************************************
 * 
 * objetivo: Arquivo responsavel pela manipulação de dados com o BD 
 *      (insert, update, delete, select)
 * autor: Lucas
 * Data criacao: 06/10/2022
 * Versao: 2.0
 * 
***********************************************************************/

//funcao para inserir um novo registro no banco de dados

const insertAluno = async function (aluno) {

    try {

        //import da classe prismaClient, que é respnsavel pelas interacoes com BD
        const { PrismaClient } = require('@prisma/client')

        //instancia da classe PrismaClient
        const prisma = new PrismaClient()

        let sql = `insert into tbl_aluno(
        nome, 
        foto, 
        sexo, 
        rg, 
        cpf,
        email, 
        telefone, 
        celular, 
        data_nasc
    )
    values( 
        '${aluno.nome}',
        '${aluno.foto}',
        '${aluno.sexo}',
        '${aluno.rg}',
        '${aluno.cpf}',
        '${aluno.email}',
        '${aluno.telefone}',
        '${aluno.celular}',
        '${aluno.data_nasc}'
    )`

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

//funcao para atualizar um registro no banco de dados
const updateAluno = async function (aluno) {

    try {

        //import da classe prismaClient, que é respnsavel pelas interacoes com BD
        const { PrismaClient } = require('@prisma/client')

        //instancia da classe PrismaClient
        const prisma = new PrismaClient()

        let sql = `update tbl_aluno set 
            nome        = '${aluno.nome}', 
            foto        = '${aluno.foto}', 
            sexo        = '${aluno.sexo}', 
            rg          = '${aluno.rg}', 
            cpf         = '${aluno.cpf}', 
            email       = '${aluno.email}', 
            telefone    = '${aluno.telefone}', 
            celular     = '${aluno.celular}', 
            data_nasc   = '${aluno.data_nasc}' 
            where id    = '${aluno.id}'
        `

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

//funcao para deletar um registro no banco de dados
const deleteAluno = async function (id) {


    try {

        //import da classe prismaClient, que é respnsavel pelas interacoes com BD
        const { PrismaClient } = require('@prisma/client')

        //instancia da classe PrismaClient
        const prisma = new PrismaClient()

        let sql = `delete from tbl_aluno where id = ${id};`

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
const selectAllAlunos = async function () {

    //import da classe prismaClient, que é respnsavel pelas interacoes com BD
    const { PrismaClient } = require('@prisma/client')

    //instancia da classe PrismaClient
    const prisma = new PrismaClient()

    //criamos um objeto do tipo rsAluno para receber os dados do banco de dados 
    //atraves de um script SQL (select)
    const rsAlunos = await prisma.$queryRaw`select cast(id as float) as id, nome, foto, sexo, rg, cpf, email, telefone, celular, data_nasc from tbl_aluno`

    if (rsAlunos.length > 0)
        return rsAlunos
    else
        return false



}

module.exports = { selectAllAlunos, insertAluno, updateAluno, deleteAluno}