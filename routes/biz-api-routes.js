

// Dependencies
// =============================================================
var db = require("../models");
var geocoder = require("geocoder");

// Routes
// =============================================================
module.exports = function(app) {

  // Create a new businesseses
  app.post("/biz", function(req, res) {
    var Biz = req.body;
    var geocode_addr = Biz.biz_street + ', ' + Biz.biz_city + ', ' + Biz.biz_state;
    var biz_latitude, biz_longitude;

    geocoder.geocode(geocode_addr, function(err, data) {

      biz_latitude = data.results[0].geometry.location.lat;
      biz_longitude = data.results[0].geometry.location.lng;

      var bizzob = {
        biz_name: Biz.biz_name,
        biz_desc: Biz.biz_desc,
        biz_image: Biz.biz_image,
        biz_street: Biz.biz_street,
        biz_city: Biz.biz_city,
        biz_state: Biz.biz_state,
        biz_lat: biz_latitude,
        biz_long: biz_longitude
      };

      var catcreateob = {
        Category: {
          cat_name: Biz.new_cat
        }
      }
      // var bizzCreatePromise;

      if (!Biz.categories && Biz.new_cat) {
        db.Biz.create(Object.assign({}, bizzob, catcreateob) , { include: [db.Category]}).then(function(data) {
          res.redirect('/businesses');
        });
      }

      if(Biz.categories) {
        var bb = Object.assign({}, bizzob,  {fk_catId: parseInt(Biz.categories)})
        db.Biz.create(bb).then(function(data) {
          res.redirect('/businesses');
        });
      }

      if (!Biz.categories && !Biz.new_cat){
          //  db.Biz.create(bizzob).then(function(data) {
        //      res.redirect('/biz');
         //  });
        res.send("Need a category")
      }

    });    

		//db.Biz.create(bizzob , { include: [db.Category]})
    //
    // bizzCreatePromise.then(function(data) {
		//     res.redirect('/biz');
	  // });
  });

};
