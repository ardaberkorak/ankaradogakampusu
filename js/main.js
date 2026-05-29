/* ==========================================================================
   ANKARA DOĞA KAMPÜSÜ - MAIN INTERACTIVE LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-actions .btn');

    // 1. Scroll Effect for Sticky Header
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger check on load in case the page is already scrolled
    handleScroll();

    // 2. Mobile Hamburger Menu Toggle
    const toggleMobileMenu = () => {
        hamburgerBtn.classList.toggle('active');
        mobileNav.classList.toggle('active');
        
        // Prevent body scrolling when mobile nav is open
        if (mobileNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    hamburgerBtn.addEventListener('click', toggleMobileMenu);

    // 3. Close Mobile Menu on Link Click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerBtn.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // 4. Smooth Anchor Scrolling & Active Link Highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120; // offset for sticky header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // 5. Language Switcher Logic
    const langSwitchBtn = document.getElementById('lang-switch-btn');
    const langText = langSwitchBtn.querySelector('.lang-text');
    
    const setLanguage = (lang) => {
        if (lang === 'en') {
            document.body.classList.remove('lang-tr');
            document.body.classList.add('lang-en');
            langText.textContent = 'TR';
            localStorage.setItem('preferred-lang', 'en');
        } else {
            document.body.classList.remove('lang-en');
            document.body.classList.add('lang-tr');
            langText.textContent = 'EN';
            localStorage.setItem('preferred-lang', 'tr');
        }
    };

    // Load saved preference or default to TR
    const savedLang = localStorage.getItem('preferred-lang') || 'tr';
    setLanguage(savedLang);

    langSwitchBtn.addEventListener('click', () => {
        const currentLang = document.body.classList.contains('lang-en') ? 'en' : 'tr';
        const newLang = currentLang === 'tr' ? 'en' : 'tr';
        setLanguage(newLang);
    });

    // 6. Contact Form AJAX Submission with Local Redirection
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = document.body.classList.contains('lang-en') 
                ? '<i class="fa-solid fa-spinner fa-spin"></i> Sending...' 
                : '<i class="fa-solid fa-spinner fa-spin"></i> Gönderiliyor...';
            
            try {
                const formData = new FormData(bookingForm);
                const response = await fetch(bookingForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Redirect to local success.html
                    window.location.href = 'success.html';
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                alert(document.body.classList.contains('lang-en')
                    ? 'An error occurred. Please try again or contact us directly.'
                    : 'Bir hata oluştu. Lütfen tekrar deneyin veya doğrudan bizimle iletişime geçin.');
                
                // Restore button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }
});
