const modifyUserButtons = document.querySelectorAll('.modificar-rol-usuario')

modifyUserButtons.forEach(button => {
    button.addEventListener('click', e => {
        e.preventDefault()       

        // Obtengo el ID del usuario que deseo cambiar de rol
        const userId = button.closest('form').getAttribute('user-id')       
        // Realizo una solicitud de cambio de rol al servidor
        fetch(`/api/users/premium/${userId}`, {
            method: 'PUT',
        }).then(result => { 
            console.log(result.status)                
            if (result.status === 200) {
                window.location.reload()  // se recarga la página actual
            }
        }).catch(error => {           
            console.error('Error al realizar la solicitud:', error)
        })
    })
})