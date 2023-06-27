const fs = require('fs');
const globby = require('globby');
const path = require('path');

function addPage(page) {
  const path = page.replace('app', '').replace('.js', '').replace('.mdx', '').replace('page.tsx', '')
  const route = path === '/index' ? '' : path

  return `  <url>
    <loc>${`${process.env.WEBSITE_URL}${route}`}</loc>
    <changefreq>hourly</changefreq>
  </url>`;
}

async function generateSitemap() {
  // Ignore Next.js specific files (e.g., _app.js) and API routes.
  const pages = await globby([
    'app/**/*{.js,.mdx,.ts,page.tsx}',
    '!app/_*.js',
    '!app/*.ts',
    '!app/_*',
    '!app/api',
    '!app/auth',
  ])
  const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(addPage).join('\n')}
</urlset>`;

  fs.writeFileSync('public/sitemap.xml', sitemap);
}

generateSitemap();
