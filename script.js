// Global Variables
const pages = {
    'index.html': 'main-content',
    'about.html': 'about-page',
    'contact.html': 'contact-page',
    'article1.html': 'article1-page',
    'article2.html': 'article2-page',
    'article3.html': 'article3-page'
};

// Handle Loader Animation
document.addEventListener('DOMContentLoaded', () => {
    // Show loader for 2 seconds before revealing content
    setTimeout(() => {
        document.getElementById('loader').style.opacity = '0';
        
        // Determine which page to show based on URL
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const pageToShow = pages[currentPage] || 'main-content';
        
        // Hide loader and show content after fade out
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none';
            document.getElementById(pageToShow).style.display = 'block';
        }, 500);
    }, 2000);
    
    // Initialize all event listeners
    initNavigation();
    initMobileMenu();
    initForms();
    initArticleLinks();
});

// Handle Navigation
function initNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show loader briefly for page transition
            const loader = document.getElementById('loader');
            loader.style.display = 'flex';
            loader.style.opacity = '1';
            
            // Hide all page content
            Object.values(pages).forEach(page => {
                document.getElementById(page).style.display = 'none';
            });
            
            // Determine which page to show
            const pageToShow = pages[this.getAttribute('href')];
            
            // Show loader then new content
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    document.getElementById(pageToShow).style.display = 'block';
                    
                    // Update URL without reload
                    history.pushState({}, '', this.getAttribute('href'));
                }, 500);
            }, 1000);
        });
    });
}

// Handle Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });
}

// Handle Form Submissions
function initForms() {
    // Newsletter Form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const message = document.getElementById('newsletter-message');
            
            // Simple validation
            if (email && email.includes('@') && email.includes('.')) {
                message.textContent = 'Thank you for subscribing!';
                message.style.color = 'var(--cyan-dark)';
                this.reset();
            } else {
                message.textContent = 'Please enter a valid email address.';
                message.style.color = 'var(--error-color)';
            }
        });
    }
    
    // Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('#name').value;
            const email = this.querySelector('#email').value;
            const subject = this.querySelector('#subject').value;
            const message = this.querySelector('#message').value;
            const contactMessage = document.getElementById('contact-message');
            
            // Simple validation
            if (name && email && subject && message) {
                contactMessage.textContent = 'Your message has been sent. We\'ll get back to you soon!';
                contactMessage.style.color = 'var(--cyan-dark)';
                this.reset();
            } else {
                contactMessage.textContent = 'Please fill in all fields.';
                contactMessage.style.color = 'var(--error-color)';
            }
        });
    }
}

// Handle Article Links
function initArticleLinks() {
    const articleImages = document.querySelectorAll('.article-image');
    
    articleImages.forEach(articleImage => {
        articleImage.addEventListener('click', function() {
            const articleLink = this.closest('.article-card').querySelector('.read-more');
            if (articleLink) {
                articleLink.click();
            }
        });
    });
    
    const readMoreLinks = document.querySelectorAll('.read-more');
    
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show loader briefly for page transition
            const loader = document.getElementById('loader');
            loader.style.display = 'flex';
            loader.style.opacity = '1';
            
            // Hide all page content
            Object.values(pages).forEach(page => {
                document.getElementById(page).style.display = 'none';
            });
            
            // Determine which article to show
            const articlePage = pages[this.getAttribute('href')];
            
            // Show loader then article content
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    document.getElementById(articlePage).style.display = 'block';
                    
                    // Scroll to top
                    window.scrollTo(0, 0);
                    
                    // Update URL without reload
                    history.pushState({}, '', this.getAttribute('href'));
                }, 500);
            }, 1000);
        });
    });
}

// Handle Browser Navigation (Back/Forward)
window.addEventListener('popstate', () => {
    // Determine which page to show based on URL
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const pageToShow = pages[currentPage] || 'main-content';
    
    // Hide all page content
    Object.values(pages).forEach(page => {
        document.getElementById(page).style.display = 'none';
    });
    
    // Show the appropriate page
    document.getElementById(pageToShow).style.display = 'block';
    
    // Update active nav link
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
