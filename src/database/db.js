// Importar a dependencia do sqlite3

const sqlite3 = require("sqlite3").verbose()

// Criar o objeto que irá fazer operações no DB
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

// Utilizar o objeto para nossas operações
db.serialize(() => {
    //Criar uma tabela com comandos SQL
    /*db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            image TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)*/

    // Inserir dados na tabela
    const query = `
        INSERT INTO places (
            name,
            image,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);`

    const values = [
        "Papersider",
        "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        "Guilherme Gemballa, Jardim América",
        "Nº 260",
        "Santa Catarina",
        "Rio do Sul",
        "Papéis e Papelão"

    ]

    function afterInsertData(err) {
        if(err){
            return console.log(err)
        }
        console.log("Cadastrado com sucesso")
        console.log(this)
    }

    //db.run(query, values, afterInsertData);


    // Consultar os dados da tabela
    db.all(`SELECT * FROM places`, function(err, rows) {
        if(err){
            return console.log(err)
        }

        console.log("Aqui estão os seus registros:")
        console.log(rows)
    })

    // Deletar um dado da tabela
    /*db.run(`DELETE FROM places WHERE id=?`, [4], function(err) {
        if(err){
            return console.log(err)
        }

        console.log("Registro deletado com sucesso")
    })*/
})