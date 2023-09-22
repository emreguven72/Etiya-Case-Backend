const getById = "SELECT * FROM companies where id = $1";

const getByCompanyName = `
    SELECT *
    FROM companies
    WHERE company_name = $1;
`;

module.exports = {
    getById,
    getByCompanyName
}