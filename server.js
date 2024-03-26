const express = require('express')
const { Client } = require('@notionhq/client')
const dotenv = require('dotenv')
const cors = require('cors');

dotenv.config()

const app = express()
const port = 3001

const notion = new Client({ auth: process.env.NOTION_TOKEN })

app.use(cors({ origin: 'http://localhost:3000' }));

app.get('/api/posts', async (req, res) => {
    try {
        const response = await notion.databases.query({ database_id: process.env.NOTION_DATABASE_ID })
        const parsedData = response.results.map(page => ({ id: page.id, data: page.properties }))
        res.json(parsedData)
    } catch (error) {
        console.error("Error fetching data:", error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

app.listen(port, () => {
    console.log(`Proxy server listening at http://localhost:${port}`)
})
