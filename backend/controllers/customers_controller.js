// Sample customers data
let customers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', "rented": []},
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', "rented": []}
];

// Get all customers
exports.getCustomers = (req, res) => {
    try {
        res.status(200).json(customers);
    } catch (error) {
        console.error('Error retrieving customers:', error);
        res.status(500).json({ error: 'Error retrieving customers' });
    }
};

// Get a specific customer by ID
exports.getCustomerById = (req, res) => {
    try {
        const customerId = parseInt(req.params.id);
        const customer = customers.find(c => c.id === customerId);
        if (!customer) {
            return res.status(404).json({ error: `Customer with ID ${customerId} not found` });
        }
        res.status(200).json(customer);
    } catch (error) {
        console.error('Error retrieving customer:', error);
        res.status(500).json({ error: 'Error retrieving customer' });
    }
};

exports.rentCatalog = (req, res) => {
    try{

        const customerId = parseInt(req.params.id);
        console.log(customerId)
        const catalogId = parseInt(req.params.catalogId);
        const customer = customers.find(c => c.id === customerId);
        if (!customer) {
            return res.status(404).json({ error: `Customer with ID ${customerId} not found` });
        }

        if(catalogId){
            customer.rented.push(catalogId);
            res.status(200).json({
                customer: customer
            })
        }

    }catch{
        console.error('Error retrieving customer:', error);
        res.status(500).json({ error: 'Error retrieving customer' });
    }
}

exports.returnCatalog = (req, res) => {
    try{

        const customerId = parseInt(req.params.id);
        const catalogId = parseInt(req.params.catalogId);

        const customer = customers.find(c => c.id === customerId);
        if (!customer) {
            return res.status(404).json({ error: `Customer with ID ${customerId} not found` });
        }

        const catalogIndex = customer.rented.indexOf(catalogId);
        console.log(catalogIndex);
        if(catalogIndex !== -1){
            customer.rented.splice(catalogIndex, 1);
            res.status(200).json({
                customer: customer
            })
        }else {
            return res.status(404).json({ error: `Catalog with ID ${catalogId} not found in customer's rented list` });
        }
    }catch{
        console.error('Error retrieving customer:', error);
        res.status(500).json({ error: 'Error retrieving customer' });
    }
}




