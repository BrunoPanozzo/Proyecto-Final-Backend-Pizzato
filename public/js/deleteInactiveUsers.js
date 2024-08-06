const deleteUsersButtons = document.querySelector('.eliminar-usuarios-inactivos')

if (deleteUsersButtons){
    deleteUsersButtons.addEventListener('click', e => {
        e.preventDefault() 
        // Realizo una solicitud de eliminación al servidor
        fetch('/api/users/', {
            method: 'DELETE',            
        }).then(result => {            
            if (result.status === 200) {
                window.location.reload()  // se recarga la página actual
            }
        }).catch(error => {
            console.error('Error al realizar la solicitud:', error)
        })     
    }) 
}

