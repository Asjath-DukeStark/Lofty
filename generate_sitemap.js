
import fs from 'fs';
import path from 'path';

// Minimal extraction of slugs from constants.tsx
const constantsPath = path.join(process.cwd(), 'constants.tsx');
const content = fs.readFileSync(constantsPath, 'utf8');

const slugs = [];
const regex = /slug:\s*'([^']+)'/g;
let match;
while ((match = regex.exec(content)) !== null) {
    slugs.push(match[1]);
}

const baseUrl = 'https://loftybeautyparlor.com';
const staticRoutes = [
    '',
    '/services',
    '/about',
    '/gallery',
    '/contact',
    '/booking',
    '/ai-consultant'
];

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

// Static Routes
staticRoutes.forEach(route => {
    sitemap += `
  <url>
    <loc>${baseUrl}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`;
});

// Service Routes
slugs.forEach(slug => {
    sitemap += `
  <url>
    <loc>${baseUrl}/${slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
});

sitemap += `
</urlset>`;

fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
console.log(`Generated sitemap.xml with ${staticRoutes.length + slugs.length} URLs.`);
