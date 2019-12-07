var mssql = require('mssql');
const config = {
    user: 'BD18429',
    password: '81131268a',
    server: 'regulus.cotuca.unicamp.br',
    database: 'BD18429'
};

mssql.connect(config)
    .then(conexao => global.conexao = conexao)
    .catch(erro => console.log(erro));

module.exports = mssql;