const { UsersServices } = require('../services/users.service')
const { User: UserDAO } = require('../dao')

class UsersController {

    constructor() {        
        this.service = new UsersServices(new UserDAO())
    }

    async changeRole(req, res) {
        try {
            const idUser = req.params.uid            
            const user = await this.service.changeRole(idUser)
            if (!user) {
                return user === false
                    ? res.sendNotFoundError(`El usuario '${idUser}' no existe`)
                    : res.sendServerError(`No se pudo cambiar el rol del usuario '${idUser}'`)
            }

            res.sendSuccess(`El usuario '${idUser}' cambió su rol'`)
        }
        catch (err) {
            res.sendServerError(err)
        }
    }

    async uploadDocuments(req, res) {       
        const idUser = req.params.uid
        //const {name, type} = req.body        
        const files = req.files
        if (!files || files.length === 0) {
            return res.sendUserError('No se subieron archivos')
            //return res.status(400).send('No se subieron archivos')
        }        
        const user = await this.service.uploadDocuments(idUser, files)
        req.logger.info('Documentación actualizada exitosamente')
        res.sendCreatedSuccess('Documento actualizado de forma correcta')
        //res.status(201).json({ message: 'Documento actualizado de forma correcta' })
    }

    async getUsers() {
        let listado = [] 
       
        listado = await this.service.getUsers()
        
        //listado = listado.map(({first_name, last_name, email, rol, last_connection}) => ({first_name, last_name, email, rol, last_connection}))

        if (listado) {
            res.render('admin', { docs: listado, mostrarMasInfo: false })
        } else {
            res.render('admin', { docs: [], mostrarMasInfo: false })
        }
       
    }
    
    async admin(req, res){
        try {
            let listado = []
                     
            listado = await this.service.getUsers()
             
            if (listado) {
                res.render('admin', { docs: listado, mostrarMasInfo: true })
            } else {
                res.render('admin', { docs: [], mostrarMasInfo: true })
            }
    
        } catch (err) {
            req.logger.error(`${err} - ${req.method} en ${req.url} - ${new Date().toLocaleDateString()} `);
        }
    }

    async deleteUser (req, res){
        const {
            uid
        } = req.params  
        const user = await this.service.getUserById(uid)       
        const email = user.email 
        const esBorrado = await this.service.deleteUser(user)       
        if (esBorrado) {
            if (email) {
                let result = await transport.sendMail({
                    from: 'Administrador Coder <verizzato@gmail.com>',
                    to: `${email}`,
                    subject: 'Su Usuario fue Eliminado por el Administrador',
                    html: `<div> <h1> Su Usuario fue eliminado por el Administrador de Coder. </h1></div>`,
                    attachments: []
                })
            }
            res.status(200).json({
                message: 'Usuario eliminado'
            })
        }  
    }

    async deleteInactiveUsers (req, res) {  
        const deletedCount = await this.service.deleteInactiveUsers()
        if (deletedCount) {
            res.status(200).json({
                message: `${deletedCount} usuarios eliminados`
            })
        } else {
            res.status(200).json({
                message: 'No se encontraron usuarios para eliminar'
            })
        }
    }

}


module.exports = { UsersController }