const transport = require('../config/transport')

class UsersServices {

    constructor(dao) {
        this.dao = dao
    }

    async changeRole(idUser) {
        return await this.dao.changeRole(idUser)
    }

    async uploadDocuments(userId, files) {
        return await this.dao.uploadDocuments(userId, files)
    }

    async getUserById(uid) {
        return await this.dao.getUserById(uid)
    }

    async getUsers() {
        return await this.dao.getUsers()
    }

    async deleteUser(user){
        const result = await this.dao.deleteUser(user)
        if (!result) {
            return false
        }
        return true
    }

    async deleteInactiveUsers() {
        const { deletedCount, deletedUsers } = await this.dao.deleteInactiveUsers()

        for (const user of deletedUsers) {
            // Enviar correo electrónico a cada usuario eliminado
            const mailOptions = {
                from: 'Administrador Coder <verizzato@gmail.com>',
                to: user.email,
                subject: 'Cuenta eliminada por inactividad',
                text: 'Tu cuenta ha sido eliminada debido a la falta de actividad en los últimos 2 días.'
            }    

            await transport.sendMail(mailOptions)
            console.log(`Correo enviado a ${user.email}`)           
        }

        return deletedCount
    }
}

module.exports = { UsersServices }