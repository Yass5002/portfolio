import re
import os

path = '/home/yassine/Projects/portfolio/assets/js/main.js'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the main fetch success block to just output the raw numbers (no '+')
content = content.replace("technologies: techCount + '+',", "technologies: techCount,")
content = content.replace("projects: projects + '+',", "projects: projects,")

# Update the fallback block to more accurate numbers (e.g. at least 6 projects based on known GitHub repos)
content = content.replace("repos: '4',", "repos: '6',")
content = content.replace("technologies: '15+',", "technologies: '22+',")
content = content.replace("projects: '2+',", "projects: '6+',")

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated main.js")
