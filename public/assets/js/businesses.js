$(document).ready(function() { 

  var businessContainer = $("#business-list"),
      categoryContainer = $("#category-list");

  function getBusinesses() {
    $.get("/api/businesses", function(data) {
      businesses = data;
      console.log("List", data);
      initializePanels();
    });
  }
  
  function getCategories() {
    $.get("/api/categories", function(data) {
      categories = data;
      initializeDrop();
    });
  }

  $('#category-list').on('change', function () {
     var category = $('#category-list').val();
     $.get("/api/businesses/"+category, function(data) {
      businesses = data;
      initializePanels();
      $('#biz_name').val('');
    });
  });
  $('#search-business').on('submit', function (event) {
    event.preventDefault();
    var bizname = $('#biz_name').val();
    $.get("/api/search/"+bizname, function(data) {
      businesses = data;
      initializePanels();
      $('#biz_name').val('');
    });
  });

  $('#search-form-top').on('submit', function(event){
    event.preventDefault();
    // var businessName = $('#search-input-business-top').val().replace(/\s+/g, '-').toLowerCase();
    var businessName = $('#search-input-business-top').val();
    //need this to route to the businesses.html!!!
    $.get("/api/search/"+ businessName, function(data) {
      businesses = data;
      initializePanels();
      $('#search-input-business-top').val('');
    });
  });
  
  function initializePanels() {
    businessContainer.empty();
    var businessesToAdd = [];
    for (var i = 0; i <businesses.length; i++) {
      businessesToAdd.push(createNewRow(businesses[i]));
    }
    businessContainer.append(businessesToAdd);
  }
  function initializeDrop() {
    categoryContainer.empty();
    categoryContainer.append('<option value="">All</option>')
    var categoriesToAdd = [];
    for (var i = 0; i <categories.length; i++) {
      categoriesToAdd.push(createNewOption(categories[i]));
    }
    categoryContainer.append(categoriesToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(post) {

    var newPostPanel = $("<div>");
    newPostPanel.addClass("panel panel-default");
    var newPostPanelHeading = $("<div>");
    newPostPanelHeading.addClass("panel-heading");
    var newPostTitle = '<h2><a href="/biz/' + post.id + '">' + post.biz_name + '</a></h2>';
    var newPostCategory = $("<h3>");
    newPostCategory.text(post.category);
    newPostCategory.css({
      float: "right",
      "font-weight": "700",
      "margin-top":
      "-15px"
    });
    var newPostPanelBody = $("<div>");
    newPostPanelBody.addClass("panel-body");
    var newPostBody = $("<p>");
    newPostBody.text(post.biz_desc);
   
    newPostPanelHeading.append(newPostTitle);
    newPostPanelHeading.append(newPostCategory);
    newPostPanelBody.append(newPostBody);
    newPostPanel.append(newPostPanelHeading);
    newPostPanel.append(newPostPanelBody);
    newPostPanel.data("post", post);
    return newPostPanel;
  }
  function createNewOption(post) {
    var newDropPanel = $("<option>");
    newDropPanel.attr("value", post.id);
    newDropPanel.text(post.cat_name);
    return newDropPanel;
  }

  getBusinesses();
  getCategories();

});