// Loading Screen
window.addEventListener('load', function() {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.style.opacity = '0';
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    }, 1000);
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Smooth scrolling for anchor links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.mission-vision, .value-item, .stakeholder-card, .team-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Initialize counters when in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = entry.target.querySelectorAll('h3');
            stats.forEach(stat => {
                const target = parseInt(stat.textContent);
                if (!isNaN(target)) {
                    animateCounter(stat, target);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe hero stats
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Form handling (si agregas formulario de contacto)
function handleContactForm(event) {
    event.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
}

// Add any additional interactive features here
console.log('GlobalTech Solutions - Página cargada correctamente');

// ... (mantén todo el JavaScript anterior y agrega esto al final) ...

// Animación específica para el organigrama
function initOrgChartAnimations() {
    const orgNodes = document.querySelectorAll('.org-node');
    
    orgNodes.forEach((node, index) => {
        node.style.opacity = '0';
        node.style.transform = 'translateY(30px)';
        node.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
    });

    const orgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const nodes = entry.target.querySelectorAll('.org-node');
                nodes.forEach(node => {
                    node.style.opacity = '1';
                    node.style.transform = 'translateY(0)';
                });
            }
        });
    }, { threshold: 0.1 });

    const orgSection = document.querySelector('.org-section');
    if (orgSection) {
        orgObserver.observe(orgSection);
    }
}

// Inicializar animaciones del organigrama cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initOrgChartAnimations();
    
    // Efecto hover mejorado para nodos del organigrama
    const nodes = document.querySelectorAll('.node-content');
    nodes.forEach(node => {
        node.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        node.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

console.log('Organigrama mejorado cargado correctamente');

// ... (mantén todo el JavaScript anterior) ... 

// Manejo del formulario de contacto
function handleContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Simular envío (en un caso real, aquí iría una petición AJAX)
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        // Mostrar mensaje de éxito
        showNotification('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
        
        // Resetear formulario
        form.reset();
        
        // Restaurar botón
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Mostrar notificación
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Estilos para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initOrgChartAnimations();
    
    // Efecto hover mejorado para nodos del organigrama
    const nodes = document.querySelectorAll('.node-content');
    nodes.forEach(node => {
        node.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        node.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Manejar formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Validación en tiempo real del formulario
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                this.style.borderColor = '#10b981';
            } else {
                this.style.borderColor = '#e5e7eb';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.style.borderColor = '#3b82f6';
            }
        });
    });
    
    // Smooth scrolling para todos los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Función global para scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

console.log('Sitio web completamente cargado y funcional');

// ... (mantén todo el JavaScript anterior) ...

// Base de datos de correos por departamento
const departmentEmails = {
    'direccion': 'bl04ju09fl17@gmail.com',
    'operaciones': 'ulisesjanbm@gmail.com',
    'soporte': 'manueldesion22@gmail.com',
    'ventas': 'fernanda@globaltech.com',
    'contabilidad': 'lupitavillegascano2099@gmail.com',
    'general': 'info@globaltech.com'
};

// Actualizar email del destinatario
function updateRecipientEmail() {
    const departmentSelect = document.getElementById('contactDepartment');
    const recipientEmail = document.getElementById('recipientEmail');
    const selectedDepartment = departmentSelect.value;
    
    if (selectedDepartment && departmentEmails[selectedDepartment]) {
        recipientEmail.value = departmentEmails[selectedDepartment];
    } else {
        recipientEmail.value = '';
    }
}

// Manejo mejorado del formulario de contacto
function handleContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Obtener datos del formulario
    const department = formData.get('department');
    const recipient = formData.get('recipient');
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Validar que se haya seleccionado un departamento
    if (!department) {
        showNotification('Por favor selecciona un área de contacto', 'error');
        return;
    }
    
    // Simular envío (en producción esto sería una petición AJAX a tu backend)
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitButton.disabled = true;
    
    // Simular tiempo de envío
    setTimeout(() => {
        // Aquí normalmente enviarías el correo usando tu backend
        // Por ahora solo mostraremos un mensaje de éxito
        
        const departmentNames = {
            'direccion': 'Dirección General',
            'operaciones': 'Operaciones Técnicas',
            'soporte': 'Soporte Técnico',
            'ventas': 'Ventas y Cotizaciones',
            'contabilidad': 'Contabilidad y Facturación',
            'general': 'Consulta General'
        };
        
        showNotification(
            `¡Mensaje enviado correctamente al área de ${departmentNames[department]}! Te contactaremos pronto.`, 
            'success'
        );
        
        // Resetear formulario
        form.reset();
        document.getElementById('recipientEmail').value = '';
        
        // Restaurar botón
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // En un entorno real, aquí enviarías los datos a tu servidor
        console.log('Datos del formulario:', {
            department: departmentNames[department],
            recipient: recipient,
            name: name,
            email: email,
            subject: subject,
            message: message,
            timestamp: new Date().toISOString()
        });
        
    }, 2000);
}

// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initOrgChartAnimations();
    
    // Efecto hover mejorado para nodos del organigrama
    const nodes = document.querySelectorAll('.node-content');
    nodes.forEach(node => {
        node.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        node.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Manejar formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Validación en tiempo real del formulario
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() !== '' && this.id !== 'recipientEmail') {
                this.style.borderColor = '#10b981';
            } else {
                this.style.borderColor = '#e5e7eb';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim() !== '' && this.id !== 'recipientEmail') {
                this.style.borderColor = '#3b82f6';
            }
        });
    });
    
    // Smooth scrolling para todos los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

console.log('Sitio web de seguridad vehicular cargado correctamente');
// Agrega esta línea en el objeto departmentEmails
