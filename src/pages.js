const Database = require('./database/db')

const { subjects, weekdays, getSubject, convertHoursToMinutes } = require("./utils/format")



function pageLanding(req, res) {
    return res.render("index.html")
}

async function pageSearch(req, res) {
    const filters = req.query

    if (!filters.subject || !filters.weekday || !filters.time) {
        return res.render("search.html", { filters, subjects, weekdays })
    }

    const timeToMinutes = convertHoursToMinutes(filters.time)

    const query = `
        SELECT take_care.*, professionals.*
        FROM professionals
        JOIN take_care ON (take_care.professional_id = professionals.id)
        WHERE EXISTS (
            SELECT care_schedule.*
            FROM care_schedule
            WHERE care_schedule.take_care_id = take_care.id
            AND care_schedule.weekday = ${filters.weekday}
            AND care_schedule.time_from <= ${timeToMinutes}
            AND care_schedule.time_to > ${timeToMinutes}
        )
        AND take_care.subject = "${filters.subject}"
    `


    try {
        const db = await Database
        const professionals = await db.all(query)

        professionals.map((professional) => {
            professional.subject = getSubject(professional.subject)
        })

        return res.render("search.html", { professionals, filters, subjects, weekdays })

    } catch (error) {
        console.log(error)
    }
}

function pageCareDogs(req, res) {
    return res.render("care-dogs.html", { subjects, weekdays })
}

async function saveForm(req, res) {
    const createProfessional = require('./database/createProfessional')

    const professional = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const take_care = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    const care_schedules = req.body.weekday.map((weekday, index) => {
        return {
            weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }
    })

    try {
        const db = await Database
        await createProfessional(db, { professional, take_care, care_schedules })

        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]
        return res.redirect("/search" + queryString)
    } catch (error) {
        console.log(error)
    }
}

module.exports = { pageLanding, pageSearch, pageCareDogs, saveForm }
