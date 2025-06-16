import express from 'express';
import cartoonChars from './data/cartoons.js';
import posts from './data/posts.js';
import greetings from './data/greetings.js';


const app = express();
const PORT = 3000;

app.use(express.json());

// Custom middleware
const startReq = function (req, res, next) {
    console.log('Request approved')
    next();
};

// Use of custom middleware
app.use(startReq);

app.get('/', (req, res) => {
    console.log('Route Reached');
    res.send(`<h1>Hello World,</h1> 
        <h2>Welcome to SBA 318!</h2>
        You can find some cartoon character data here: <a href = "/cartoons">cartoons</a>
        <br>
        if you want more specific character data after you click on the link, add / at the end of the url and a number from 1-5
        <br>
        If you want to see what some of them are posting click <a href = "/cartoons/posts">here</a>
        <br>
        If you want to see an example greeting and make your own open
        <br>
        thunder client and click <a href = "/cartoons/greetings">here</a>`);
});

app
    //GET all Cartoon Character data
    .get('/cartoons', (req, res) => {
        console.log('Cartoons Route Reached');
        res.send(cartoonChars);
        res.status(200).json({ message: "Success", status: 200 });
    })

    // POST to create character data
    .post('/cartoons', (req, res) => {
        const char = {
            id: req.body.id,
            name: req.body.name,
            codeName: req.body.codeName,
            contact: req.body.contact
        };
        cartoonChars.push(char);
        res.status(201).json({ message: "Created", status: 201 });
        console.log('Post request made')
    });


app
    // GET Posts related to cartoon characters
    .get('/cartoons/posts', (req, res) => {
        console.log('Cartoon posts reached')
        res.send(posts);
    })

    // Creating posts according to the structured data
    .post('/cartoons/posts', (req, res) => {
        console.log('Posted cartoon posts')
        const post = {
            id: req.body.id,
            cartoonId: req.body.cartoonId,
            catchPhrase: req.body.catchPhrase
        };
        posts.push(post)
        res.status(201).json({ message: "Created", status: 201 });
    });
app
    // GET Posts related to cartoon characters comments
    .get('/cartoons/greetings', (req, res) => {
        console.log('Greetings reached')
        res.send(greetings);
    })

    // Creating posts according to the structured data
    .post('/cartoons/greetings', (req, res) => {
        console.log('Posted cartoon posts')
        const greeting = {
            id: req.body.id,
            comment: req.body.comment
        };
        greetings.push(greeting)
        res.status(201).json({ message: "Created", status: 201 });
    })

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
            char[key] = update[key]
        }
        res.send(char);
    })

    // DELETE request made to character specified by ID
    .delete('/cartoons/:id', (req, res) => {
        let char = cartoonChars.findIndex((cc) => cc.id == req.params.id)
        cartoonChars.splice(char, 1)
        res.send(cartoonChars)
    })

app
    // GET request made to comments of a specific ID
    .get('/cartoons/greeings/:id', (req, res) => {
        let filteredGreetings = greetings.filter((c) => c.id == req.params.id)
        res.send(filteredGreetings)
    })

    // DELETE request made to comments specified by ID
    .delete('/cartoons/greetings/:id', (req, res) => {
        let greeting = greetings.findIndex((c) => c.id == req.params.id)
        greetings.splice(greeting, 1)
        res.send(greetings)
    })


//error handling middleware
app.use((err, req, res, next) => {
    res.status(err.status)
    res.send({ error: err.message })
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});