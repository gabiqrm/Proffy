
const nunjucks = require("nunjucks")
const express = require("express")
const server = express()
const PORT = process.env.PORT || 5000

const {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses,
    pageSuccessInsert
} = require('./pages')

nunjucks.configure("src/views", { 
    express: server,
    noCache: true,
})



server
.use(express.urlencoded({extended: true})) 
.use(express.static("public"))
.get("/",pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.get("/success-insert", pageSuccessInsert)
.post("/save-class", saveClasses)
//.listen(5500)
.listen(PORT, () => console.log(`Listening on ${ PORT }`))

