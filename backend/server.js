const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')

app.use(express.urlencoded({extended : false}))
require('./app')(app)
// app.use(cors())

// app.get('/api', (req, res) => {
//     res.json({'name' : ['Dave', 'Mike', 'Josh']})
// })

const PORT = process.env.PORT || 7000
app.listen(PORT, console.log(`App started on port : ${PORT}`))