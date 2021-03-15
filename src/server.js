import express from 'express';
import users from './data/user-data.js';
import path from 'path';

//console.log(users);

const app = express();
const PORT = 3000;

// "public" folder, "source" folder
app.use('/assets', express.static('client/'));

app.get('/', (req, res) => {
    //res.send(`A GET request on route '/'`);
    res.sendFile(path.resolve('client/html/home.html'));
});

app.get('/styles/default-styles.css', (req, res) => {
    //res.send(`A GET request on route '/'`);
    res.sendFile(path.resolve('client/styles/default-styles.css'));
});

app.get('/images/dr-evil.jpg', (req, res) => {
    //res.send(`A GET request on route '/'`);
    res.sendFile(path.resolve('client/images/dr-evil.jpg'));
});


app.get('/all-users', (req, res) => {
    res.json(users);
});

app.get('/user/:id', (req, res) => {
    const id = +req.params.id || -1;
    console.log(`The id is: ${id}`);
    const user = users.find(user => user.id === id) || {message : "No user found"};
    res.json(user);
});

app.get('*', (req, res) =>{
    res.send (`A GET request on route '${req.path}'`);
});

app.post('/', (req, res) =>{
    res.send (`A POST request on route '${req.path}'`);
});

app.post('*', (req, res) =>{
    res.send (`A POST request on route '${req.path}'`);
});

app.put('/', (req, res) =>{
    res.send (`A PUT request on route '${req.path}'`);
});

app.put('*', (req, res) =>{
    res.send (`A PUT request on route '${req.path}'`);
});

app.delete('/', (req, res) =>{
    res.send (`A DELETE request on route '${req.path}'`);
});

app.delete('*', (req, res) =>{
    res.send (`A DELETE request on route '${req.path}'`);
});

app.listen(PORT, () => {
    console.log(`Server starting up on port ${PORT}`);
});