const express = require('express')
const server = express()

<<<<<<< HEAD
const { pageLanding, pageSearch, pageCareDogs, saveForm} = require('./pages')
=======
const { pageLanding, pageSearch, pageCareDogs, saveForm } = require('./pages')
>>>>>>> master

const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

server
<<<<<<< HEAD
    .use(express.urlencoded({ extended: true}))
=======
    .use(express.urlencoded({ extended: true }))
>>>>>>> master
    .use(express.static("public"))
    .get("/", pageLanding)
    .get("/search", pageSearch)
    .get("/care-dogs", pageCareDogs)
    .post("/save-form", saveForm)

    .listen(5500)