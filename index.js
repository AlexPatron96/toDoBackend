const express = require('express');
const path = require('path');
const fs = require('fs/promises');

const app = express();
app.use(express.json());
const jsonPath = path.resolve('./files/toDo.json');


app.get('/tasks', async (req, res) => {
    //obtener JSON
    const jsonFile = await fs.readFile(jsonPath, 'utf-8');
    //enviando la respuesta
    res.send(jsonFile);
})
app.post('/tasks', async (req, res) => {

    const toDo = req.body;
    const toDoArray = JSON.parse(await fs.readFile(jsonPath, 'utf-8'));


    const lastIndex = toDoArray.length - 1;
    const newId = toDoArray.length === 0 ? 1 : toDoArray[lastIndex].id + 1;
    toDoArray.push({ id: newId, ...toDo });

    console.log(toDoArray);
    await fs.writeFile(jsonPath, JSON.stringify(toDoArray));
    res.end();
})

app.put('/tasks', async (req, res) => {
    const toDoArray = JSON.parse(await fs.readFile(jsonPath, 'utf-8'));
    const { id, status } = req.body;

    const toDoIndex = toDoArray.findIndex(toDo => toDo.id === id);

    if (toDoIndex >= 0) {
        toDoArray[toDoIndex].status = status === undefined ? toDoArray[toDoIndex].status : status;
    }
    await fs.writeFile(jsonPath, JSONc.stringify(toDoArray));
    console.log(toDoArray);
    res.end();

})

app.delete('/tasks', async (req, res) => {
    const toDoArray = JSON.parse(await fs.readFile(jsonPath, 'utf-8'));
    const { id } = req.body;

    const toDoIndex = toDoArray.findIndex(toDo => toDo.id === id);

    toDoIndex === -1 ? null : toDoArray.splice(toDoIndex, 1);
    console.log(toDoArray);
    await fs.writeFile(jsonPath, JSON.stringify(toDoArray));
    res.end();

})


const PORT = 8000;
app.listen(PORT, () => {
    console.log('Servidor escuchando en el Puerto: 8000');
});