const express = require('express')
const cors = require('cors')
const fetch = require('node-fetch')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())

app.get('/fetchData', async (req, res) => {
  const { query } = req
  const { code } = query
  try {
    const response = await fetch(`https://http.dog/${code}.json`)
    const data = await response.json()
    res.json(data)
  } catch (error) {
    res.status(404).send('404')
  }
})

app.listen(PORT, () => {
  console.log(`Servidor proxy en http://localhost:${PORT}`)
})
