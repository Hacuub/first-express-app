import express from 'express';
import users from './data/user-data.js';
import path from 'path';
import bodyParser from 'body-parser';

//console.log(users);

const app = express();
const PORT = 3000;

// "public" folder, "source" folder
app.use('/assets', express.static('client/'));

app.use(bodyParser.urlencoded({extended: true}));

app.post('/add-user', (req, res) =>{
if(!req.body.firstname || !req.body.lastname){
    return res.status(404).json({error: "firstname and lastname are both required", id: "badRequest"});
}

const nextID = Math.max(...users.map((user) => +user.id)) + 1;

const newUser = {
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    id: nextID
};
users.push(newUser);

return res.status(201).json(newUser);
});

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

app.get('/add-user-form.html', (req, res) => {
    //res.send(`A GET request on route '/'`);
    res.sendFile(path.resolve('client/html/add-user-form.html'));
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