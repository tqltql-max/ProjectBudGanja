// Layout.js - Dynamic header and footer injection

const headerHTML = `
    <header>
        <div class="logo">
            <a href="index.html" style="text-decoration: none; color: inherit;" aria-label="Página inicial">Inspetor BudGanja</a>
        </div>
        <button class="menu-toggle" aria-label="Abrir menu de navegação" aria-expanded="false">☰</button>
        <nav>
            <ul>
                <li><a href="index.html" aria-label="Página de inspeções">Inspeções</a></li>
                <li><a href="pesquisas.html" aria-label="Página de pesquisas">Pesquisas</a></li>
                <li><a href="bugigangas.html" aria-label="Página de bugigangas">Bugigangas</a></li>
                <li><a href="ferramentas.html" aria-label="Página de ferramentas">Ferramentas</a></li>
                <li><a href="contato.html" aria-label="Página sobre">Sobre</a></li>
            </ul>
        </nav>
    </header>
`;

const footerHTML = `
    <footer>
        <p>&copy; 2026 Inspetor BudGanja. Conteúdo educacional.</p>
    </footer>
`;

// Inject header and footer when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const headerContainer = document.getElementById('site-header');
    const footerContainer = document.getElementById('site-footer');
    
    if (headerContainer) {
        headerContainer.innerHTML = headerHTML;
        
        // Mobile menu toggle
        const menuToggle = headerContainer.querySelector('.menu-toggle');
        const navUl = headerContainer.querySelector('nav ul');
        
        if (menuToggle && navUl) {
            menuToggle.addEventListener('click', function() {
                const isActive = navUl.classList.toggle('active');
                menuToggle.setAttribute('aria-expanded', isActive);
                menuToggle.textContent = isActive ? '✕' : '☰';
            });
        }
        
        // Set active navigation link
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = headerContainer.querySelectorAll('nav ul li a');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage) {
                link.classList.add('active');
            }
        });
    }
    
    if (footerContainer) {
        footerContainer.innerHTML = footerHTML;
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
