document.addEventListener('DOMContentLoaded', function() {
    // 1. Initialize blogger section visibility with Intersection Observer
    const bloggerSection = document.querySelector('.blogger-registration');
    if (bloggerSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        observer.observe(bloggerSection);
    }

    // 2. Blogger form submission handling
    const bloggerForm = document.querySelector('.blogger-form');
    if (bloggerForm) {
        // File upload validation
        const fileInput = document.getElementById('portfolio');
        if (fileInput) {
            fileInput.addEventListener('change', function() {
                const errorElement = this.nextElementSibling;
                const progressContainer = errorElement.nextElementSibling;
                const progressBar = progressContainer.querySelector('progress');
                
                if (this.files.length > 0) {
                    const file = this.files[0];
                    const fileSizeMB = file.size / (1024 * 1024);
                    const validTypes = ['application/pdf', 'application/msword', 
                                      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
                    
                    if (!validTypes.includes(file.type)) {
                        showError(errorElement, "Only PDF, DOC, and DOCX files are allowed!");
                        return;
                    }
                    
                    if (fileSizeMB > 5) {
                        showError(errorElement, "File size exceeds 5MB limit!");
                        return;
                    }
                    
                    errorElement.style.display = 'none';
                    simulateUpload(progressContainer, progressBar);
                }
            });
        }

        // Form submission
        bloggerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = this.querySelector('.submit-btn');
            const btnText = btn.querySelector('.btn-text');
            
            btn.disabled = true;
            btnText.textContent = 'Submitting...';
            
            const spinner = document.createElement('span');
            spinner.className = 'spinner';
            btn.appendChild(spinner);
            
            setTimeout(() => {
                spinner.remove();
                btnText.textContent = 'Application Sent!';
                
                setTimeout(() => {
                    btnText.textContent = 'Apply to Become a Blogger';
                    btn.disabled = false;
                    bloggerForm.reset();
                    
                    const progressContainer = bloggerForm.querySelector('.file-progress');
                    if (progressContainer) progressContainer.style.display = 'none';
                }, 3000);
            }, 2000);
        });
    }

    // 3. Smooth scrolling for nav links
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", function(event) {
            if (this.getAttribute('href').startsWith('#')) {
                event.preventDefault();
                const targetId = this.getAttribute("href").substring(1);
                document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // 4. Featured Articles interaction
    const articleButtons = document.querySelectorAll('.article-btn');
    if (articleButtons.length > 0) {
        articleButtons.forEach(button => {
            button.addEventListener('click', function() {
                const articleTitle = this.closest('.article').querySelector('h3').textContent;
                const originalText = this.textContent;
                this.textContent = 'Loading...';
                this.disabled = true;
                
                setTimeout(() => {
                    alert(`"${articleTitle}" content will be displayed here!\n\n(In a real implementation, this would load the full article content.)`);
                    this.textContent = originalText;
                    this.disabled = false;
                }, 800);
            });
        });
        
        // Optional hover effects
        const articles = document.querySelectorAll('.article');
        articles.forEach(article => {
            article.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });
            
            article.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
});

// Helper functions
function showError(element, message) {
    element.textContent = message;
    element.style.display = 'block';
    document.getElementById('portfolio').value = "";
}

function simulateUpload(container, progressBar) {
    container.style.display = 'block';
    progressBar.value = 0;
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        progressBar.value = Math.min(progress, 100);
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                container.style.opacity = '0';
                setTimeout(() => container.style.display = 'none', 300);
            }, 800);
        }
    }, 200);
}