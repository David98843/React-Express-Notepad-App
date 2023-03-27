const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
    id : {
        type : Number,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    content : {
        type: String,
        required : true
    },
    day : {
        type : String,
        required : true
    },
    time : {
        type : String,
        required : true
    },
    favorite : {
        type : Boolean,
        required : true
    }

})

const Note = mongoose.model('Note', NoteSchema)
module.exports = Note
