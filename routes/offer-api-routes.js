
// Dependencies
// =============================================================
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {


  // Post route for creating a new offer
  app.post("/api/offers/new/:bizId", function(req, res) {
    var bizId = req.params.bizId;
    var Offer = req.body;

    if ( Offer.dealPrice === '' ) {
        Offer.dealPrice = Offer.originalPrice;
        db.Offer.create({
          offer_title: Offer.title,
          offer_origPrice: Offer.originalPrice,
          offer_dealPrice: Offer.dealPrice,
          offer_image: Offer.image,
          fk_bizId: bizId
        }).then(function(data) {
        res.redirect('/biz/'+ bizId);
      });
    }else{
      db.Offer.create({
          offer_title: Offer.title,
          offer_origPrice: Offer.originalPrice,
          offer_dealPrice: Offer.dealPrice,
          offer_image: Offer.image,
          fk_bizId: bizId
        }).then(function(data) {
        res.redirect('/biz/'+ bizId);
      });
    }
  });

  app.post("/api/offer", function(req, res) {

      var Offer = req.body;

      if ( Offer.offer_dealPrice === '' ) {
        Offer.offer_dealPrice = Offer.offer_origPrice;
      }

      db.Offer.create({
        offer_title: Offer.offer_title,
        offer_origPrice: Offer.offer_origPrice,
        offer_dealPrice: Offer.offer_dealPrice,
        offer_image: Offer.offer_image,
        fk_bizId: Offer.business
      }).then(function(data) {
          res.redirect('/');
      });
  });

  //get route from individual business page to create deal
  app.get('/create/offer/:business_id', function(request, response){
    db.Biz.findById(request.params.business_id)
    .then(function(data){
      var business = { business: data};
      response.render('createoffer', business);
    });
  });
};

