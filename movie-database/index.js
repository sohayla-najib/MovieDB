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
    { title:'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
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
app.get('/movies/read/id/:id', (req, res) => {
    const id = parseInt(req.params.id); // Convert ID to a number
    if (id >= 0 && id < movies.length) {
        res.json({ status: 200, data: movies[id] });
    } else {
        res.status(404).json({ 
            status: 404, 
            error: true, 
            message: `The movie with ID ${id} does not exist` 
        });
    }
});
app.get('/movies/add', (req, res) => {
    const { title, year, rating } = req.query;

    if (!title || !year || year.length !== 4 || isNaN(year)) {
        return res.status(403).json({
            status: 403,
            error: true,
            message: "You cannot create a movie without providing a title and a valid year"
        });
    }

    const newMovie = {
        title,
        year: parseInt(year),
        rating: rating ? parseFloat(rating) : 4
    };

    movies.push(newMovie);

    res.json({ status: 200, data: movies });
});
app.get('/movies/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if (id >= 0 && id < movies.length) {
        movies.splice(id, 1);
        res.json({ status: 200, data: movies });
    } else {
        res.status(404).json({
            status: 404,
            error: true,
            message: `The movie with ID ${id} does not exist`
        });
    }
});
app.get('/movies/update/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, year, rating } = req.query;

    if (id >= 0 && id < movies.length) {
        const movie = movies[id];
        if (title) movie.title = title;
        if (year && year.length === 4 && !isNaN(year)) movie.year = parseInt(year);
        if (rating && !isNaN(rating)) movie.rating = parseFloat(rating);

        res.json({ status: 200, data: movies });
    } else {
        res.status(404).json({
            status: 404,
            error: true,
            message: `The movie with ID ${id} does not exist`
        });
    }
});
