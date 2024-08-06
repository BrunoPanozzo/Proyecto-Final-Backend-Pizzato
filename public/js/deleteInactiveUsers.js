const deleteUsersButtons = document.querySelectorAll('#eliminar-usuarios-inactivos')

deleteUsersButtons.forEach(button => {
    button.addEventListener('click', e => {
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
})
