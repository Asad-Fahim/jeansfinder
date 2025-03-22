// Create a new JavaScript file (about.js) and add this code

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const scrollDownBtn = document.querySelector('.scroll-down');
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', function() {
            document.querySelector('#about').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    }

    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.about-content, .timeline-item, .stat-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    
    animateOnScroll();

    const animateSkills = function() {
        const statsSection = document.querySelector('.about-stats');
        if (!statsSection) return;
        
        const statPosition = statsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (statPosition < screenPosition) {
            document.querySelectorAll('.stat-progress').forEach(progress => {
                const width = progress.classList[1].split('-')[1] + '%';
                progress.style.width = width;
            });
        }
    };

    window.addEventListener('scroll', animateSkills);
    
    const heroQuote = document.querySelector('.hero-quote');
    if (heroQuote) {
        const text = heroQuote.innerHTML;
        heroQuote.innerHTML = '';
        
        let i = 0;
        const typeWriter = function() {
            if (i < text.length) {
                heroQuote.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 20);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    const checkTimelineResponsiveness = function() {
        const timeline = document.querySelector('.timeline');
        if (!timeline) return;
        
        if (window.innerWidth <= 768) {
            const timelineItems = document.querySelectorAll('.timeline-item');
            timelineItems.forEach(item => {
                item.style.left = '0';
            });
        }
    };

    window.addEventListener('resize', checkTimelineResponsiveness);
    checkTimelineResponsiveness();
    
    const animateCounters = function() {
        const statsSection = document.querySelector('.about-stats');
        if (!statsSection || statsSection.getAttribute('data-animated') === 'true') return;
        
        const statPosition = statsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (statPosition < screenPosition) {
            const counters = document.querySelectorAll('.stat-title span:nth-child(2)');
            
            counters.forEach(counter => {
                const target = parseInt(counter.innerText);
                let count = 0;
                
                const updateCounter = setInterval(() => {
                    if (count < target) {
                        count++;
                        counter.innerText = count + '%';
                    } else {
                        clearInterval(updateCounter);
                    }
                }, 15);
            });
            
            statsSection.setAttribute('data-animated', 'true');
        }
    };
    
    window.addEventListener('scroll', animateCounters);
});







const animateRoadmap = function() {
    const roadmapItems = document.querySelectorAll('.roadmap-item');
    
    roadmapItems.forEach((item, index) => {
        const itemPosition = item.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (itemPosition < screenPosition) {
          
            setTimeout(() => {
                item.classList.add('animate');
            }, 150 * index);
        }
    });
};

window.addEventListener('scroll', animateRoadmap);

document.addEventListener('DOMContentLoaded', function() {
    animateRoadmap();
});