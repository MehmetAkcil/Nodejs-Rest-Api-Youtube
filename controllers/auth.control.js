import jwt from 'jsonwebtoken'
import UserModel from '../models/user.model.js'
import bcryp from 'bcrypt'


class Auth {


    login = async (req, res) => {
        const { email, password } = req.body

        //mail adresi veya parola hatali ise hata dondur
        if (!email || !password) {
            return res.send({
                stauts: false,
                message: 'Mail adresi veya parola hatali'
            })
        }

        // Şifre doğru mu kontrol et
        const user = await UserModel.findOne({ where: { email } });
        if (!user) {
            return res.stauts(401).send({
                status: false,
                message: 'Kullanıcı adı veya şifre hatalı.'
            })
        }

        const passwordMatch = await bcryp.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send({
                status: false,
                message: 'Kullanıcı adı veya şifre hatalı.'
            });
        }

        //jwt olustur
        const secretKey = process.env.ACCESS_TOKEN_SECRET
        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' })

        // jwt yi yanit olarak gonder
        res.status(201).send({
            status: false,
            data: user,
            token: token
        })

    }

    register = async (req, res) => {
        const { username, email, password } = req.body

        //bilgiler bos ise geri dondur
        if (!username || !email || !password) {
            return res.status(400).send({
                status: false,
                message: "Hatali veri gonderdiniz"
            });
        }

        //email varsa hata dondur
        const existingEmail = await UserModel.findOne({ where: { email } })

        if (existingEmail) {
            return res.status(400).send({
                status: false,
                message: 'Bu mail adresine ait kullanici var.'
            })
        }


        //kullanici kayit et

        try {

            const newUser = await UserModel.create({
                username,
                email,
                password
            });

            return res.status(201).send({
                status: true,
                data: newUser
            })

        } catch (error) {
            res.status(500).send({
                status: false,
                message: 'Kayit sirasinda bir sorun olustu'
            })
        }

    }

    logout = async (req, res) => {
        return res.send({
            status: true,
            message: 'Cikis islemi basarili'
        })
    }

}


export default Auth