module.exports = (app) => {
    var usuarioDao = require('../app/usuarioDao');

    var conexao = require('../config/custom-mssql');

    //var sess;
    var emailGlobal, senhaGlobal;
    app.get('/', function (req, res) {
        sess = req.session;


        var requisicao = new conexao.Request();
        requisicao.query('select * from produtos', function (err, recordset) {
            console.log(recordset);
            if (err) console.log(err);
            res.render('paginas/inicio', {
                lista: recordset["recordset"]
            });
        });

    });

    app.get('/login', function (request, response) {
        response.render("paginas/login")
        /*
        sess = request.session;

        sess.email;
        sess.senha;
        */
    });

    app.get('/erro', function (request, response) {
        response.render("paginas/erro")
    });

    app.get('/pegarDados', (req, res) => {
        var result = {
            email: emailGlobal,
            senha: senhaGlobal,
        }
        console.log(result);
        res.json(result);
    });
    app.post('/pegarDados', (req, res) => {
        var result = {
            email: emailGlobal,
            senha: senhaGlobal,
        }
        res.json(result);
    });

    /*
    app.get('/admin', (req, res) => {
        sess = req.session;
        if (sess.email) {
            res.write(`<h1>Ola ${sess.email} </h1><br>`);
            res.write('Aguarde para ser redirecionado');

            setTimeout(function () {
                // after 2 seconds
                res.redirect("/");
            }, 2000)
        }
    });

    
    app.get('/logout', (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return console.log(err);
            }
            res.redirect('/');
        });
    });*/

    app.post('/login', async function (req, res) {
        /*
        sess = req.session;
        sess.email = req.body.email;
        res.end('done');
        */
        var email = req.body.email;
        var senha = req.body.senha;

        const dao = new usuarioDao(conexao);


        await dao.buscaPorEmail(email, senha, function (erro, resultados) {
            if (resultados.recordset.length == 0) {
                console.log("Email ou senha errado");
                res.redirect("/erro")
            }

            resultados.recordset.forEach((item) => {
                console.log("Item " + item);
                if (item.senha == senha) {
                    emailGlobal = email;
                    senhaGlobal = senha;
                    res.redirect("/");
                }
                else{
                    console.log("Email ou senha errado");
                    res.redirect("/erro")
                }
            });
        });
    });
}

