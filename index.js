import express from 'express';
import cartoonChars from './data/cartoons.js';
import posts from './data/posts.js';


const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    console.log('Route Reached');
    res.send(`<h1>Hello World,</h1> 
        <h2>Welcome to SBA 318!</h2>
        You can find some cartoon character data here: <a href = "/cartoons">cartoons</a>
        <br>
        if you want more specific character data after you click on the link, add / at the end of the url and a number from 1-5`);
});

app
    //GET all Cartoon Character data
    .get('/cartoons', (req, res) => {
        console.log('Cartoons Route Reached');
        res.send(cartoonChars);
        res.status(200).json({message:"Success", status: 200});
    })

    // POST to create character data
    .post('/cartoons', (req, res) =>{
        const char = {
            id: req.body.id,
            name: req.body.name,
            codeName: req.body.codeName,
            contact: req.body.contact
        };
        cartoonChars.push(char);
        res.status(201).json({message:"Created", status: 201});
        console.log('Post request made')
    });
    

app
     // Get Posts related to cartoon characters
    .get('/cartoons/posts', (req, res) => {
        console.log('Cartoon posts reached')
        res.send(posts);
    });

app
    // GET specific character data with corresponding ID
    .get('/cartoons/:id', (req, res) => {
        let filteredChars = cartoonChars.filter((cc) => cc.id == req.params.id)
        res.send(filteredChars)
    })

    // PATCH request to update character information
    .patch('/cartoons/:id', (req, res) => {
        let char = cartoonChars.find((cc) => cc.id == req.params.id)
        let update = req.body
        for (let key in update) {
            if(char[key] !== undefined) {
                char[key] = update[key]
            }
        }
        res.send(char);
    })

    // DELETE request made to character specified by ID
    .delete('/cartoons/:id', (req, res) => {
        let char = cartoonChars.findIndex((cc) => cc.id == req.params.id)
        cartoonChars.splice(char, 1)
        res.send(char)
    })



app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});