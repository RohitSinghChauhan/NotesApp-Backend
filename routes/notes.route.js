const { Router } = require('express');

const NotesModel = require('../models/notes.model');

const notesRoute = Router();

notesRoute.get('/', async (req, res) => {
    try {
        const notes = await NotesModel.find();
        res.send(notes);
    }
    catch (err) {
        console.log('Something went wrong: ', err);
        res.send({ 'err': 'something went wrong' });
    }
});

notesRoute.post('/create', async (req, res) => {
    const payload = req.body;
    try {
        await NotesModel.create(payload);
        res.send({ 'msg': 'Note created successfully' });
    }
    catch (err) {
        console.log('Something went wrong: ', err);
        res.send({ 'err': 'something went wrong' });
    }
});

notesRoute.patch('/update/:noteID', async (req, res) => {
    const noteID = req.params.noteID;
    const payload = req.body;
    const userID = req.body.userID;

    try {
        const note = await NotesModel.findOne({ _id: noteID });

        if (userID === note.userID) {
            await NotesModel.findByIdAndUpdate({ _id: noteID }, payload);
            res.send({ 'msg': 'note has been updated' });
        }
        else {
            res.send({ 'msg': 'not authorised' });
        }
    }
    catch (err) {
        console.log('Something went wrong: ', err);
        res.send({ 'err': 'something went wrong' });
    }
});

notesRoute.delete('/delete/:noteID', async (req, res) => {
    const noteID = req.params.noteID;
    const userID = req.body.userID;

    try {
        const note = await NotesModel.findOne({ _id: noteID });

        if (userID === note.userID) {
            await NotesModel.findByIdAndDelete({ _id: noteID });
            res.send({ 'msg': 'note has been deleted' });
        }
        else {
            res.send({ 'msg': 'not authorised' });
        }
    }
    catch (err) {
        console.log('Something went wrong: ', err);
        res.send({ 'err': 'something went wrong' });
    }
});

module.exports = notesRoute;