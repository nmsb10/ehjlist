// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // default route in this case loads test.html from public folder
  app.get("/", function(req, res) {
    //show search bar to pick categories
    //maybe display list of businesses
    res.sendFile(path.join(__dirname + "/../public/businesses.html"));
  });

  app.get("/businesses", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/businesses.html"));
  });

  //route to return list of businesses by category
  app.get("/search/:cat_id", function(req, res) {
    var category = req.params.cat_id;
    db.Biz.findAll({
      where: {
        fk_catId: category
      }
    }).then(function(data){
      var businesses = { businesses: data};
      res.render('bizListings', businesses);
    });
  });


  //route to return a specific business listing and it's associating offers
  app.get("/biz/:biz_id", function(req, res) {
    var bizId = req.params.biz_id;
    db.Biz.find({where: {id: bizId}, include: [db.Offer] })

    // db.Offer.belongsTo(db.Biz, {foreignKey: 'fk_bizId'});
    // db.Biz.findAll({ where: {id: bizId}, include: [db.Offer] }).then(function(biz){
    //   console.log(biz)

    .then(function(data){
        var business = { business: data};
        res.render('biz', business);
      });
  });

  //route to return a create business form
  app.get("/create/biz", function(req, res) {
    db.Category.findAll({})
    .then(function(data){
        var hbsObject = { categories: data};
        res.render('createBiz', hbsObject);
      });
  });

  //route to return a create business form
  app.get("/create/cat", function(req, res) {
      res.render('createCat');
    });


  

  //route to create an offer form
  app.get("/offers", function(req, res) {
    // res.sendFile(path.join(__dirname + "/../public/add.html"));
    db.Biz.findAll({})
    .then(function(data){
      var hbsObject = { businesses: data};
      res.render('offerListings', hbsObject);
    });
  });







  // add route loads the add.html page,
  // where users can enter new characters to the db
  // app.get("/biz", function(req, res) {
  //   // res.sendFile(path.join(__dirname + "/../public/add.html"));
  //   db.Biz.findAll({}).then(function(data){
  //     console.log("data from DB: ", data);
  //     var hbsObject = { businesses: data};
  //     console.log("Businesses (hbsObject): ", hbsObject);
  //     res.render('index', hbsObject);
  //   });
  // });

  // add route loads the add.html page,
  // where users can enter new characters to the db
  // app.get("/biz", function(req, res) {
  //   // res.sendFile(path.join(__dirname + "/../public/add.html"));
  //   db.Biz.findAll({}).then(function(data){
  //     console.log("data from DB: ", data);
  //     var businesses = { businesses: data};
  //     console.log("Businesses (hbsObject): ", businesses);
  //     res.render('bizListings', businesses);
  //   });
  // });


//route to return a biz listing with a form to create an offer
  app.get("/api/offers/:biz_Id", function(req, res) {

    var bizId = req.body.biz_Id;
    db.Offer.findAll({
      where: {
        fk_bizId: bizId
      }
    }).then(function(data){

    });
  });

};
