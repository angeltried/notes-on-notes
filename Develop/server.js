const express = require('express')
let notes = require('./db/db.json')
const app = express()
const path = require ('path')
const { uid } = require('uid')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '*'))
})
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
})

app.get('/api/notes', (req, res) => {
    res.json(notes)
})

app.post('/api/notes', (req, res) => {
    let newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uid()
    }

    notes.push(newNote)
    res.json(200)
})


app.delete('/api/notes/:id', (req, res) => {
    notes = notes.filter(note => note.id  != req.params.id)
    res.json(notes)
})
app.listen(process.env.PORT || 3000)