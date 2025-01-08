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
