(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['login'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div id=\"login-box\">\n  <h1>Welcome to StormSpot!</h1>\n  <h2>Please login/register</h2>\n  <input type=\"text\" class=\"pretty-input\" placeholder=\"username\">\n  <input type=\"text\" class=\"pretty-input\" placeholder=\"password\">\n  <input type=\"text\" class=\"pretty-input\" placeholder=\"re-enter password\">\n  <br>\n  <button class=\"pretty-button green-btn\">Register</button> \n  <br>\n  <input type=\"text\" class=\"pretty-input\" placeholder=\"username\">\n  <input type=\"text\" class=\"pretty-input\" placeholder=\"password\">\n  <br>\n  <button class=\"pretty-button green-btn\">Login</button> \n\n  <div class=\"alert\">\n    <p>This is an error</p>\n  </div>\n</div>\n";
  },"useData":true});
})();
