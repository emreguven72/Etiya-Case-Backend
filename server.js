const express = require("express");
const userRoutes = require("./src/user/routes");
const tokenRoutes = require("./src/token/routes");
const companyRoutes = require("./src/company/routes");
const productRoutes = require("./src/products/routes");

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/tokens', tokenRoutes);
app.use('/api/v1/companies', companyRoutes);
app.use('/api/v1/products', productRoutes);

app.listen(port, () => console.log(`App Listening on port ${port}`));