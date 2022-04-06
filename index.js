const express = require('express');
const request = require('request-promise');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

const returnScraperApiUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;
// const apiKey='3c7b26eab88180b9f82ff5cc88e696c2';
// const returnScraperApiUrl(api_key)=`http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;
// Welcome route
app.get('/', async (req, res) => {
    res.send(`<h1>Welcome to Amazon scrapper API!</h1><br>
    /products/productId -> gives the info of product!<br>
    /products/productId/reviews -> gives the reviews of the product!<br>
    /products/productId/offers -> gives the information of current offers of the product!<br>
    /search/productName -> gives the searched products list! 
    `);
});

// Get product details
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${returnScraperApiUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`);
        
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

// Get product reviews
app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;
    
    try {
        const response = await request(`${returnScraperApiUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`);
        
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

// Get product offers
app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;
    
    try {
        const response = await request(`${returnScraperApiUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`);
        
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

// Get search results
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;
    const { api_key } = req.query;
    
    try {
        const response = await request(`${returnScraperApiUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`);
        
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`));