
const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química", 
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
] 

function getSubject(subNum){
    return subjects[+subNum-1]
}

function convertTimeToMinutes(time){
    const [hour, minutes] = time.split(":")
    return Number((hour * 60) + minutes)
}

module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertTimeToMinutes
}