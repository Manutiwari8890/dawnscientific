export default async function handler(req, res) {

    const slug = req.query.slug;

    try {

        // Laravel API call
        const response = await fetch(
            `
            
https://new.dawnscientific.com/public/api/products/${slug}`
        );


        if (!response.ok) {
            return res.status(404).send("Product not found");
        }


        const product = await response.json();


        const productUrl =
            `https://dawnscientific.vercel.app/product/${slug}`;


        const html = `
<!DOCTYPE html>

<html>

<head>

<title>${product.name}</title>


<meta name="description"
content="${product.short_description || ''}">


<!-- Facebook / WhatsApp -->

<meta property="og:type"
content="product">


<meta property="og:title"
content="${product.name}">


<meta property="og:description"
content="${product.short_description || ''}">


<meta property="og:image"
content="${product.image_url}">


<meta property="og:url"
content="${productUrl}">



<!-- Twitter -->

<meta name="twitter:card"
content="summary_large_image">


<meta name="twitter:title"
content="${product.name}">


<meta name="twitter:description"
content="${product.short_description || ''}">


<meta name="twitter:image"
content="${product.image_url}">



<meta http-equiv="refresh"
content="0;url=${productUrl}">


</head>


<body>

Loading...

</body>


</html>
`;


        res.setHeader(
            "Content-Type",
            "text/html"
        );


        res.send(html);


    } catch(error){

        console.log(error);

        res.status(500)
        .send("Server error");

    }

}