document.addEventListener('DOMContentLoaded', function() {
    const sectionHeaders = document.querySelectorAll('.section-header');
    
    sectionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const section = this.parentElement;
            const content = this.nextElementSibling;
            const toggle = this.querySelector('.section-toggle');
            
            if (content.style.display === 'none' || content.style.display === '') {
                content.style.display = 'block';
                toggle.textContent = '-';
            } else {
                content.style.display = 'none';
                toggle.textContent = '+';
            }
        });
    });
    
    const acceptButton = document.getElementById('acceptButton');
    if (acceptButton) {
        acceptButton.addEventListener('click', function() {
            localStorage.setItem('termsAccepted', 'true');
            this.textContent = 'Terms Accepted';
            this.disabled = true;
            alert('Thank you for accepting our Terms of Service!');
        });
    }
    
    if (localStorage.getItem('termsAccepted') === 'true' && acceptButton) {
        acceptButton.textContent = 'Terms Accepted';
        acceptButton.disabled = true;
    }
    
    sectionHeaders.forEach(header => {
        const content = header.nextElementSibling;
        const toggle = header.querySelector('.section-toggle');
        content.style.display = 'block';
        toggle.textContent = '-';
    });
});