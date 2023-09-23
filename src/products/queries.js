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

const getByCategory = `
    SELECT * FROM products WHERE product_category = $1
`

const createProduct = `
    INSERT INTO products (product_name, product_amount, amount_unit, company_id, product_category) VALUES ($1, $2, $3, $4, $5);
`;

const updateProduct = `
    UPDATE products SET product_name=$1, product_amount=$2, amount_unit=$3, company_id=$4, product_category=$5 WHERE id = $6;
`;

const deleteProduct = `
    DELETE FROM products WHERE id = $1;
`

module.exports = {
    getById,
    getByProductName,
    getByCompanyName,
    getByCategory,
    createProduct,
    updateProduct,
    deleteProduct
}