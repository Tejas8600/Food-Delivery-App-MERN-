const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;
const mongoDB = require('./db');

app.use(cors({ origin: 'http://localhost:3000' })); // Use cors with specified origin


// Invoke the MongoDB connection function
mongoDB();

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use(express.json())
app.use('/api',require("./Routes/CreateUser"))
app.use('/api',require("./Routes/DisplayData"))
app.use('/api',require("./Routes/OrderData"))

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});




// const express = require('express')
// const app = express()
// const port = 5000
// const mongoDB=require("./db")
// mongoDB();

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })


// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })


