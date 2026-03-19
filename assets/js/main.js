document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('contactForm');
    if (!form) return;

    const errorMessages = {
        firstName: 'Please enter your first name',
        lastName:  'Please enter your last name',
        email:     'Please enter a valid email address',
        company:   'Please enter your company name'
    };

    function showError(input, message) {
        const errorElement = form.querySelector(`.error-message[data-for="${input.id}"]`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            input.classList.add('invalid');
        }
    }

    function clearError(input) {
        const errorElement = form.querySelector(`.error-message[data-for="${input.id}"]`);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            input.classList.remove('invalid');
        }
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validateField(input) {
        const value = input.value.trim();
        clearError(input);

        if (!value) {
            showError(input, errorMessages[input.name || input.id]);
            return false;
        }

        if (input.type === 'email' && !isValidEmail(value)) {
            showError(input, errorMessages.email);
            return false;
        }

        return true;
    }

    function validateForm() {
        let isValid = true;

        const inputs = form.querySelectorAll('input[required], input[type="checkbox"]');
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (validateForm()) {
            // form.submit();
            alert('form send');
            form.reset();
        } else {
            const firstInvalid = form.querySelector('.invalid');
            if (firstInvalid) firstInvalid.focus();
        }
    });

    form.addEventListener('input', function(e) {
        if (e.target.tagName === 'INPUT') {
            validateField(e.target);
        }
    });

    form.querySelector('input[type="checkbox"]')?.addEventListener('change', function() {
        validateField(this);
    });
});
