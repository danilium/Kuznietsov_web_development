document.addEventListener("DOMContentLoaded", function () {
    const priceElements = document.querySelectorAll('.product-grid article p strong, .product-info');
    priceElements.forEach(el => {
        el.style.color = '#e67e22';
        el.style.textShadow = '1px 1px 2px rgba(0,0,0,0.1)';
    });

    const mainContainer = document.querySelector('main');
    if (mainContainer) {
        const newInfoBlock = document.createElement('div');
        newInfoBlock.className = 'promo-block';
        newInfoBlock.innerHTML = '<strong>⚡ Акція!</strong> Безкоштовна доставка при замовленні від 20 000 грн.';
        mainContainer.appendChild(newInfoBlock);
    }

    const footer = document.querySelector('footer p');
    if (footer) {
        const today = new Date().toLocaleDateString('uk-UA');
        footer.innerHTML += ` | <span style="font-size: 0.8rem; opacity: 0.7;">Сьогодні: ${today}</span>`;
    }

    const featuresSection = document.querySelector('section[style*="margin-top: 3rem"]');
    if (featuresSection) {
        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = "Читати більше про нас";
        toggleBtn.style.display = "block";
        toggleBtn.style.margin = "20px auto";

        const hiddenText = document.createElement('p');
        hiddenText.textContent = "Ми працюємо на ринку з 2020 року і зібрали понад 5000 комп'ютерів. Наша команда тестує кожну збірку в стрес-тестах AIDA64 та FurMark, щоб ви отримували лише стабільні системи.";
        hiddenText.style.display = "none";
        hiddenText.style.textAlign = "center";
        hiddenText.style.maxWidth = "600px";
        hiddenText.style.margin = "0 auto";

        featuresSection.appendChild(toggleBtn);
        featuresSection.appendChild(hiddenText);

        toggleBtn.addEventListener('click', () => {
            if (hiddenText.style.display === "none") {
                hiddenText.style.display = "block";
                toggleBtn.textContent = "Згорнути";
            } else {
                hiddenText.style.display = "none";
                toggleBtn.textContent = "Читати більше про нас";
            }
        });
    }

    const body = document.body;
    const themeBtn = document.createElement('button');
    themeBtn.id = 'theme-toggle';
    themeBtn.textContent = '🌙';
    body.appendChild(themeBtn);

    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-theme');
        themeBtn.textContent = '☀️';
    }

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        if (body.classList.contains('dark-theme')) {
            themeBtn.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            themeBtn.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        }
    });

    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => link.classList.add('nav-hover'));
        link.addEventListener('mouseleave', () => link.classList.remove('nav-hover'));
    });

    let currentFontSize = 16;
    window.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowUp') {
            currentFontSize += 1;
            document.documentElement.style.fontSize = currentFontSize + 'px';
        } else if (event.key === 'ArrowDown') {
            if (currentFontSize > 10) {
                currentFontSize -= 1;
                document.documentElement.style.fontSize = currentFontSize + 'px';
            }
        }
    });

    const contactForm = document.querySelector('section.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            clearErrors();
            let isValid = true;

            if (nameInput.value.trim().length < 2) {
                showError(nameInput, "Ім'я має містити мінімум 2 символи");
                isValid = false;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value)) {
                showError(emailInput, "Введіть коректний email (наприклад, user@mail.com)");
                isValid = false;
            }

            if (messageInput.value.trim().length < 15) {
                showError(messageInput, "Повідомлення занадто коротке (мінімум 15 символів)");
                isValid = false;
            }

            if (isValid) {
                alert("Форма успішно надіслана! Ми зв'яжемося з вами.");
                contactForm.reset();
            }
        });
    }

    const registerForm = document.querySelector('input[name="new_login"]')?.closest('form');

    if (registerForm) {
        registerForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const emailInput = registerForm.querySelector('input[name="email"]');
            const loginInput = registerForm.querySelector('input[name="new_login"]');
            const passwordInput = registerForm.querySelector('input[name="new_password"]');

            clearErrors();
            let isValid = true;

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value)) {
                showError(emailInput, "Введіть коректний email");
                isValid = false;
            }

            if (loginInput.value.trim().length < 3) {
                showError(loginInput, "Логін має містити мінімум 3 символи");
                isValid = false;
            }

            if (passwordInput.value.trim().length < 5) {
                showError(passwordInput, "Пароль має бути не менше 5 символів");
                isValid = false;
            }

            if (isValid) {
                alert("Реєстрація успішна! Ласкаво просимо.");
                registerForm.reset();
            }
        });
    }

    function showError(input, message) {
        const errorSpan = document.createElement('span');
        errorSpan.className = 'error-message';
        errorSpan.textContent = message;
        input.classList.add('error');
        input.parentNode.insertBefore(errorSpan, input.nextSibling.nextSibling);
    }

    function clearErrors() {
        const errors = document.querySelectorAll('.error-message');
        errors.forEach(el => el.remove());
        const inputs = document.querySelectorAll('.error');
        inputs.forEach(el => el.classList.remove('error'));
    }
});