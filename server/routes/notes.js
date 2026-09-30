const express = require('express');
const Note = require('../models/Note');
const authMiddleware = require('../middleware/auth');
const { route } = require('./auth');

const router = express.Router();

router.use(authMiddleware);

// GET all notes for logged-in user
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find({ owner: req.userId }).sort({ pinned: -1, createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

//CREATE a note
router.post('/', async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title) return res.status(400).json({ message: 'Title is required' });

        const note = new Note({ title, content, owner: req.userId });
        await note.save();
        res.status(201).json(note)
    }
    catch (err) {
        res.status(500).json({ mesaage: 'Server error', error: err.message });
    }
});

//UPDATE a note title/content
router.put('/:id', async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, owner: req.userId },
            { title, content },
            { new: true }
        );
        if (!note) return res.status(404).json({ mesaage: 'Note not found' });
        res.json(note);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

//TOGGLE pin
router.patch('/:id/pin', async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, owner: req.userId });
        if (!note) return res.status(404).json({ message: 'Note not found' });

        note.pinned = !note.pinned;
        await note.save();
        res.json(note);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

//TOGGLE archive
router.patch('/:id/archive', async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, owner: req.userId });
        if (!note) return res.status(404).json({ message: 'Note not found' });

        note.archived = !note.archived;
        await note.save();
        res.json(note);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

//DELETE permanently
router.delete('/:id', async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.id, owner: req.userId });
        if (!note) return res.status(404).json({ message: 'Note not found' });
        res.json({ message: 'Note deleted' });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;