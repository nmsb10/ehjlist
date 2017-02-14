// Dependencies
// =============================================================
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  app.get("/api/businesses", function(req, res) {
    db.Biz.findAll({
      order: [
        ['biz_name', 'ASC'],
      ]
    })
    .then(function(dbPost) {
      res.json(dbPost);
    });
  });
  app.get("/api/businesses/:foreign", function(req, res) {
  	var category = req.params.foreign;
    db.Biz.findAll({
    	where: {
        fk_catId: category
      }
    })
    .then(function(dbPost) {
      res.json(dbPost);
    });
  });
  app.get("/api/search/:name", function(req, res) {
  	var bizname = req.params.name;
    db.Biz.findAll({
    	where: {
	      biz_name: {
	        $like: '%'+bizname+'%',
	      }
      	}
    })
    .then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.get("/api/categories", function(req, res) {
    db.Category.findAll({
    	order: [
            ['cat_name', 'ASC'],
        ]
    })
    .then(function(dbPost) {
      res.json(dbPost);
    });
  });
};