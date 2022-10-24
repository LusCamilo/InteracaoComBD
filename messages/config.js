/**********************************************************************
 * 
 * objetivo: Arquivo responsavel pela configuracao de variaveis, constantes e mensagens de sistema,
 * autor: Lucas Camilo
 * Data criacao: 13/10/2022
 * Versao: 1.0
 * 
***********************************************************************/

const MESSAGE_ERROR = {

    REQUIRED_FIELDS     : 'Existe(m) campo(s) obrigatorio(s) que deve(m) ser enviado(s)!',
    INVALID_EMAIL       : 'O e-mail informado não é válido',
    CONTENT_TYPE        : 'O cabeçalho da requisição não possui um Content-Type válido',
    EMPTY_BODY          : 'O body da requisição não pode ser vazio',
    NOT_FOUND_DB        : 'Não foram encontrados registros no banco de dados',
    INTERNAL_ERROR_DB   : 'Não foi possivel realizar a operação com o banco de dados' ,
    REQUIRED_ID         : 'ID é necessario para realizar a requisição'

}
const MESSAGE_SUCCESS = {

    INSERT_ITEM     : 'Item criado com sucesso no Banco de Dados',
    UPDATE_ITEM     : 'Item atualizado com sucesso no Banco de Dados',
    DELETE_ITEM     : 'Item excluido com sucesso no Banco de Dados',

}
module.exports = {

    MESSAGE_ERROR,
    MESSAGE_SUCCESS

}