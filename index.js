import express, { json, urlencoded } from 'express'
import morgan from 'morgan'
import router from './routes/index.routes.js'

const app = express()
app.use(morgan('tiny'))

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(router)

//app.use(require('./routes/index.routes'))

// app.get('/', (req, res) => {
//     res.json({ message: 'Hello world' })
// })


app.listen('1337')