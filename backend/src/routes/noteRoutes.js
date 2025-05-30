const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

router.post('/', noteController.createNote);
router.get('/', noteController.getNotes);
router.patch('/:id/like', noteController.likeNote);
router.patch('/:id/unlike', noteController.unlikeNote);
router.delete('/:id', noteController.deleteNote);

module.exports = router;