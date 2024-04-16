const catalogs = [
    {"name": "Test Book", "category": "Book", "ISBN": 123456789},
    {"name": "Test Article", "category": "Article", "ISBN": null},
    {"name": "Test Paper", "category": "Paper", "ISBN": null}
];

exports.getCatalogs = async (req, res) => {
    try{
        res.status(200).json({
            content: catalogs,
        })
    }catch{
        res.status(500).json({
            error: "error retrieving catalogs"
        })
    }
}

exports.deleteCatalog = async (req, res) => {
    try{
        const catalogName = req.query.name;
        const index = catalogs.findIndex(catalog => catalog.name === catalogName);
        if (index === -1) {
            return res.status(404).json({
                error: `Catalog ${catalogName} not found`
            });
        }
        catalogs.splice(index, 1);
        res.status(200).json({
            status: `Catalog ${catalogName} deleted successfully`
        })
    }catch{

        res.status(500).json({
            error: "error deleting catalog"
        })
    }
}
