const express = require('express')
const upload = require('./upload')
const cors = require('cors')
const dataRouter = require('./routes/data.server.routes');

const server = express()

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}

server.use(cors(corsOptions))

server.post('/upload', upload)
server.use('/api', dataRouter);

server.listen(5000, () => {
  console.log('Server started!')
})
