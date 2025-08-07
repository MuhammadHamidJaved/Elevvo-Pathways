document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    // Form fields
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    // Error message elements
    const fullNameError = document.getElementById('fullNameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');
    
    // Submit button elements
    const submitBtn = document.querySelector('.submit-btn');
    const btnText = document.querySelector('.btn-text');
    const btnLoader = document.querySelector('.btn-loader');

    // Validation patterns
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const namePattern = /^[a-zA-Z\s]{2,50}$/;

    // Real-time validation
    fullName.addEventListener('blur', () => validateField(fullName, validateName));
    email.addEventListener('blur', () => validateField(email, validateEmail));
    subject.addEventListener('blur', () => validateField(subject, validateSubject));
    message.addEventListener('blur', () => validateField(message, validateMessage));

    // Clear errors on input
    fullName.addEventListener('input', () => clearError(fullName));
    email.addEventListener('input', () => clearError(email));
    subject.addEventListener('input', () => clearError(subject));
    message.addEventListener('input', () => clearError(message));

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        } else {
            // Shake the form if validation fails
            form.classList.add('shake');
            setTimeout(() => form.classList.remove('shake'), 500);
        }
    });

    // Validation functions
    function validateName(value) {
        if (!value.trim()) {
            return 'Full name is required';
        }
        if (value.trim().length < 2) {
            return 'Name must be at least 2 characters long';
        }
        if (value.trim().length > 50) {
            return 'Name must be less than 50 characters';
        }
        if (!namePattern.test(value.trim())) {
            return 'Name can only contain letters and spaces';
        }
        return '';
    }

    function validateEmail(value) {
        if (!value.trim()) {
            return 'Email address is required';
        }
        if (!emailPattern.test(value.trim())) {
            return 'Please enter a valid email address';
        }
        return '';
    }

    function validateSubject(value) {
        if (!value.trim()) {
            return 'Subject is required';
        }
        if (value.trim().length < 5) {
            return 'Subject must be at least 5 characters long';
        }
        if (value.trim().length > 100) {
            return 'Subject must be less than 100 characters';
        }
        return '';
    }

    function validateMessage(value) {
        if (!value.trim()) {
            return 'Message is required';
        }
        if (value.trim().length < 10) {
            return 'Message must be at least 10 characters long';
        }
        if (value.trim().length > 1000) {
            return 'Message must be less than 1000 characters';
        }
        return '';
    }

    // Validate individual field
    function validateField(field, validator) {
        const value = field.value;
        const errorMessage = validator(value);
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');

        if (errorMessage) {
            showError(formGroup, errorElement, errorMessage);
            return false;
        } else {
            clearError(field);
            return true;
        }
    }

    // Show error
    function showError(formGroup, errorElement, message) {
        formGroup.classList.add('error');
        errorElement.textContent = message;
    }

    // Clear error
    function clearError(field) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        formGroup.classList.remove('error');
        errorElement.textContent = '';
    }

    // Validate entire form
    function validateForm() {
        const isNameValid = validateField(fullName, validateName);
        const isEmailValid = validateField(email, validateEmail);
        const isSubjectValid = validateField(subject, validateSubject);
        const isMessageValid = validateField(message, validateMessage);

        return isNameValid && isEmailValid && isSubjectValid && isMessageValid;
    }

    // Submit form
    function submitForm() {
        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'flex';

        // Simulate form submission (replace with actual submission logic)
        setTimeout(() => {
            // Hide form and show success message
            form.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Reset form after successful submission
            form.reset();
            
            // Reset button state
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
            
            // Optional: Show form again after a delay
            setTimeout(() => {
                successMessage.style.display = 'none';
                form.style.display = 'block';
            }, 5000);
            
        }, 2000); // Simulate 2-second delay
    }

    // Character counter for message field (bonus feature)
    const messageCounter = document.createElement('div');
    messageCounter.className = 'character-counter';
    messageCounter.style.cssText = 'font-size: 0.8rem; color: #666; text-align: right; margin-top: 5px;';
    message.parentNode.appendChild(messageCounter);

    message.addEventListener('input', function() {
        const currentLength = this.value.length;
        const maxLength = 1000;
        messageCounter.textContent = `${currentLength}/${maxLength} characters`;
        
        if (currentLength > maxLength * 0.9) {
            messageCounter.style.color = '#e74c3c';
        } else {
            messageCounter.style.color = '#666';
        }
    });

    // Initialize character counter
    messageCounter.textContent = '0/1000 characters';

    // Keyboard accessibility
    document.addEventListener('keydown', function(e) {
        // Submit form with Ctrl+Enter
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            form.dispatchEvent(new Event('submit'));
        }
    });

    // Auto-resize textarea
    message.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
});
