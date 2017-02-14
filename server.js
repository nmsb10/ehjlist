// Dependencies
// =============================================================
var express = require('express');
var bodyParser = require("body-parser");
var exprhbs = require('express-handlebars');
var methodOverride = require('method-override');


var app = express();
var PORT = process.env.PORT || 8000;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(methodOverride('_method'));

// use express handlebars templating engine
app.engine('handlebars', exprhbs({extname: 'handlebars', defaultLayout: 'main', layoutDir: __dirname + '/view/layouts/'}));
app.set('view engine', 'handlebars');

app.use(express.static(process.cwd() + "/public"));

// Routes
// =============================================================
require("./routes/biz-api-routes.js")(app);
require("./routes/offer-api-routes.js")(app);
require("./routes/html-routes.js")(app);
require("./routes/business-routes.js")(app);

// Syncing our sequelize models and then start    ing our express app
//force true overwrites the local table
//force false keeps the table data you've put in the table after restarting the server
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
