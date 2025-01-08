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
const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب', year: 1992, rating: 6.2 }
];
app.get('/movies/read', (req, res) => {
    res.json({ status: 200, data: movies });
});
app.get('/movies/read/by-date', (req, res) => {
    res.json({ status: 200, data: movies.sort((a, b) => a.year - b.year) });
});
app.get('/movies/read/by-rating', (req, res) => {
    res.json({ status: 200, data: movies.sort((a, b) => b.rating - a.rating) });
});
app.get('/movies/read/by-title', (req, res) => {
    res.json({ status: 200, data: movies.sort((a, b) => a.title.localeCompare(b.title)) });
});
