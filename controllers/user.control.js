import jwt from 'jsonwebtoken'

import UserModel from '../models/user.model.js'


class User {

    index = async(req, res) => {
        const {user} = req.body

        return res.send({
            user
        })
    }

    edit = async (req, res) => {
        return res.send('edit verileri')
    }

}

export default User