(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['login'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div id=\"login-box\">\n  <h1>Welcome to StormSpot!</h1>\n  <h2>Please login/register</h2>\n  <input type=\"text\" class=\"pretty-input\" placeholder=\"username\" id=\"txt_reg_username\">\n  <input type=\"password\" class=\"pretty-input\" placeholder=\"password\" id=\"txt_reg_password\">\n  <input type=\"password\" class=\"pretty-input\" placeholder=\"re-enter password\" id=\"txt_reg_confirm\"> \n  <br>\n  <button class=\"pretty-button green-btn\" id=\"btn_register\">Register</button> \n  <br>\n  <input type=\"text\" class=\"pretty-input\" placeholder=\"username\" id=\"txt_log_username\">\n  <input type=\"password\" class=\"pretty-input\" placeholder=\"password\" id=\"txt_log_password\">\n  <br>\n  <button class=\"pretty-button green-btn\" id=\"btn_login\">Login</button> \n\n  <div class=\"alert\">\n    <p>This is an error</p>\n  </div>\n</div>\n";
  },"useData":true});
templates['logout'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<button class=\"pretty-button red-btn\">Logout</button>\n";
  },"useData":true});
templates['marker'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div id=\"marker-box\">\n  <button class=\"pretty-button\" id=\"btn_subscribe\">Subscribe</button>\n  <button class=\"pretty-button\" id=\"btn_report\">Report</button>\n  <div id=\"marker-box-form\"></div>\n</div>\n";
  },"useData":true});
templates['report_popup'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "<div id=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.report : depth0)) != null ? stack1.report_id : stack1), depth0))
    + "\">\n  <h1>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.report : depth0)) != null ? stack1.storm_type : stack1), depth0))
    + " ("
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.report : depth0)) != null ? stack1.severity_level : stack1), depth0))
    + ")</h1>\n  <button class=\"pretty-button btn_upvote\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.report : depth0)) != null ? stack1.upvoters : stack1)) != null ? stack1.length : stack1), depth0))
    + " upvoters</button>\n  <button class=\"pretty-button btn_downvote\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.report : depth0)) != null ? stack1.downvoters : stack1)) != null ? stack1.length : stack1), depth0))
    + " downvoters</button>\n  <p>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.report : depth0)) != null ? stack1.content : stack1), depth0))
    + "</p>\n</div>\n";
},"useData":true});
templates['subscribe'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div id=\"subscribe-box\">\n  <h1>Make a subscription!</h1>\n  <input type=\"text\" class=\"pretty-input\" placeholder=\"Phone Number\" id=\"txt_phone\">\n  <br>\n  <select id=\"sel_carrier\">\n    <option value=\"message.alltel.com\">ALLTEL</option>\n    <option value=\"txt.att.net\">AT&T</option>\n    <option value=\"myboostmobile.come\">BOOST</option>\n    <option value=\"myblue.com\">CENTENNIAL</option>\n    <option value=\"einstenmms.com\">EINSTEIN</option>\n    <option value=\"messaging.nextel.com\">NEXTEL</option>\n    <option value=\"pm.sprint.com\">SPRINT</option>\n    <option value=\"tmomail.com\">TMOBILE</option>\n    <option value=\"mms.uscc.net\">USCELLULAR</option>\n    <option value=\"vtext.com\">VERIZON</option>\n    <option value=\"vmobl.com\">VIRGIN</option>\n  </select>\n  <br>\n  <select id=\"sel_severity\">\n    <option value=\"NORMAL\">NORMAL</option>\n    <option value=\"SEVERE\">SEVERE</option>\n    <option value=\"DESTRUCTIVE\">DESTRUCTIVE</option>\n  </select>\n  <br>\n  <button class=\"pretty-button green-btn\" id=\"btn_subscribe\">Subscribe</button>\n</div>";
  },"useData":true});
})();
