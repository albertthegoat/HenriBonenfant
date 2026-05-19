document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burger-menu');
    const nav = document.querySelector('.nav-links');

    // Mobile menu toggle
    if (burger) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
            }

            const targetId = this.getAttribute('href');
            if(targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const nameInput = document.querySelector('input[name="nom"]');
            const emailInput = document.querySelector('input[name="email"]');
            const messageInput = document.querySelector('textarea[name="message"]');

            let isValid = true;

            // Validate name
            if (nameInput.value.trim().length < 2) {
                isValid = false;
                showError(nameInput, 'Le nom doit contenir au moins 2 caractères');
            } else {
                clearError(nameInput);
            }

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                isValid = false;
                showError(emailInput, 'Veuillez entrer un email valide');
            } else {
                clearError(emailInput);
            }

            // Validate message
            if (messageInput.value.trim().length < 10) {
                isValid = false;
                showError(messageInput, 'Le message doit contenir au moins 10 caractères');
            } else {
                clearError(messageInput);
            }

            if (!isValid) {
                e.preventDefault();
            }
        });

        // Clear error on input
        document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(field => {
            field.addEventListener('input', () => {
                clearError(field);
            });
        });
    }

    function showError(field, message) {
        const errorElement = field.nextElementSibling;
        if (errorElement && errorElement.classList.contains('form-error')) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        field.style.borderColor = '#d32f2f';
    }

    function clearError(field) {
        const errorElement = field.nextElementSibling;
        if (errorElement && errorElement.classList.contains('form-error')) {
            errorElement.style.display = 'none';
        }
        field.style.borderColor = '';
    }
});