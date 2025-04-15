// Navegação suave para os links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Menu mobile
const createMobileMenu = () => {
    const nav = document.querySelector('.nav-links');
    const burger = document.createElement('div');
    burger.className = 'burger';
    burger.innerHTML = '<span></span><span></span><span></span>';
    document.querySelector('.nav-container').appendChild(burger);

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });
};

createMobileMenu();

// Animação do header ao rolar
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }

    lastScroll = currentScroll;
});

// Animação dos cards ao rolar
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .feature-card, .step-card, .register-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    observer.observe(card);
});

// Validação e envio do formulário
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validação básica
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });

        if (!isValid) {
            showNotification('Por favor, preencha todos os campos', 'error');
            return;
        }

        // Simulação de envio
        try {
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';

            // Simula uma chamada de API
            await new Promise(resolve => setTimeout(resolve, 1500));

            showNotification('Mensagem enviada com sucesso!', 'success');
            contactForm.reset();
        } catch (error) {
            showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
        } finally {
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = false;
            submitButton.textContent = 'Enviar Mensagem';
        }
    });
}

// Sistema de notificações
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Força um reflow para garantir que a animação funcione
    notification.offsetHeight;

    // Adiciona classe para mostrar com animação
    notification.classList.add('show');

    // Remove após 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Adiciona estilos CSS para as notificações
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        background-color: #2ecc71;
        color: white;
        border-radius: 5px;
        box-shadow: 0 3px 10px rgba(0,0,0,0.1);
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
    }

    .notification.error {
        background-color: #e74c3c;
    }

    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }

    .burger {
        display: none;
        cursor: pointer;
    }

    .burger span {
        display: block;
        width: 25px;
        height: 3px;
        background-color: #333;
        margin: 5px;
        transition: all 0.3s ease;
    }

    @media (max-width: 768px) {
        .burger {
            display: block;
        }

        .nav-links {
            position: fixed;
            right: -100%;
            top: 70px;
            height: calc(100vh - 70px);
            background-color: white;
            width: 100%;
            flex-direction: column;
            padding: 2rem;
            transition: right 0.3s ease;
        }

        .nav-links.nav-active {
            right: 0;
        }

        .burger.toggle span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }

        .burger.toggle span:nth-child(2) {
            opacity: 0;
        }

        .burger.toggle span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
`;

document.head.appendChild(style); 