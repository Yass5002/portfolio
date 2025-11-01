// Extracted JS from yassine_portfolio.html

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

if (menuToggle && mobileMenuOverlay) {
    // Toggle menu on button click
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        menuToggle.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('open');
        document.body.style.overflow = mobileMenuOverlay.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu when clicking outside links
    mobileMenuOverlay.addEventListener('click', (e) => {
        if (e.target === mobileMenuOverlay) {
            menuToggle.classList.remove('active');
            mobileMenuOverlay.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking a link
    mobileMenuOverlay.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenuOverlay.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu automatically when resizing to desktop width
    // If the overlay is open and the viewport reaches the desktop breakpoint,
    // close it to avoid the mobile overlay persisting on large screens.
    const DESKTOP_BREAKPOINT = 768; // px
    let resizeTimeout = null;
    window.addEventListener('resize', () => {
        // throttle slightly to avoid excessive work during resize
        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const w = window.innerWidth;
            if (w >= DESKTOP_BREAKPOINT && mobileMenuOverlay.classList.contains('open')) {
                menuToggle.classList.remove('active');
                mobileMenuOverlay.classList.remove('open');
                document.body.style.overflow = '';
            }
        }, 120);
    });
}

// Smooth scrolling for all anchor links
document.addEventListener('click', function(e) {
    const target = e.target.closest('a[href^="#"]');
    if (target) {
        e.preventDefault();
        const href = target.getAttribute('href');
        const element = document.querySelector(href);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
});

// Header hide on scroll down, show on scroll up
let lastScroll = 0;
const header = document.getElementById('header');

// Only hide header on scroll for desktop-sized viewports.
const HEADER_HIDE_BREAKPOINT = 768; // px

window.addEventListener('scroll', () => {
    if (!header) return;
    const currentScroll = window.pageYOffset;

    // Keep header visible on small screens (mobile/tablet)
    if (window.innerWidth < HEADER_HIDE_BREAKPOINT) {
        header.style.transform = 'translateY(0)';
        lastScroll = currentScroll;
        return;
    }

    if (currentScroll <= 0) {
        header.style.transform = 'translateY(0)';
        lastScroll = currentScroll;
        return;
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});

// GitHub API Configuration
const GITHUB_USERNAME = 'Yass5002';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}`;
const REPOS_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`;

// Experience start year
const START_YEAR = 2024;

// Calculate years of experience
function calculateExperience() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const yearsDiff = currentYear - START_YEAR;

    // If less than 1 year, show months or return 1
    if (yearsDiff === 0) {
        return '<1';
    }
    return yearsDiff;
}

// Fetch GitHub data
async function fetchGitHubStats() {
    try {
        const userResponse = await fetch(GITHUB_API_URL);
        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        const userData = await userResponse.json();

        const reposResponse = await fetch(REPOS_API_URL);
        if (!reposResponse.ok) throw new Error('Failed to fetch repos');
        const reposData = await reposResponse.json();

        // Count unique languages (GitHub's detection isn't perfect, so we'll set a minimum)
        const languages = new Set();
        reposData.forEach(repo => {
            if (repo.language) {
                languages.add(repo.language);
            }
        });

        // Set minimum to actual technologies used (from skills section)
        const techCount = Math.max(languages.size, 15);

        // Count non-fork projects
        const projects = reposData.filter(repo => !repo.fork).length;

        updateStats({
            repos: userData.public_repos,
            technologies: techCount + '+',
            projects: projects + '+',
            experience: calculateExperience()
        });

    } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        // Fallback to default values
        updateStats({
            repos: '4',
            technologies: '15+',
            projects: '2+',
            experience: calculateExperience()
        });
    }
}

// Update stats in the DOM
function updateStats(stats) {
    const projectsEl = document.getElementById('projects-count');
    const techEl = document.getElementById('technologies-count');
    const reposEl = document.getElementById('github-repos');
    const experienceEl = document.getElementById('years-experience');

    if (projectsEl) projectsEl.textContent = typeof stats.projects === 'number' ? stats.projects : stats.projects;
    if (techEl) techEl.textContent = typeof stats.technologies === 'number' ? stats.technologies : stats.technologies;
    if (reposEl) reposEl.textContent = stats.repos;
    if (experienceEl) experienceEl.textContent = stats.experience;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    fetchGitHubStats();
});
