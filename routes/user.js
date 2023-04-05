import Express from 'express'
import UserControl from '../controllers/user.control.js'
import authToken  from '../middlewares/auth.middleware.js'

const router = Express.Router();

const user = new UserControl()

router.get('/', authToken, user.index)
router.get('/edit/:id', authToken, user.edit)


export default router