const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({path: "./configuration.env"});

const userRoutes = require("./src/user/routes");
const tokenRoutes = require("./src/token/routes");
const companyRoutes = require("./src/company/routes");
const productRoutes = require("./src/products/routes");

const app = express();

app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}));



const port = process.env.PORT;

app.use(express.json());
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/tokens', tokenRoutes);
app.use('/api/v1/companies', companyRoutes);
app.use('/api/v1/products', productRoutes);

app.listen(port, () => console.log(`App Listening on port ${port}`));