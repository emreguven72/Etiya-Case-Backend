const getById = `
    SELECT products.*, companies.company_name 
    FROM products 
    INNER JOIN companies ON products.company_id = companies.id
    WHERE products.id = $1;
`;

const getAll = `
    SELECT products.*, companies.company_name
    FROM products
    INNER JOIN companies ON products.company_id = companies.id
    ORDER BY company_id ASC;
`;

const getByProductName = `
    SELECT products.*, companies.company_name
    FROM products
    INNER JOIN companies ON products.company_id = companies.id
    WHERE product_name = $1;
`; 

const getByCompanyName = `
    SELECT products.*, companies.company_name
    FROM products
    INNER JOIN companies ON products.company_id = companies.id
    WHERE companies.company_name = $1;
`;

const getByCompanyId = `
    SELECT products.*, companies.company_name
    FROM products
    INNER JOIN companies ON products.company_id = companies.id
    WHERE companies.id = $1;
`;

const getByCategory = `
    SELECT products.*, companies.company_name 
    FROM products
    INNER JOIN companies ON products.company_id = companies.id
    WHERE product_category = $1
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
    getAll,
    getByProductName,
    getByCompanyName,
    getByCompanyId,
    getByCategory,
    createProduct,
    updateProduct,
    deleteProduct
}