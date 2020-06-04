const express = require("express")
const server = express()


// Utilizando template engine (Nunjucks)
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// Configurar arquivos estáticos (Pasta pública)
server.use(express.static("public"))


// Configurar rotas
server.get("/", (req, res) => {
    return res.render("index.html")
})
server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})
server.get("/search", (req, res) => {
    return res.render("search-results.html")
})


// Ligar o servidor
server.listen(3000)