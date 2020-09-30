module.exports = async function (db, { professional, take_care, care_schedules }) {

    const insertedProfessional = await db.run(`
        INSERT INTO professionals (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${professional.name}",
            "${professional.avatar}",
            "${professional.whatsapp}",
            "${professional.bio}"
        );
    `)

    const professional_id = insertedProfessional.lastID

    const insertedTakeCare = await db.run(`
            INSERT INTO take_care (
                subject,
                cost,
                professional_id
            ) VALUES (
                "${take_care.subject}",
                "${take_care.cost}",
                "${professional_id}"
            );
    `)

    const take_care_id = insertedTakeCare.lastID

    const insertedAllClassSchedulesValues = care_schedules.map((careSchedules) => {
        return db.run(`
            INSERT INTO care_schedule (
                take_care_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${take_care_id}",
                "${careSchedules.weekday}",
                "${careSchedules.time_from}",
                "${careSchedules.time_to}"
            );
        `)
    })

    await Promise.all(insertedAllClassSchedulesValues)
}