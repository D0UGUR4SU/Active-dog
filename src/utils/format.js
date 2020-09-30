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

<<<<<<< HEAD
function convertHoursToMinutes (time) {
    const [ hour, minutes ] = time.split(":")
    return Number((hour * 60)+ minutes)
}

module.exports = { subjects, weekdays, getSubject, convertHoursToMinutes } 
=======
function convertHoursToMinutes(time){
    const [hour, minutes] = time.split(":")
    return Number((hour * 60) + minutes)
}

module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertHoursToMinutes
}
>>>>>>> master
