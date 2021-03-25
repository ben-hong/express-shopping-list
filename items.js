const express = require("express");
const db = require("./fakeDb");
const router = new express.Router();



router.get("/", function (req, res, next) {
    return res.json(db)
});

router.post("/", function(req, res, next) {
    let newItem = req.body;
    db.items.push(newItem);
    return res.json({added: newItem});
});

// check to see if item name is in items
router.use('/:name', function (req, res, next) {
    console.log(req.params)
    if (db.items.filter(item => item.name === req.params.name).length === 0){
        console.log('in error')
        next(Error)
    }
    return next()
});

router.get("/:name", function(req, res, next) {
    item = db.items.filter(item => item.name === req.params.name)[0]
    return res.json(item);
});

router.patch("/:name", function(req, res, next) {

    for (let item of db.items) {    
        if (item.name === req.params.name) {
            item.name = req.body.name;
            item.price = req.body.price;
            return res.json({updated: item});
        }
    }
});

router.delete("/:name", function(req, res, next) {
    for (let item of db.items) {
        if (item.name === req.params.name) {
            db.items.splice(db.items.indexOf(item), 1);
            console.log('db.items', db.items);
            return res.json({message: "Deleted"})
        }
    }
});



module.exports = router;