const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const env = require('dotenv/config')

const app = express()
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 4000

const routes = require('./routes/crud')
app.use('/api',routes)

mongoose.connect(process.env.DATABASE_URI)
    .then(()=>console.log('Database Connected'))
    .catch((error) => console.log(error.message))

app.listen(port,()=>{
    console.log(`Server running on http://localhost:${process.env.PORT}`)
})