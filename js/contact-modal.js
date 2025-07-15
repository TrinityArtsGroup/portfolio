class FormspreeContactModal {
    constructor() {
        this.modal = null;
        this.form = null;
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupModal());
        } else {
            this.setupModal();
        }
    }

    setupModal() {
        if (!document.getElementById('contactModal')) {
            this.createModalHTML();
        }

        this.modal = document.getElementById('contactModal');
        this.form = document.getElementById('contactFormModal');

        if (this.modal && this.form) {
            this.bindEvents();
        }
    }

    createModalHTML() {
        const modalHTML = `
            <div class="modal fade" id="contactModal" tabindex="-1" aria-labelledby="contactModalLabel" aria-hidden="true">
                <div class="modal-dialog" style="max-width: 1000px;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2 class="modal-title" id="contactModalLabel">Get in Touch</h2>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row g-0">
                                <div class="col-md-6">
                                    <img src="/media/main/contact-image.jpg" alt="Contact Us" class="img-fluid h-100 w-100" style="object-fit: cover;">
                                </div>
                                <div class="col-md-6">
                                    <div style="padding: 3rem;">
                                        <form id="contactFormModal" action="https://formspree.io/f/manjpddn" method="POST">
                                            <div class="row">
                                                <div class="col-md-6 mb-3">
                                                    <label for="firstName" class="form-label">First Name *</label>
                                                    <input type="text" class="form-control" id="firstName" name="firstName" required>
                                                    <div class="invalid-feedback">Please provide a valid first name.</div>
                                                </div>
                                                <div class="col-md-6 mb-3">
                                                    <label for="lastName" class="form-label">Last Name *</label>
                                                    <input type="text" class="form-control" id="lastName" name="lastName" required>
                                                    <div class="invalid-feedback">Please provide a valid last name.</div>
                                                </div>
                                            </div>
                                            <div class="mb-3">
                                                <label for="email" class="form-label">Email Address *</label>
                                                <input type="email" class="form-control" id="email" name="_replyto" required>
                                                <div class="invalid-feedback">Please provide a valid email address.</div>
                                            </div>
                                            <div class="mb-3">
                                                <label for="subject" class="form-label">Subject *</label>
                                                <select class="form-select" id="subject" name="_subject" required>
                                                    <option value="">-- Please Choose --</option>
                                                    <option value="General Inquiry">General Inquiry</option>
                                                    <option value="Booking Request">Booking Request</option>
                                                    <option value="Collaboration">Collaboration</option>
                                                    <option value="Press & Media">Press & Media</option>
                                                    <option value="Technical Support">Technical Support</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                                <div class="invalid-feedback">Please select a subject.</div>
                                            </div>
                                            <div class="mb-3">
                                                <label for="message" class="form-label">Your Message *</label>
                                                <textarea class="form-control" id="message" name="message" rows="4" required placeholder="Your message..."></textarea>
                                                <div class="invalid-feedback">Please provide a message.</div>
                                            </div>
                                            
                                            <input type="hidden" name="_captcha" value="false">
                                            <input type="text" name="_gotcha" style="display:none">
                                            
                                            <button type="submit" class="btn btn-outline-gold">
                                                <span class="btn-text">SUBMIT</span>
                                                <span class="btn-loading d-none">
                                                    <i class="fas fa-spinner fa-spin"></i> Sending...
                                                </span>
                                            </button>
                                        </form>
                                        <div id="form-messages"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });

        const closeBtn = this.modal.querySelector('.btn-close');
        if (closeBtn) {
        closeBtn.addEventListener('click', () => this.hideModal());
    }

        this.modal.addEventListener('show.bs.modal', () => this.onModalShow());
        this.modal.addEventListener('hidden.bs.modal', () => this.onModalHide());

        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-bs-target="#contactModal"], .contact-trigger')) {
                e.preventDefault();
                this.showModal();
            }
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;

        field.classList.remove('is-invalid');

        switch (field.type) {
            case 'email':
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailPattern.test(value);
                break;
            case 'text':
            case 'textarea':
                isValid = value.length >= 2;
                break;
            case 'select-one':
                isValid = value !== '';
                break;
        }

        if (!isValid && field.required) {
            field.classList.add('is-invalid');
            return false;
        }

        return true;
    }

    clearFieldError(field) {
        field.classList.remove('is-invalid');
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (!this.validateForm()) {
            this.showMessage('Please correct the errors above.', 'danger');
            return;
        }

        this.form.classList.add('submitting');
        
        const btnText = this.form.querySelector('.btn-text');
        const btnLoading = this.form.querySelector('.btn-loading');
        if (btnText && btnLoading) {
            btnText.classList.add('d-none');
            btnLoading.classList.remove('d-none');
        }

        try {
            const formData = new FormData(this.form);
            
            const response = await fetch(this.form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                this.showMessage('Thank you! Your message has been sent successfully.', 'success');
                this.form.reset();
                setTimeout(() => this.hideModal(), 2000);
            } else {
                const data = await response.json();
                if (data.errors) {
                    this.showMessage(data.errors.map(error => error.message).join(', '), 'danger');
                } else {
                    this.showMessage('There was an error sending your message. Please try again.', 'danger');
                }
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showMessage('There was an error sending your message. Please try again.', 'danger');
        } finally {
            this.form.classList.remove('submitting');
            if (btnText && btnLoading) {
                btnText.classList.remove('d-none');
                btnLoading.classList.add('d-none');
            }
        }
    }

    showMessage(message, type) {
        const messagesContainer = document.getElementById('form-messages');
        messagesContainer.innerHTML = `
            <div class="alert alert-${type}" role="alert">
                ${message}
            </div>
        `;

        if (type === 'success') {
            setTimeout(() => {
                messagesContainer.innerHTML = '';
            }, 5000);
        }
    }

    showModal() {
        if (typeof bootstrap !== 'undefined') {
            const modalInstance = new bootstrap.Modal(this.modal);
            modalInstance.show();
        }
    }

    hideModal() {
        if (typeof bootstrap !== 'undefined') {
            const modalInstance = bootstrap.Modal.getInstance(this.modal);
            if (modalInstance) {
                modalInstance.hide();
            }
        }
    }

    onModalShow() {
        const firstInput = this.form.querySelector('input');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 150);
        }
    }

    onModalHide() {
        document.getElementById('form-messages').innerHTML = '';
        const inputs = this.form.querySelectorAll('.is-invalid');
        inputs.forEach(input => input.classList.remove('is-invalid'));
    }
}

// Initialize contact modal when page loads
new FormspreeContactModal();

// Global function to open contact modal
window.openContactModal = function() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        const modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
    }
};