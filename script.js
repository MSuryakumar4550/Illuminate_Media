/* This file contains the logic for the Illuminate Media website.
   - Project Modal: Handles opening/closing the portfolio video popup.
   - Testimonial Carousel: Controls the client testimonial slider.
*/

document.addEventListener('DOMContentLoaded', () => {
    console.log('Illuminate Media website loaded!');
    
    // --- 1. Theme Toggle Logic (Example) ---
    const themeToggle = document.querySelector('.theme-toggle-switch');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            alert('Theme toggle clicked! (Add your logic here)');
            // document.body.classList.toggle('light-mode');
        });
    }

    // --- 2. Project Modal Logic ---
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalClient = document.getElementById('modal-client');
    const modalDate = document.getElementById('modal-date');
    const modalDesc = document.getElementById('modal-desc');
    const videoContainer = document.querySelector('.modal-video-container');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            // 1. Get data from data-* attributes
            const title = card.dataset.title;
            const client = card.dataset.client;
            const date = card.dataset.date;
            const desc = card.dataset.desc;
            const videoSrc = card.dataset.videoSrc; // Get the local file path

            // 2. Populate modal
            modalTitle.textContent = title;
            modalClient.textContent = `Client: ${client}`;
            modalDate.textContent = `Date: ${date}`;
            modalDesc.textContent = desc;
            
            // 3. Create local <video> embed
            videoContainer.innerHTML = `
                <video controls autoplay muted loop playsinline>
                    <source src="${videoSrc}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
            
            // 4. Show modal
            modal.style.display = 'flex';
        });
    });

    // Function to close the modal
    const closeTheModal = () => {
        modal.style.display = 'none';
        // Stop the video by clearing the container
        videoContainer.innerHTML = '';
    };

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeTheModal);
    }

    // Close modal by clicking outside the content
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeTheModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeTheModal();
        }
    });

    // --- 3. Testimonial Carousel Logic ---
    const slider = document.querySelector('.testimonial-slider');
    
    // Check if slider exists before running carousel logic
    if (slider) {
        const slides = document.querySelectorAll('.testimonial-slide');
        const prevBtn = document.querySelector('.carousel-control.prev');
        const nextBtn = document.querySelector('.carousel-control.next');
        
        let currentIndex = 0;
        const totalSlides = slides.length;

        function showSlide(index) {
            // Wrap around logic
            if (index >= totalSlides) {
                currentIndex = 0;
            } else if (index < 0) {
                currentIndex = totalSlides - 1;
            } else {
                currentIndex = index;
            }

            const offset = -currentIndex * 100;
            slider.style.transform = `translateX(${offset}%)`;
        }

        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => {
                showSlide(currentIndex + 1);
            });

            prevBtn.addEventListener('click', () => {
                showSlide(currentIndex - 1);
            });
        }
    }
});