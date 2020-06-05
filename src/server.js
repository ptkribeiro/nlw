const express = require("express")
const server = express()

// Pegar o bd
const db = require("./database/db")


// Utilizando template engine (Nunjucks)
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// Configurar arquivos estáticos (Pasta pública)
server.use(express.static("public"))

// Habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))


// Configurar rotas
server.get("/", (req, res) => {
        return res.render("index.html")
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.post("/create-point", (req, res) => {
    // Inserir dados no bando de dados
    
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
        req.body.name,
        req.body.image,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if(err){
            console.log(err)
            return res.send("Erro no cadastro!")
            
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", {saved: true})
    }

    db.run(query, values, afterInsertData);
})

server.get("/search", (req, res) => {
    const search = req.query.search

    if(search == "") {
        // Pesquisa vazia
        return res.render("search-results.html", {total: 0})
    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err){
            return console.log(err)
        }

        const total = rows.length
        return res.render("search-results.html", {places: rows, total})
    })
    
})


// Ligar o servidor
server.listen(3000)