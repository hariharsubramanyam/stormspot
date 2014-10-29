/**
 * Lead Author: Harihar
 */
(function() {
  $(document).ready(function() {
    populate_select();
    set_button_handler();
  });

  var populate_select = function() {
    var select = $("select");
    for (var key in Global.tests) {
      var option = "<option value='" + key + "'>" + key + "</option>";
      select.append(option);
    }
  };

  var set_button_handler = function() {
    $("button").click(function() {
      var select = $("select");
      reset(function() {
        Global.tests[select.val()](function(request, response) {
          $("#req_div p").text(request);
          $("#resp_div p").text(response);
        });
      });
    });
  };

  var reset = function(callback) {
    // Reset the database.
    $.get("/testing/reset", function() {
      create_test_user(function() {
        create_test_report(callback);
      });
    });
  };

  var create_test_user = function(callback) {
    $.post("/auth/register", {"username": "tester", "password": "tester"}).done(function(data) {
      // Store the session_id in a cookie.
      data = JSON.parse(data);
      $.cookie("session_id", data.result, {"path": "/"});
      callback();
    });
  };

  var create_test_report = function(callback) {
    $.post("/report", {
      "lat": 42,
      "lon": -72,
      "severity_level": "SEVERE",
      "storm_type": "TORNADO",
      "content": "This is my first report"
    }).done(callback);
  };
})();
