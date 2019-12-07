class usuarioDao { // contrutor que vai receber uma instância da conexão do BD chamada db
    constructor(db) { 
        this._db = new db.Request(); 
    }

    lista(callback) { 
            this._db.query('select * from conta', function (err, recordset) { 
            callback(err, recordset);
            })
    } 
    

    adiciona(usuario,callback)
    {
     var email = usuario.email;
     var senha = usuario.senha;
     this._db.query("INSERT INTO conta (email, senha) VALUES ('"+email+"','"+senha+"')",
     
      (err) => {
          if(err){
            console.log("Erro inserção de usuario: " + err);
            callback(err);
          }          
        })
    }

    buscaPorEmail(email, senha, callback)
    {
        this._db.query("SELECT * FROM conta WHERE email = '"+email+"'", function(err, recordset){
            callback(err, recordset);
        });           
    }

    buscaSenha(senha, callback){
        this._db.query("select * from conta where email = '" + senha + "'", function(err, recordset){
            callback(err, recordset); // retorna o o erro (se existir), e o usuário
        });
    }
} 


module.exports = usuarioDao;

