const { UsersController } = require('../controllers/users.controller')
const Router = require('./router')
const uploader = require('../utils/uploaderFiles')
const { userIsAdmin } = require('../middlewares/auth.middleware')

const withController = callback => {
    return (req, res) => {                       
        const controller = new UsersController()
        return callback(controller, req, res)
    }
}

class UsersRouter extends Router {
    init() {
               
        this.put('/premium/:uid', withController((controller, req, res) => controller.changeRole(req, res)))

        this.post('/:uid/documents', uploader.array('documents'), withController((controller, req, res) => controller.uploadDocuments(req, res)))
           
        this.get('/', userIsAdmin, withController((controller, req, res) => controller.getUsers(req, res)))

        this.delete('/:uid', userIsAdmin, withController((controller, req, res) => controller.deleteUser(req, res)))

        this.delete('/', userIsAdmin, withController((controller, req, res) => controller.deleteInactiveUsers(req, res)))

        this.get('/admin', userIsAdmin, withController((controller, req, res) => controller.admin(req, res)))  
    }
}

module.exports = UsersRouter