const express = require ('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('ok');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
app.get('/test', (req, res) => {
    res.json({ status: 200, message: "ok" });
});

app.get('/time', (req, res) => {
    const currentTime = new Date().toLocaleTimeString();
    res.json({ status: 200, message: currentTime });
});
app.get('/test', (req, res) => {
    res.json({ status: 200, message: "ok" });
});
app.get('/time', (req, res) => {
    const time = new Date().toLocaleTimeString();
    res.json({ status: 200, message: time });
});
app.get('/hello/:id?', (req, res) => {
    const id = req.params.id || "Guest";
    res.json({ status: 200, message: `Hello, ${id}` });
});
app.get('/search', (req, res) => {
    const search = req.query.s;
    if (search) {
        res.json({ status: 200, message: "ok", data: search });
    } else {
        res.status(500).json({ status: 500, error: true, message: "you have to provide a search" });
    }
});
