const router = require('express').Router();
const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/card');

const {
  validateCard,
  validateCardId,
} = require('../middlewares/cardValidation');

router.get('/', getCards);
router.delete('/:cardId', validateCardId, deleteCard);
router.post('/', validateCard, createCard);
router.put('/:cardId/likes', validateCardId, likeCard);
router.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = router;
