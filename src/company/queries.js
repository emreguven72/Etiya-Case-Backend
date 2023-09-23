const getById = "SELECT * FROM companies where id = $1";

const getByCompanyName = `
    SELECT *
    FROM companies
    WHERE company_name = $1;
`;

const getLatestCompanies = `
    SELECT * FROM companies ORDER BY id DESC LIMIT 3;
`;

const getAll = `
    SELECT *
    FROM companies;
`;

const createCompany = `
    INSERT INTO companies (company_name, company_legal_number, incorporation_country, website) VALUES ($1, $2, $3, $4);
`;

const updateCompany = `
    UPDATE companies SET company_name=$1, company_legal_number=$2, incorporation_country=$3, website=$4 WHERE id = $5;
`;

const deleteCompany = `
    DELETE FROM companies WHERE id = $1;
`

module.exports = {
    getById,
    getByCompanyName,
    getLatestCompanies,
    getAll,
    createCompany,
    updateCompany,
    deleteCompany
}