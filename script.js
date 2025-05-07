document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle logic
    const handleThemeToggle = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      if (currentTheme === 'light') {
        applyTheme('dark');
      } else {
        applyTheme('light');
      }
    };
    
    const applyTheme = (theme) => {
      document.documentElement.setAttribute('data-theme', theme);
      const themeToggleBtn = document.querySelector('.theme-toggle');
      themeToggleBtn.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    };
    
    // Load user theme preference or system default
    const currentTheme = localStorage.getItem('theme') || 'light';
    applyTheme(currentTheme);
    
    // Navigation active link handling and smooth scroll
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // Add click event listeners to nav links for smooth scrolling
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href')?.substring(1);
        if (targetId) {
          const targetSection = document.getElementById(targetId);
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            
            // Update active link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
          }
        }
      });
    });
    
    // Update active link based on scroll position
    function updateActiveNavLink() {
      const scrollPosition = window.scrollY + 80; // Offset for better accuracy
  
      document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Call once on load to set initial active link
    updateActiveNavLink();
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    contactForm?.addEventListener('submit', function(e) {
      e.preventDefault();
      const nameInput = document.getElementById('name');
      alert(`Thank you, ${nameInput.value}! Your message has been sent.`);
      // Fixed the reset() method issue by using the form object directly
      this.reset();
    });
    
    // Image popup overlay
    const popupOverlay = document.getElementById('img-popup-overlay');
    const popupImage = popupOverlay?.querySelector('img');
    const popupCaption = document.getElementById('img-popup-caption');
    
    // Helper function to open popup with given image src and alt
    const openImagePopup = (src, alt) => {
      if (popupImage && popupOverlay && popupCaption) {
        popupImage.src = src;
        popupCaption.textContent = alt || '';
        popupImage.alt = alt || 'Expanded image';
        popupOverlay.classList.add('visible');
        document.body.style.overflow = 'hidden'; // disable scroll on background
      }
    };
    
    // Helper function to close popup
    const closeImagePopup = () => {
      if (popupImage && popupOverlay && popupCaption) {
        popupOverlay.classList.remove('visible');
        popupCaption.textContent = '';
        popupImage.src = '';
        popupImage.alt = '';
        document.body.style.overflow = ''; // enable scroll on background
      }
    };
    
    // Set up image click handlers
    const setImageClickEffect = (imgElement) => {
      imgElement.addEventListener('click', (e) => {
        e.preventDefault();
        openImagePopup(imgElement.src, imgElement.alt);
      });
      
      imgElement.style.cursor = 'pointer';
      imgElement.tabIndex = 0;
      imgElement.setAttribute('role', 'button');
      imgElement.setAttribute('aria-label', `${imgElement.alt}, Click to view full screen`);
    };
    
    // Apply click handlers to all images
    document.querySelectorAll('.artwork-gallery img, .profile-image img, .achievement-lists img, .writings-list img').forEach(img => {
      setImageClickEffect(img);
    });
    
    // Close popup on overlay click (outside image)
    popupOverlay?.addEventListener('click', e => {
      if (e.target === popupOverlay) {
        closeImagePopup();
      }
    });
    
    // Close popup on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && popupOverlay?.classList.contains('visible')) {
        closeImagePopup();
      }
    });
  
    // Theme toggle button event listener
    const themeToggleBtn = document.querySelector('.theme-toggle');
    themeToggleBtn?.addEventListener('click', handleThemeToggle);
  
    // Set up intersection observers for animations
    const setupIntersectionObserver = () => {
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
      };
      
      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            sectionObserver.unobserve(entry.target);
          }
        });
      }, observerOptions);
      
      document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
      });
      
      const artworkObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('artwork-visible');
            artworkObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      
      document.querySelectorAll('.artwork-gallery img').forEach(img => {
        artworkObserver.observe(img);
      });
    };
    
    setupIntersectionObserver();
  });
  