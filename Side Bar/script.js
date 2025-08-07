// DOM Elements
const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggleBtn');
const navLinks = document.querySelectorAll('.nav-link');

// State management
let isCollapsed = false;

// Initialize the sidebar
document.addEventListener('DOMContentLoaded', function() {
    initializeSidebar();
    setupEventListeners();
    setupTooltips();
});

// Initialize sidebar functionality
function initializeSidebar() {
    // Set initial state from localStorage if available
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState === 'true') {
        isCollapsed = true;
        sidebar.classList.add('collapsed');
        updateToggleIcon();
    }
    
    // Add active class to first nav item by default
    if (navLinks.length > 0) {
        navLinks[0].classList.add('active');
    }
}

// Setup event listeners
function setupEventListeners() {
    // Toggle button click
    toggleBtn.addEventListener('click', toggleSidebar);
    
    // Navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeydown);
    
    // Window resize handling
    window.addEventListener('resize', handleResize);
}

// Setup tooltips for collapsed state
function setupTooltips() {
    navLinks.forEach(link => {
        const textElement = link.querySelector('.nav-text');
        if (textElement) {
            link.setAttribute('data-tooltip', textElement.textContent);
        }
    });
}

// Toggle sidebar function
function toggleSidebar() {
    isCollapsed = !isCollapsed;
    sidebar.classList.toggle('collapsed');
    
    // Save state to localStorage
    localStorage.setItem('sidebarCollapsed', isCollapsed.toString());
    
    // Update toggle button icon
    updateToggleIcon();
    
    // Add smooth animation class
    sidebar.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    // Fire custom event
    const event = new CustomEvent('sidebarToggle', {
        detail: { collapsed: isCollapsed }
    });
    document.dispatchEvent(event);
}

// Update toggle button icon
function updateToggleIcon() {
    const icon = toggleBtn.querySelector('i');
    if (isCollapsed) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-arrow-right');
    } else {
        icon.classList.remove('fa-arrow-right');
        icon.classList.add('fa-bars');
    }
}

// Handle navigation link clicks
function handleNavClick(event) {
    event.preventDefault();
    
    // Remove active class from all links
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Add active class to clicked link
    event.currentTarget.classList.add('active');
    
    // Get the navigation text for logging/tracking
    const navText = event.currentTarget.querySelector('.nav-text').textContent;
    console.log(`Navigated to: ${navText}`);
    
    // Add click effect
    addClickEffect(event.currentTarget);
    
    // If on mobile and sidebar is open, close it
    if (window.innerWidth <= 768 && !isCollapsed) {
        setTimeout(() => {
            toggleSidebar();
        }, 150);
    }
}

// Add click effect to navigation items
function addClickEffect(element) {
    element.style.transform = 'scale(0.95)';
    setTimeout(() => {
        element.style.transform = '';
    }, 150);
}

// Handle keyboard navigation
function handleKeydown(event) {
    // Toggle sidebar with Ctrl + B
    if (event.ctrlKey && event.key === 'b') {
        event.preventDefault();
        toggleSidebar();
    }
    
    // Navigate with arrow keys when sidebar is focused
    if (event.target.closest('.sidebar')) {
        const currentActive = document.querySelector('.nav-link.active');
        const allNavLinks = Array.from(navLinks);
        const currentIndex = allNavLinks.indexOf(currentActive);
        
        if (event.key === 'ArrowDown' && currentIndex < allNavLinks.length - 1) {
            event.preventDefault();
            allNavLinks[currentIndex].classList.remove('active');
            allNavLinks[currentIndex + 1].classList.add('active');
            allNavLinks[currentIndex + 1].focus();
        } else if (event.key === 'ArrowUp' && currentIndex > 0) {
            event.preventDefault();
            allNavLinks[currentIndex].classList.remove('active');
            allNavLinks[currentIndex - 1].classList.add('active');
            allNavLinks[currentIndex - 1].focus();
        } else if (event.key === 'Enter') {
            event.preventDefault();
            currentActive.click();
        }
    }
}

// Handle window resize
function handleResize() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // On mobile, treat collapsed as hidden
        if (isCollapsed) {
            sidebar.style.transform = 'translateX(0)';
        } else {
            sidebar.style.transform = 'translateX(-100%)';
        }
    } else {
        // On desktop, reset transform
        sidebar.style.transform = '';
    }
}

// Utility function to programmatically set active nav item
function setActiveNavItem(index) {
    navLinks.forEach(link => link.classList.remove('active'));
    if (navLinks[index]) {
        navLinks[index].classList.add('active');
    }
}

// Utility function to get current active nav item
function getActiveNavItem() {
    return document.querySelector('.nav-link.active');
}

// Animation utilities
function animateIn(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    
    requestAnimationFrame(() => {
        element.style.transition = 'all 0.3s ease';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    });
}

// Initialize smooth scroll behavior
function initSmoothScroll() {
    document.documentElement.style.scrollBehavior = 'smooth';
}

// Export functions for external use (if needed)
window.SidebarAPI = {
    toggle: toggleSidebar,
    setActive: setActiveNavItem,
    getActive: getActiveNavItem,
    isCollapsed: () => isCollapsed
};

// Initialize smooth scroll
initSmoothScroll();

// Add hover effects for better UX
navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        if (!this.classList.contains('active')) {
            this.style.backgroundColor = 'rgba(52, 152, 219, 0.1)';
        }
    });
    
    link.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active')) {
            this.style.backgroundColor = '';
        }
    });
});

// Add loading state management
function showLoading() {
    const loader = document.createElement('div');
    loader.className = 'loading-spinner';
    loader.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    loader.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999;
        color: #3498db;
        font-size: 24px;
    `;
    document.body.appendChild(loader);
    return loader;
}

function hideLoading(loader) {
    if (loader && loader.parentNode) {
        loader.parentNode.removeChild(loader);
    }
}

// Performance optimization: Debounce resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Use debounced resize handler
window.removeEventListener('resize', handleResize);
window.addEventListener('resize', debounce(handleResize, 250));
