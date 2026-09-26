document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('commentForm');
    const commentsGrid = document.getElementById('commentsGrid');
    const emptyComments = document.getElementById('emptyComments');

    // Cargar comentarios previos del localStorage al iniciar
    cargarComentarios();

    if (commentForm) {
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombreInput = document.getElementById('nombre');
            const comentarioInput = document.getElementById('comentario');

            const nuevoComentario = {
                nombre: nombreInput.value.trim(),
                texto: comentarioInput.value.trim(),
                fecha: new Date().toLocaleDateString('es-AR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                })
            };

            // Guardar en la memoria local del navegador
            guardarEnLocalStorage(nuevoComentario);

            // Renderizar el nuevo comentario en pantalla
            renderizarComentario(nuevoComentario);

            // Limpiar los campos del formulario
            commentForm.reset();
        });
    }

    function guardarEnLocalStorage(comentario) {
        let comentarios = JSON.parse(localStorage.getItem('reflexiones_alma_tinta')) || [];
        comentarios.unshift(comentario); // Agrega al principio para mostrar el más reciente primero
        localStorage.setItem('reflexiones_alma_tinta', JSON.stringify(comentarios));
    }

    function cargarComentarios() {
        let comentarios = JSON.parse(localStorage.getItem('reflexiones_alma_tinta')) || [];

        if (comentarios.length > 0 && emptyComments) {
            emptyComments.style.display = 'none';
        }

        comentarios.forEach(c => renderizarComentario(c));
    }

    function renderizarComentario(c) {
        if (emptyComments) {
            emptyComments.style.display = 'none';
        }

        const card = document.createElement('article');
        card.className = 'comment-card';

        card.innerHTML = `
            <h3>${escapeHTML(c.nombre)}</h3>
            <p>${escapeHTML(c.texto)}</p>
            <small>Publicado el ${c.fecha}</small>
        `;

        commentsGrid.prepend(card);
    }

    // Función auxiliar para prevenir inyección de código malicioso
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
});