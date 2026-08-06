import re
import os

path = '/home/yassine/Projects/portfolio/index.html'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove X/Twitter
# Meta tags
content = re.sub(r'<meta property="og:see_also" content="https://x.com/Yass5002">\n\s+', '', content)
# JSON-LD
content = re.sub(r'"https://x\.com/Yass5002",\n\s+', '', content)
# Footer icon
twitter_html = r'''<a href="https://x\.com/Yass5002" class="contact-item" target="_blank" rel="noopener noreferrer">
                            <svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18\.244 2\.25h3\.308l-7\.227 8\.26 8\.502 11\.24H16\.17l-5\.214-6\.817L4\.99 21\.75H1\.68l7\.73-8\.835L1\.254 2\.25H8\.08l4\.713 6\.231zm-1\.161 17\.52h1\.833L7\.084 4\.126H5\.117z"/>
                            </svg>
                            <span>Twitter / X</span>
                        </a>'''
content = re.sub(twitter_html, '', content)

# 2. Add Sentinel Project
sentinel_project_html = """
                    <!-- Project Sentinel -->
                    <div class="project-card">
                        <div class="project-header">
                            <div>
                                <h3 class="project-title">Sentinel - Dead Man's Switch</h3>
                            </div>
                            <div class="project-links">
                                <a href="https://github.com/Yass5002/sentinel-core-api" class="project-link" target="_blank" rel="noopener">Backend API →</a>
                                <a href="https://github.com/Yass5002/sentinel" class="project-link" target="_blank" rel="noopener">Frontend App →</a>
                            </div>
                        </div>
                        <p class="project-description">
                            A highly reliable personal safety companion. Features a robust backend API built with Go (Gin, PostgreSQL, Redis) for handling timed safety events, and a beautiful Flutter mobile client with passwordless OTP auth, continuous background GPS tracking, and secure document attachments. Engineered for maximum reliability in critical situations.
                        </p>
                        <div class="project-tech">
                            <span class="tech-badge">Go</span>
                            <span class="tech-badge">PostgreSQL</span>
                            <span class="tech-badge">Redis</span>
                            <span class="tech-badge">Flutter</span>
                            <span class="tech-badge">Dart</span>
                            <span class="tech-badge">Riverpod</span>
                        </div>
                    </div>
"""

content = content.replace('<div class="projects-grid">', f'<div class="projects-grid">\n{sentinel_project_html}')


# 3. Update OFPPT diploma to "Completed"
content = content.replace('2024 — 2026 (Expected)', '2024 - 2026 (Completed)')

# 4. Remove all em-dashes Globally
content = content.replace('—', '-')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated index.html")
