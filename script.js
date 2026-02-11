// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// Contact Form Validation and Processing
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formResponse = document.getElementById('formResponse');
    const submittedDataSection = document.getElementById('submittedDataSection');
    const submittedDataContent = document.getElementById('submittedDataContent');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            clearErrors();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validate form
            let isValid = true;
            
            // Name validation
            if (name === '') {
                showError('nameError', 'Name is required');
                isValid = false;
            } else if (name.length < 2) {
                showError('nameError', 'Name must be at least 2 characters long');
                isValid = false;
            }
            
            // Email validation
            if (email === '') {
                showError('emailError', 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('emailError', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Message validation
            if (message === '') {
                showError('messageError', 'Message is required');
                isValid = false;
            } else if (message.length < 10) {
                showError('messageError', 'Message must be at least 10 characters long');
                isValid = false;
            }
            
            if (isValid) {
                // Process form data
                processFormData(name, email, message);
            }
        });
    }

    // Real-time validation
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    if (nameInput) {
        nameInput.addEventListener('blur', function() {
            validateName();
        });
        
        nameInput.addEventListener('input', function() {
            clearError('nameError');
        });
    }

    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            validateEmail();
        });
        
        emailInput.addEventListener('input', function() {
            clearError('emailError');
        });
    }

    if (messageInput) {
        messageInput.addEventListener('blur', function() {
            validateMessage();
        });
        
        messageInput.addEventListener('input', function() {
            clearError('messageError');
        });
    }

    // Validation functions
    function validateName() {
        const name = nameInput.value.trim();
        if (name === '') {
            showError('nameError', 'Name is required');
            return false;
        } else if (name.length < 2) {
            showError('nameError', 'Name must be at least 2 characters long');
            return false;
        }
        return true;
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        if (email === '') {
            showError('emailError', 'Email is required');
            return false;
        } else if (!isValidEmail(email)) {
            showError('emailError', 'Please enter a valid email address');
            return false;
        }
        return true;
    }

    function validateMessage() {
        const message = messageInput.value.trim();
        if (message === '') {
            showError('messageError', 'Message is required');
            return false;
        } else if (message.length < 10) {
            showError('messageError', 'Message must be at least 10 characters long');
            return false;
        }
        return true;
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Error handling functions
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        const inputElement = errorElement.previousElementSibling;
        
        errorElement.textContent = message;
        inputElement.classList.add('error');
    }

    function clearError(elementId) {
        const errorElement = document.getElementById(elementId);
        const inputElement = errorElement.previousElementSibling;
        
        errorElement.textContent = '';
        inputElement.classList.remove('error');
    }

    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        const inputElements = document.querySelectorAll('.error');
        
        errorElements.forEach(element => {
            element.textContent = '';
        });
        
        inputElements.forEach(element => {
            element.classList.remove('error');
        });
    }

    // Form data processing
    function processFormData(name, email, message) {
        // Create form data object
        const formData = {
            name: name,
            email: email,
            message: message,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            method: 'POST' // Simulating POST method
        };

        // Log to console for demonstration
        console.log('Form Data Submitted:', formData);
        console.log('HTTP Method: POST');
        console.log('Data Flow: Browser -> JavaScript Processing -> Console Log');
        console.log('In a real application, this would be sent to a server endpoint');

        // Display success message
        displayFormResponse('success', 'Thank you for your message! We will get back to you soon.');

        // Display submitted data
        displaySubmittedData(formData);

        // Reset form
        contactForm.reset();

        // Simulate API call (in real scenario, this would be an actual fetch/axios call)
        simulateApiCall(formData);
    }

    // Display form response
    function displayFormResponse(type, message) {
        formResponse.className = `form-response ${type}`;
        formResponse.textContent = message;
        formResponse.style.display = 'block';

        // Hide response after 5 seconds
        setTimeout(() => {
            formResponse.style.display = 'none';
        }, 5000);
    }

    // Display submitted data
    function displaySubmittedData(data) {
        const submittedDate = new Date(data.timestamp).toLocaleString();
        
        submittedDataContent.innerHTML = `
            <div class="data-item">
                <strong>Name:</strong>
                <p>${escapeHtml(data.name)}</p>
            </div>
            <div class="data-item">
                <strong>Email:</strong>
                <p>${escapeHtml(data.email)}</p>
            </div>
            <div class="data-item">
                <strong>Message:</strong>
                <p>${escapeHtml(data.message)}</p>
            </div>
            <div class="data-item">
                <strong>Submission Time:</strong>
                <p>${submittedDate}</p>
            </div>
            <div class="data-item">
                <strong>HTTP Method:</strong>
                <p>${data.method}</p>
            </div>
            <div class="data-item">
                <strong>Browser Info:</strong>
                <p>${escapeHtml(data.userAgent)}</p>
            </div>
        `;
        
        submittedDataSection.style.display = 'block';
        
        // Scroll to submitted data section
        submittedDataSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Simulate API call
    function simulateApiCall(data) {
        console.log('=== API Call Simulation ===');
        console.log('Endpoint: /api/contact');
        console.log('Method: POST');
        console.log('Headers: { "Content-Type": "application/json" }');
        console.log('Request Body:', JSON.stringify(data, null, 2));
        
        // Simulate network delay
        setTimeout(() => {
            console.log('=== API Response Simulation ===');
            console.log('Status: 200 OK');
            console.log('Response: { "success": true, "message": "Message received successfully" }');
            console.log('=== End API Simulation ===');
        }, 1000);
    }

    // HTML escaping to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Form data storage in localStorage (for demonstration)
document.addEventListener('DOMContentLoaded', function() {
    // Store submitted forms in localStorage
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data (this happens after validation in the main submit handler)
            setTimeout(() => {
                const formData = {
                    name: document.getElementById('name').value.trim(),
                    email: document.getElementById('email').value.trim(),
                    message: document.getElementById('message').value.trim(),
                    timestamp: new Date().toISOString()
                };

                // Get existing submissions from localStorage
                let submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
                
                // Add new submission
                submissions.push(formData);
                
                // Keep only last 5 submissions to avoid storage issues
                if (submissions.length > 5) {
                    submissions = submissions.slice(-5);
                }
                
                // Save to localStorage
                localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
                
                console.log('Form data saved to localStorage:', formData);
                console.log('All submissions:', submissions);
            }, 100);
        });
    }

    // Display submission count (optional feature)
    function displaySubmissionCount() {
        const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        console.log(`Total submissions stored: ${submissions.length}`);
    }

    // Call this function to check stored submissions
    displaySubmissionCount();
});

// GET vs POST demonstration
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== HTTP Methods Demonstration ===');
    console.log('GET Method:');
    console.log('- Used for retrieving data');
    console.log('- Parameters sent in URL');
    console.log('- Can be cached');
    console.log('- Limited data size');
    console.log('- Example: GET /api/contact?name=John&email=john@example.com');
    
    console.log('\nPOST Method:');
    console.log('- Used for sending data to server');
    console.log('- Parameters sent in request body');
    console.log('- Not cached');
    console.log('- Larger data capacity');
    console.log('- More secure for sensitive data');
    console.log('- Example: POST /api/contact with JSON body');
    
    console.log('\nData Flow in this Application:');
    console.log('1. User fills form in browser');
    console.log('2. JavaScript validates input on client-side');
    console.log('3. Form data is captured and processed');
    console.log('4. Data is displayed dynamically on the page');
    console.log('5. Data is logged to console (simulating server communication)');
    console.log('6. Data is stored in localStorage (client-side persistence)');
    console.log('7. In production: Data would be sent to server via POST request');
    console.log('=== End Demonstration ===');
});
