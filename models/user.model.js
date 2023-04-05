import { DataTypes } from "sequelize";
import sequelize from './index.js'
import bcrypt from 'bcrypt'


const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})


User.beforeCreate(async (user) => {
    const saltRounds = 10;
    user.password = await bcrypt.hash(user.password, saltRounds)
})


sequelize.sync()
    .then(() => console.log('Veritabani sekronize edildi'))
    .catch(error => console.log('hata', error))


export default User