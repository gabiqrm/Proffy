const {subjects, weekdays, getSubject, convertTimeToMinutes} = require('./utils/format')
const dataBase = require('./database/db')
const { prototype } = require('sqlite-async')

function pageLanding (req, res){
    return res.render("index.html")
}
 
async function pageStudy(req, res){
    const filters = req.query

    if(!filters.subject || !filters.weekday || !filters.time){
        const proffys = ""
        return res.render("study.html", {proffys,filters, subjects, weekdays })
    }

    const timeToMinutes = convertTimeToMinutes(filters.time)
    console.log(filters.time + " em minutos: " + timeToMinutes)

    const query = `
        SELECT classes.*,proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS(
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}            
        ) AND classes.subject = "${filters.subject}"
    `

    try {
        const db = await dataBase
        const proffys = await db.all(query)
        proffys.map((p) => {
            p.subject = getSubject(p.subject)
        })
        return res.render("study.html", {proffys, filters, subjects, weekdays })
    } catch (error) {
        console.log("error:"+error)         
    } 
}

function pageGiveClasses(req, res){
    return res.render("give-classes.html", {subjects, weekdays})
}

function pageSuccessInsert(req, res){
    const filters = req.query
    return res.render("success-insert.html", {filters})
}

async function saveClasses (req, res){
    const createProffy = require('./database/createProffy')

    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    const classScheduleValues = req.body.weekday.map((weekday, index) => {
        return {
            weekday: weekday,
            time_from: convertTimeToMinutes(req.body.time_from[index]),
            time_to: convertTimeToMinutes(req.body.time_to[index])
        }
    })


    try {
        const db = await dataBase
        createProffy(db, {proffyValue, classValue, classScheduleValues})
        let queryString = "?subject="+req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]
        return res.redirect("/success-insert" + queryString)
            
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses,
    pageSuccessInsert
}