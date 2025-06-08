const express = require('express');
const cors = require('cors');
const connectToMongodb = require('./database/db');
const cookieParser = require('cookie-parser');
const { server, app } = require('./socket/socket');

require('dotenv').config();
app.use(cookieParser());

app.use(express.json());

app.use(
    cors()
);

app.use('/api/auth', require("./routes/user-routes"));
app.use('/api/auth', require("./routes/chat-routes"));

const port = process.env.PORT;
server.listen(port, () => {
    console.log(`Server is running at  port no. - ${port}`);
    connectToMongodb();
})