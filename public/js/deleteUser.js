document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("eliminar-usuario")
    btn.addEventListener("click", function () {
        // Realizo una solicitud de eliminación al servidor
        fetch(`/api/users/${btn.id}`, {
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

// const deleteUserButtons = document.querySelectorAll('.eliminar-usuario')

// deleteUserButtons.forEach(button => {
//     button.addEventListener('click', e => {
//         e.preventDefault()

//         // Accedo al formulario padre del botón
//         const form = button.closest('form')
//         if (!form) {
//             console.error('No se encontró un formulario asociado al botón.')
//             return
//         }

//         // Obtengo el ID del usuario que deseo eliminar
//         const userId = form.getAttribute('user-id')

//         // Realizo una solicitud de eliminación al servidor
//         fetch(`/api/users/${userId}`, {
//             method: 'DELETE',
//         }).then(result => {
//             if (result.status === 200) {
//                 window.location.reload()  // se recarga la página actual
//             }
//         }).catch(error => {
//             console.error('Error al realizar la solicitud:', error)
//         })
//     })
// })
