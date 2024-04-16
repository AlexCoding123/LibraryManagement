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

exports.addCatalog = async (req, res) => {
    try{
        const name = req.body.name;
        const category = req.body.category;
        const isbn = req.body.ISBN;
        const catalog = {"name": name, "category": category, "ISBN": isbn};
        catalogs.push(catalog);

        res.status(201).json({
            catalog: catalog
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

exports.editCatalog = async (req, res) => {
    try{
        const currentCatalog = catalogs.find(cat => cat.name === req.query.name);
        console.log(currentCatalog);

        const name = req.body.name;
        const category = req.body.category;
        const isbn = req.body.ISBN;
        const catalog = {"name": name, "category": category, "ISBN": isbn};

        for(let cat of catalogs){
            if(cat.name === currentCatalog.name){
                cat.name = catalog.name;
                cat.category = catalog.category;
                cat.ISBN = catalog.ISBN;
            }
        }

        res.status(200).json({
            status: "Catalog edit was successful"
        })
    }catch{
        res.status(500).json({
            error: "error deleting catalog"
        })
    }
}
