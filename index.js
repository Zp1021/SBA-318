import express from 'express';
import cartoonChars from './data/cartoons.js';

const app = express();
const PORT = 3000;


app.get('/', (req, res) => {
    console.log('Route Reached');
    // res.send(`<h1>Hello World,</h1> 
    //     <h2>Welcome to SBA 318!</h2>`);
});




app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});