// carregando modulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require("body-parser")
const app = express()
const admin = require("./routes/admin")
const path = require("path")
const moongoose = require("mongoose")
const session = require("express-session")
const flash = require("connect-flash")
const moment = require('moment')
// configurações
    //Sessão
    app.use(session({
        secret: "cursodenode",
        resave: true,
        saveUninitialized: true
    }))
    app.use(flash())
    //Middleware
    app.use((req, res, next)=>{
        res.locals.success_msg = req.flash("success_msg")
        res.locals.error_msg = req.flash("error_msg")
        next()
    })
    // Body-Parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    // Handlebars
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')
    // Mongoose
        moongoose.connect("mongodb://localhost/blogapp").then(()=>{
            console.log("Conectado ao Mongo...")
        }).catch((err) => {
           console.log("Erro ao se conectar" + err) 
        })

// Public
    app.use(express.static(path.join(__dirname, "public")))
// rotas
    app.get('/', (req, res) => {
        res.send("Rota Principal")
    })
    app.get('/posts', (req, res)=>{
        res.send("Lista Posts")
    })
    app.use('/admin', admin)

// outros
const PORT = 8089
app.listen(PORT, () => {
    console.log("Servidor ON")
})
