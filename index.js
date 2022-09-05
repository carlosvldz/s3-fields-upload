import express from 'express'
import fileUpload from 'express-fileupload'
import { uploadFile } from './s3.js'

import './config.js'

const app = express()

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads'
}))

app.get('/', (req, res) => {
    res.json({message: 'Service to upload files to my bucket'})
})

app.post('/files', async (req, res) => {
    const result = await uploadFile(req.files.file)
    res.json({ result })
})

app.listen(3000)
console.log(`Server on port ${3000}`)