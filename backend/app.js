const mongoose = require('mongoose')
const Note = require('./models/Note')
const express = require('express')
require ('dotenv').config()
const cors = require('cors')

module.exports = app => {

    app.use(cors())

    mongoose.connect(process.env.DB_STRING , {
        useNewUrlParser : true
    })
        .then(() => console.log('DB Connected'))
        .catch(err => console.log(err))

    app.get('/allnote', async (req, res) => {
        const allNotes = await Note.find()
        res.json({"notes" : allNotes})
    })

    app.get('/getnote', async(req,res) => {
        const note = await Note.findOne({id : req.query.id})
        res.json(note)
    })

    app.get('/addnote', async (req, res, next) => {
        const all_note = await Note.find()

        let last_id
        if(all_note.length > 0){
            last_id = all_note[all_note.length - 1].id
        }
        else{
            last_id = 0
        }
    
        const {title, content, day, time, favorite} = req.query
        const newNote = Note({
            id : last_id + 1, 
            title,
            content,
            day,
            time,
            favorite
        })
        const savedNote = await newNote.save()
        res.json(savedNote)

    })

    app.get('/updatenote', async(req, res) => {
        const {title, content, id} = req.query
        const updatedNote = await Note.findOneAndUpdate(id,{
            title,
            content
        })
        res.json(updatedNote)
    })

    app.get('/updatefavorite', async (req, res, next) => {
        const {id, favorite} = req.query
        await Note.findOneAndUpdate({_id : id},{favorite})
        next()
    })

    app.get('/deletenote/:id', async(req, res, next) => {
        await Note.findOneAndDelete({id : req.params.id})
        next()
    })

    app.get('/addnew', async (req, res) => {
        const newNote = Note({
            id : 4,
            title : 'JK Dead 3sdnsd',
            content : 'Lorem ipsu safgbsdf asmdbb as  sasf sd sdsda',
            day : 'Day',
            time : 'Time',
            favorite : false
        })

        await newNote.save()
        res.redirect('/')
    })
}