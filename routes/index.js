import Express from "express";
import user from './user.js'
import auth from './auth.js'


const router = Express.Router();

router.get('/', (req, res) => {
    res.send('Anasayfa')
})

const rt = (app) => {
    app.use('/', router)
    app.use('/users', user)
    app.use('/auth', auth)
}


export default rt

