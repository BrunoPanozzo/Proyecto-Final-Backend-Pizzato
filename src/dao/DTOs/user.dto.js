class UserDTO {

    constructor(user) {
        this.id = user._id.toString()
        this.first_name = user.first_name
        this.last_name = user.last_name
        this.age = user.age
        this.email= user.email    
        this.cart = user.cart
        this.rol = user.rol   
        this.status = user.status
        this.documents = user.documents
        this.last_connection = user.last_connection                     
    }
}

module.exports = { UserDTO }