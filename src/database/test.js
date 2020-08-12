const dataBase = require('./db')
const createProffy = require('./createProffy')

dataBase.then(async(db) => {
    proffyValue = {
        name: "Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "5511985854646",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões."
    }

    classValue = {
        subject: "Química",
        cost: "20,00"
    }

    classScheduleValues = [
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1320
        }
    ]

    // await createProffy(db, {proffyValue, classValue, classScheduleValues})

    //Consultar lista de professores
    const selectedProffys = await db.all("SELECT * FROM proffys")
    // console.log(selectedProffys)

    //Consultar as classes de um determinado professor
    const selectedClassesAndProffys = await db.all(`
        SELECT classes.*,proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    // console.log(selectedClassesAndProffys)

    //exemplo - pessoa trabalha entre 8h e 18h
    //o horario do filtro deve estar entre o horario inicial e final
    // time_from <= time_filtro < time_to 

    const selectedClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "600"
        AND class_schedule.time_to > "600"
    `)
    
    console.log(selectedClassesSchedules)
})