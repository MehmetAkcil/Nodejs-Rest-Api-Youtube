import Express from 'express'
const router = Express.Router();
import authControl from '../controllers/auth.control.js'

const auth = new authControl()

router.post('/login', auth.login);
router.post('/register', auth.register);
router.post('/logout', auth.logout);

export default router

