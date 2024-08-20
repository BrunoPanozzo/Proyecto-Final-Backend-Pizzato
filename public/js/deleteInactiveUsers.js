if (document.querySelector('.eliminar-usuarios-inactivos')){
    document.querySelector('.eliminar-usuarios-inactivos').addEventListener('click', e => {
        e.preventDefault() 
        // Realizo una solicitud de eliminación al servidor
        fetch('/api/users/', {
            method: 'DELETE',            
        }).then(result => {            
            if (result.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: 'Borrado de usuarios inactivos',
                    text: 'Se eliminaron los usuarios inactivos!'
                }).then((result) => {
                    if (result.isConfirmed)
                        window.location.reload()  // se recarga la página actual 
                })
            }
            else if (result.status === 210) {
                Swal.fire({
                    icon: "warning",
                    title: 'Borrado de usuarios inactivos',
                    text: 'No hay usuarios inactivos!'
                }).then((result) => {
                    if (result.isConfirmed)
                        window.location.reload()  // se recarga la página actual 
                })
            }
            else {
                Swal.fire({
                    icon: "warning",
                    title: 'Borrado de usuarios inactivos',
                    text: 'No se pudieron borrar usuarios inactivos!'
                }).then((result) => {
                    if (result.isConfirmed)
                        window.location.reload()  // se recarga la página actual 
                })
            }            
        }).catch(error => {
            console.error('Error al realizar la solicitud:', error)
        })     
    }) 
}

