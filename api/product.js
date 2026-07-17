export const config = {
  runtime: 'edge', // Tells Vercel to execute this at the server level
};

export default async function handler(req) {
  const url = new URL(req.url);
  const productSlug = url.searchParams.get("slug");

  // Security Fallback: If no slug is found, just return the standard app HTML
  if (!productSlug) {
    return await fetch(`${url.origin}/index.html`);
  }

  try {
    // 1. Fetch the product metadata from your external database/API using the slug
    // (Replace this URL with your actual database API endpoint)
    const apiResponse = await fetch(`https://new.dawnscientific.com/public/api/products/${productSlug}`);
    
    if (!apiResponse.ok) throw new Error('Product not found');
    const response = await apiResponse.json();
    const product = response.data;
    // 2. Fetch the base static index.html built by React
    const htmlResponse = await fetch(`${url.origin}/index.html`);
    let htmlText = await htmlResponse.text();

    // 3. Construct the raw HTML metadata tags that WhatsApp requires
    const ogTags = `
      <title>${product.meta_title}</title>
      <link rel="canonical" href="https://www.dawnscientific.com/product/${product?.slug}"/>
      <meta name="description" content="${product.meta_description}" />
      <meta name="keywords" content="${product.meta_keyword}" />
      <!-- Open Graph / WhatsApp Tags -->
      <meta property="og:title" content="${product.meta_title}" />
      <meta property="og:description" content="${product.meta_description}" />
      <meta property="og:image" content="${product.image_url}" />
      <meta property="og:url" content="${url.href}" />
      <meta property="og:type" content="product" />
      <meta property="og:site_name" content="Lab Consumables, Chemicals & Equipment from Dawn Scientific" />
      
      <!-- Twitter Card Tags -->
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="${product.meta_title}" />
      <meta name="twitter:description" content="${product.meta_description}" />
      <meta name="twitter:image" content="${product.image_url}" />
    `;

    // 4. Inject the metadata into the top of the <head> tag string
    htmlText = htmlText.replace('<head>', `<head>${ogTags}`);

    return new Response(htmlText, {
      headers: { 'content-type': 'text/html; charset=utf-8' },
    });

  } catch (error) {
    // Fallback: If your API is down or slug doesn't exist, safely serve the regular React app
    return await fetch(`${url.origin}/index.html`);
  }
}
