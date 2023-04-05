import {Sequelize} from "sequelize";


const seq = new Sequelize('restapiyoutube', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})


export default seq