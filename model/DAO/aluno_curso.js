/**********************************************************************
 * 
 * objetivo: Arquivo responsavel pela manipulação de dados com o BD 
 *      (insert, update, delete, select)
 * autor: Lucas
 * Data criacao: 31/10/2022
 * Versao: 1.0
 * 
***********************************************************************/

const insertAlunoCurso = async (alunoCurso) => {

    try {

        //import da classe prismaClient, que é respnsavel pelas interacoes com BD
        const { PrismaClient } = require('@prisma/client')

        //instancia da classe PrismaClient
        const prisma = new PrismaClient()

        let sql = `insert into tbl_aluno_curso
        (
            id_aluno, 
            id_curso,
            matricula,
            status_aluno
        )values( 
            '${alunoCurso.idAluno}',
            '${alunoCurso.idCurso}', 
            '${alunoCurso.matricula}',
            '${alunoCurso.statusAluno}'  
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
const selectAlunoCurso = async (idAluno) => {

  //import da classe prismaClient, que é respnsavel pelas interacoes com BD
  const { PrismaClient } = require('@prisma/client')

  //instancia da classe PrismaClient
  const prisma = new PrismaClient()

  let sql = `
        select cast(tbl_curso.id as float) as id_curso, tbl_curso.sigla as sigla_curso, tbl_curso.nome as nome_curso, tbl_curso.carga_horaria,
            tbl_aluno_curso.matricula, tbl_aluno_curso.status_aluno
            from tbl_aluno
                inner join tbl_aluno_curso 
                    on tbl_aluno.id = tbl_aluno_curso.id_aluno
                inner join tbl_curso 
                    on tbl_curso.id = tbl_aluno_curso.id_curso
        where tbl_aluno.id = ${idAluno};
    `
    const rsAlunoCurso = await prisma.$queryRawUnsafe(sql)

    if (rsAlunoCurso.length > 0) {
        return rsAlunoCurso
    } else {
        return false
    }


}

module.exports = {insertAlunoCurso, selectAlunoCurso}