let nextId = 4; // Starting ID for new catalogs

const catalogs = [
    {"id": 1, "name": "Test Book", "category": "Book", "ISBN": 123456789},
    {"id": 2, "name": "Test Article", "category": "Article", "ISBN": null},
    {"id": 3, "name": "Test Paper", "category": "Paper", "ISBN": null}
];

exports.getCatalogs = async (req, res) => {
    try {
        res.status(200).json({
            content: catalogs,
        });
    } catch (error) {
        res.status(500).json({
            error: "Error retrieving catalogs"
        });
    }
};

exports.addCatalog = async (req, res) => {
    try {
        const name = req.body.name;
        const category = req.body.category;
        const isbn = req.body.ISBN;
        const catalog = {"id": nextId++, "name": name, "category": category, "ISBN": isbn};
        catalogs.push(catalog);

        res.status(201).json({
            content: catalogs
        });
    } catch (error) {
        res.status(500).json({
            error: "Error adding catalog"
        });
    }
};

exports.deleteCatalog = async (req, res) => {
    try {
        const catalogId = parseInt(req.query.id);
        const index = catalogs.findIndex(catalog => catalog.id === catalogId);
        if (index === -1) {
            return res.status(404).json({
                error: `Catalog with ID ${catalogId} not found`
            });
        }
        catalogs.splice(index, 1);
        res.status(200).json({
            content: catalogs
        });
    } catch (error) {
        res.status(500).json({
            error: "Error deleting catalog"
        });
    }
};

exports.editCatalog = async (req, res) => {
    try {
        const catalogId = parseInt(req.query.id);
        const index = catalogs.findIndex(catalog => catalog.id === catalogId);
        if (index === -1) {
            return res.status(404).json({
                error: `Catalog with ID ${catalogId} not found`
            });
        }
        const { name, category, ISBN } = req.body;
        catalogs[index] = { ...catalogs[index], name, category, ISBN };
        res.status(200).json({
            content: catalogs
        });
    } catch (error) {
        res.status(500).json({
            error: "Error editing catalog"
        });
    }
};

