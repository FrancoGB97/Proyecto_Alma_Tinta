document.addEventListener('DOMContentLoaded', () => {
    let currentPage = 1;
    const totalPages = 3;

    const books = document.querySelectorAll('.book-card');
    const pageButtons = document.querySelectorAll('.page-num');
    const nextButton = document.getElementById('next-btn');
    const pageCounter = document.querySelector('.page-counter');

    function showPage(page) {
        currentPage = page;

        // Muestra u oculta libros según la página actual
        books.forEach(book => {
            const bookPage = parseInt(book.getAttribute('data-page'));
            if (bookPage === currentPage) {
                book.style.display = 'block';
            } else {
                book.style.display = 'none';
            }
        });

        // Actualiza el estilo del botón activo
        pageButtons.forEach(btn => {
            const btnPage = parseInt(btn.getAttribute('data-page'));
            if (btnPage === currentPage) {
                btn.classList.add('current');
            } else {
                btn.classList.remove('current');
            }
        });

        // Actualiza el texto superior de la página
        if (pageCounter) {
            pageCounter.textContent = `Página ${currentPage} de ${totalPages}`;
        }
    }

    // Eventos para los números de paginación
    pageButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const selectedPage = parseInt(btn.getAttribute('data-page'));
            showPage(selectedPage);
        });
    });

    // Evento para el botón "Siguiente →"
    if (nextButton) {
        nextButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage < totalPages) {
                showPage(currentPage + 1);
            } else {
                showPage(1); // Regresa a la primera página si está en la última
            }
        });
    }

    // Inicializa mostrando la página 1
    showPage(1);
});