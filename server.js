const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const userRoutes = require("./src/user/routes");
const tokenRoutes = require("./src/token/routes");
const companyRoutes = require("./src/company/routes");
const productRoutes = require("./src/products/routes");

mongoose.set("strictQuery", false);
mongoose.set("strictPopulate", false);
const server = '127.0.0.1:27017'; 
const database = 'etiyaDB'; 
mongoose
      .connect(`mongodb://${server}/${database}`)
      .then(() => {
        console.log('Database connection successful');
      })

dotenv.config({path: "./configuration.env"});

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