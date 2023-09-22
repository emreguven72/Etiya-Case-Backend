const getById = "SELECT * FROM products where id = $1";

const getByProductName = `
    SELECT *
    FROM products
    WHERE product_name = $1;
`;

const getByCompanyName = `
    SELECT products.*
    FROM products
    INNER JOIN companies ON products.company = companies.id
    WHERE companies.company_name = $1;
`;

module.exports = {
    getById,
    getByProductName,
    getByCompanyName
}