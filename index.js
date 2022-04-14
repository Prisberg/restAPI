const express = require('express');
const { send } = require('express/lib/response');
const app = express();

app.use(express.json());

//the database
const inventory = [
    {
        id: 1,
        name: 'Sledgehammer',
        use: 'Smash',
        damage: '100',
    },
    {
        id: 2,
        name: 'Tabasco sauce',
        use: 'Spicy',
        damage: '23',
    },
    {
        id: 3,
        name: 'Spoon',
        use: 'Confusion',
        damage: '14',
    },
]

app.get('/', (req, res) => {
    res.send('This is the homepage');
});

app.get('/api/inventory', (req, res) => {
    //insert database
    res.send(inventory);
});

app.post('/api/inventory', (req, res) => {
    if (!req.body.name, !req.body.use, !req.body.damage || req.body.name.length < 3) {
        res.status(400).send("All properties are required when creating an item and the name should be at least 3 characters.")
        return;
    }

    const item = {
        id: inventory.length + 1,
        name: req.body.name,
        use: req.body.use,
        damage: req.body.damage
    };
    inventory.push(item);
    res.send(item);
});

//handle no input
app.put("/api/inventory/:id", (req, res) => {
    const item = inventory.find(c => c.id === parseInt(req.params.id));
    if (!item) {
        res.status(404).send('The item you were looking for does not exist.');
        res.send(item);
        return;
    }

    item.name = req.body.name;
    item.use = req.body.use;
    item.damage = req.body.damage;
    res.send(item)
})

app.get('/api/inventory/:id', (req, res) => {
    const item = inventory.find(c => c.id === parseInt(req.params.id));
    if (!item)
        res.status(404).send('The item you were looking for does not exist.');
    res.send(item);
});


app.delete('/api/inventory/:id', (req, res) => {
    const item = inventory.find(c => c.id === parseInt(req.params.id));
    if (!item) {
        res.status(404).send('The item you were looking for does not exist.')
    } else {

        const index = inventory.indexOf(item);
        inventory.splice(index, 1);

        res.send(item);
    }
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))