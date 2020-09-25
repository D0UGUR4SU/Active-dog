const actives = [
    {
        name: "Douglas Souza",
        avatar: "https://avatars2.githubusercontent.com/u/50157211?s=60&v=4",
        whatsapp: "99999999",
        bio: "Passionate about animals and everything that involves the universe of pets.",
        subject: "Dog Walker",
        cost: "15",
        weekday: [0],
        time_from: [720],
        time_to: [1220]
    }
]

const subjects = [
    "Dog Beautician",
    "Dog Host",
    "Dog Photographer",
    "Dog Sitter",
    "Dog Walker",
    "I work in NGOs for dogs",
    "Pet shop",
    "Trainer",
    "Veterinary",
]

const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
]

function getSubject(subjectNumber) {
    const position = +subjectNumber - 1
    return subjects[position]
}

function pageLanding(req, res) {
    return res.render("index.html")
}

function pageSearch(req, res) {
    const filters = req.query
    return res.render("search.html", { actives, filters, subjects, weekdays })
}

function pageWalkDogs(req, res) {
    const data = req.query

    const isNotEmpty = Object.keys(data).length > 0
    if (isNotEmpty) {

        data.subject = getSubject(data.subject)

        actives.push(data)

        return res.redirect("/search")
    }

    return res.render("care-dogs.html", { subjects, weekdays })
}

const express = require('express')
const server = express()

const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

server
    .use(express.static("public"))
    .get("/", pageLanding)
    .get("/search", pageSearch)
    .get("/care-dogs", pageWalkDogs)

    .listen(5500)