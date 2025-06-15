import express from 'express';
import cartoonChars from './data/cartoons.js';

const app = express();
const PORT = 3000;


app.get('/', (req, res) => {
    console.log('Route Reached');
    // res.send(`<h1>Hello World,</h1> 
    //     <h2>Welcome to SBA 318!</h2>`);
});

//GET all Cartoon Character data
app.get('/cartoons', (req, res) => {
    console.log('Cartoons Route Reached');
    res.send(cartoonChars);
});

// GET specific character data with corresponding ID
app.get('/cartoons/:id', (req, res) => {
    let filteredChars = cartoonChars.filter((cc) => cc.id == req.params.id)
    res.send(filteredChars)
})



app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});