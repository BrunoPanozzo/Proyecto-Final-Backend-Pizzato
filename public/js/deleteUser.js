document.querySelectorAll('.eliminar-usuario').forEach(button => {
    button.addEventListener('click', e => {
        e.preventDefault()

        // Accedo al formulario padre del botón
        const form = button.closest('form')
        if (!form) {
            console.error('No se encontró un formulario asociado al botón.')
            return
        }

        // Obtengo el ID del usuario que deseo eliminar
        const userId = form.getAttribute('user-id')

        console.log(`/api/users/${userId}`)
        // Realizo una solicitud de eliminación al servidor
        fetch(`/api/users/${userId}`, {
            method: 'DELETE',
        }).then(result => {
            if (result.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: 'Eliminacion de Usuario',
                    text: 'Se elimino el usuario exitosamente!'
                }).then((result) => {
                    if (result.isConfirmed)
                        window.location.reload()  // se recarga la página actual 
                })
            }
            else{
                Swal.fire({
                    icon: "warning",
                    title: 'Eliminacion de Usuario',
                    text: 'No se pudo eliminar el usuario!'
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
