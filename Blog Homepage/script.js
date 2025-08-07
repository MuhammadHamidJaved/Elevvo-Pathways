const blogPosts = [
    {
        id: 1,
        title: "Getting Started with React Hooks",
        description: "Learn how to use React Hooks to manage state and side effects in functional components. This comprehensive guide covers useState, useEffect, and custom hooks.",
        category: "tech",
        date: "2025-07-15",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=220&fit=crop"
    },
    {
        id: 2,
        title: "Exploring the Streets of Tokyo",
        description: "A journey through the vibrant neighborhoods of Tokyo, from the bustling Shibuya crossing to the serene temples of Asakusa. Discover hidden gems and local culture.",
        category: "travel",
        date: "2025-07-14",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=220&fit=crop"
    },
    {
        id: 3,
        title: "The Perfect Pasta Carbonara Recipe",
        description: "Master the art of making authentic Italian carbonara with this step-by-step recipe. Learn the secrets to achieving the perfect creamy texture without scrambling the eggs.",
        category: "food",
        date: "2025-07-13",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=220&fit=crop"
    },
    {
        id: 4,
        title: "Building Responsive Web Layouts",
        description: "Modern techniques for creating responsive web layouts using CSS Grid and Flexbox. Learn how to build layouts that work perfectly on all devices.",
        category: "tech",
        date: "2025-07-12",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=220&fit=crop"
    },
    {
        id: 5,
        title: "Backpacking Through Southeast Asia",
        description: "Essential tips and itinerary for backpacking through Thailand, Vietnam, and Cambodia. Budget-friendly advice for the ultimate adventure experience.",
        category: "travel",
        date: "2025-07-11",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=220&fit=crop"
    },
    {
        id: 6,
        title: "Homemade Sourdough Bread Guide",
        description: "Complete guide to making sourdough bread from scratch. Learn how to create and maintain a sourdough starter and bake the perfect loaf every time.",
        category: "food",
        date: "2025-07-10",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=220&fit=crop"
    },
    {
        id: 7,
        title: "JavaScript ES6+ Features You Should Know",
        description: "Explore the most useful ES6+ features including arrow functions, destructuring, async/await, and modules. Modernize your JavaScript coding style.",
        category: "tech",
        date: "2025-07-09",
        image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=220&fit=crop"
    },
    {
        id: 8,
        title: "Weekend Getaway to the Swiss Alps",
        description: "Discover the breathtaking beauty of the Swiss Alps with this weekend itinerary. From hiking trails to cozy mountain lodges, experience Alpine perfection.",
        category: "travel",
        date: "2025-07-08",
        image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&h=220&fit=crop"
    },
    {
        id: 9,
        title: "Mastering French Cooking Techniques",
        description: "Learn fundamental French cooking techniques that will elevate your culinary skills. From knife skills to mother sauces, master the basics of French cuisine.",
        category: "food",
        date: "2025-07-07",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=220&fit=crop"
    },
    {
        id: 10,
        title: "Node.js Performance Optimization",
        description: "Best practices for optimizing Node.js application performance. Learn about clustering, caching, database optimization, and monitoring techniques.",
        category: "tech",
        date: "2025-07-06",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=220&fit=crop"
    },
    {
        id: 11,
        title: "Road Trip Across New Zealand",
        description: "Epic road trip itinerary covering both North and South Islands of New Zealand. Stunning landscapes, adventure activities, and local recommendations.",
        category: "travel",
        date: "2025-07-05",
        image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=400&h=220&fit=crop"
    },
    {
        id: 12,
        title: "Authentic Mexican Street Tacos",
        description: "Recreate the flavors of Mexican street food with this authentic taco recipe. Learn about traditional fillings, salsas, and the perfect corn tortilla.",
        category: "food",
        date: "2025-07-04",
        image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=220&fit=crop"
    }
];

let currentPage = 1;
const postsPerPage = 6;
let currentCategory = 'all';
let currentSearchTerm = '';
let filteredPosts = [...blogPosts];

const postsGrid = document.getElementById('postsGrid');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageInfo = document.getElementById('pageInfo');

document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    filterAndDisplayPosts();
});

function setupEventListeners() {
    searchInput.addEventListener('input', function(e) {
        currentSearchTerm = e.target.value.toLowerCase();
        currentPage = 1;
        filterAndDisplayPosts();
    });

    // Category filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            currentCategory = this.dataset.category;
            currentPage = 1;
            filterAndDisplayPosts();
        });
    });

    // Pagination buttons
    prevBtn.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            filterAndDisplayPosts();
            scrollToTop();
        }
    });

    nextBtn.addEventListener('click', function() {
        const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            filterAndDisplayPosts();
            scrollToTop();
        }
    });
}

// Filter posts based on category and search term
function filterPosts() {
    filteredPosts = blogPosts.filter(post => {
        const matchesCategory = currentCategory === 'all' || post.category === currentCategory;
        const matchesSearch = post.title.toLowerCase().includes(currentSearchTerm) ||
                            post.description.toLowerCase().includes(currentSearchTerm);
        return matchesCategory && matchesSearch;
    });
}

// Display posts with pagination
function displayPosts() {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const postsToShow = filteredPosts.slice(startIndex, endIndex);

    if (postsToShow.length === 0) {
        showNoResults();
        return;
    }

    postsGrid.innerHTML = postsToShow.map(post => createPostCard(post)).join('');
    
    // Add click event listeners to post cards
    const postCards = document.querySelectorAll('.post-card');
    postCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const post = postsToShow[index];
            openPostModal(post);
        });
    });
}

// Create HTML for a single post card
function createPostCard(post) {
    const formattedDate = formatDate(post.date);
    
    return `
        <article class="post-card">
            <img src="${post.image}" alt="${post.title}" class="post-image" loading="lazy">
            <div class="post-content">
                <span class="post-category ${post.category}">${post.category}</span>
                <h2 class="post-title">${post.title}</h2>
                <p class="post-description">${post.description}</p>
                <time class="post-date">${formattedDate}</time>
            </div>
        </article>
    `;
}

// Show no results message
function showNoResults() {
    postsGrid.innerHTML = `
        <div class="no-results">
            <h3>No posts found</h3>
            <p>Try adjusting your search terms or filters.</p>
        </div>
    `;
}

// Update pagination controls
function updatePagination() {
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    
    // Update page info
    if (filteredPosts.length === 0) {
        pageInfo.textContent = 'No pages';
    } else {
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    }
    
    // Update button states
    prevBtn.disabled = currentPage <= 1;
    nextBtn.disabled = currentPage >= totalPages || totalPages === 0;
}

// Combined function to filter and display posts
function filterAndDisplayPosts() {
    showLoading();
    
    // Simulate loading delay for better UX
    setTimeout(() => {
        filterPosts();
        displayPosts();
        updatePagination();
    }, 100);
}

// Show loading spinner
function showLoading() {
    postsGrid.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
        </div>
    `;
}

// Format date for display
function formatDate(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Scroll to top of posts section
function scrollToTop() {
    document.querySelector('.posts-section').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Open post modal (placeholder for future implementation)
function openPostModal(post) {
    // This could open a modal with the full post content
    // For now, we'll just log the post or redirect to a full post page
    console.log('Opening post:', post.title);
    
    // You could implement a modal here or redirect to a full post page
    // window.location.href = `post.html?id=${post.id}`;
    
    // For demo purposes, show an alert
    alert(`Opening "${post.title}"\n\nThis would typically open the full blog post in a new page or modal.`);
}

// Add smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Navigate with arrow keys when not typing in search
    if (document.activeElement !== searchInput) {
        if (e.key === 'ArrowLeft' && !prevBtn.disabled) {
            prevBtn.click();
        } else if (e.key === 'ArrowRight' && !nextBtn.disabled) {
            nextBtn.click();
        }
    }
    
    // Focus search with Ctrl/Cmd + K
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
});
