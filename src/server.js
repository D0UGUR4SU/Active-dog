const express = require('express')
const server = express()

const { pageLanding, pageSearch, pageCareDogs, saveForm } = require('./pages')

const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

server
    .use(express.urlencoded({ extended: true }))
    .use(express.static("public"))
    .get("/", pageLanding)
    .get("/search", pageSearch)
    .get("/care-dogs", pageCareDogs)
    .post("/save-form", saveForm)

    .listen(5500)