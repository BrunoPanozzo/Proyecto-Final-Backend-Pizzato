document.querySelectorAll('.modificar-rol-usuario').forEach(button => {
    button.addEventListener('click', e => {
        e.preventDefault()

        // Obtengo el ID del usuario que deseo cambiar de rol
        const userId = button.closest('form').getAttribute('user-id')
        // Realizo una solicitud de cambio de rol al servidor
        fetch(`/api/users/premium/${userId}`, {
            method: 'PUT',
        }).then(result => {            
            if (result.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: 'Cambio de Rol',
                    text: 'Se cambio de rol exitosamente!'
                }).then((result) => {
                    if (result.isConfirmed)
                        window.location.reload()  // se recarga la página actual 
                })
            }
            else{
                Swal.fire({
                    icon: "warning",
                    title: 'Cambio de Rol',
                    text: 'No se pudo cambiar el rol!'
                }).then((result) => {
                    if (result.isConfirmed)
                        window.location.reload()  // se recarga la página actual 
                })
            }            
        }).catch(error => {
            console.error('Error al realizar la solicitud:', error)
        })
    })
})