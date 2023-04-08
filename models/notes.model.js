const mongoose = require('mongoose');

const notesSchema = mongoose.Schema({
    title: String,
    note: String,
    userID: String
},
    {
        versionKey: false
    }
);

const NotesModel = mongoose.model('Note', notesSchema);

module.exports = NotesModel;