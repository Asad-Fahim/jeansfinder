const backToTopButton = document.getElementById('backToTop');
            
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

const cookieBanner = document.getElementById('cookieBanner');
const acceptCookiesButton = document.getElementById('acceptCookies');
const cookieSettingsButton = document.getElementById('cookieSettings');

if (!localStorage.getItem('cookieConsent')) {
    setTimeout(() => {
        cookieBanner.style.display = 'block';
    }, 1000);
}

acceptCookiesButton.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'accepted');
    cookieBanner.style.display = 'none';
});

cookieSettingsButton.addEventListener('click', () => {
    alert('Accept all cookies to enhance your experience.');
});