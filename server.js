const express = require("express");
const userRoutes = require("./src/user/routes");
const tokenRoutes = require("./src/token/routes");

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/tokens', tokenRoutes);

app.listen(port, () => console.log(`App Listening on port ${port}`));


