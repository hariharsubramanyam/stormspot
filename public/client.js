function login() {
  var main = document.getElementById("main");

  var form = document.createElement("form");
  form.setAttribute("method", "post");
  form.setAttribute("action", "/auth/login");

  var user_field = document.createElement("input");
  user_field.setAttribute("type", "text");
  user_field.setAttribute("name", "username")

  var pass_field = document.createElement("input");
  pass_field.setAttribute("type", "password");
  pass_field.setAttribute("name", "password");

  var submit = document.createElement("input");
  submit.setAttribute("type", "submit");
  submit.setAttribute("name", "button")
  submit.setAttribute("value", "Login")

  var login_info = document.createElement("p");

  form.appendChild(login_info);
  form.appendChild(document.createElement("br"));
  form.appendChild(user_field);
  form.appendChild(document.createElement("br"));
  form.appendChild(pass_field);
  form.appendChild(document.createElement("br"));
  form.appendChild(submit);

  main.appendChild(form);
}

function register() {
  var main = document.getElementById("main");

  var form = document.createElement("form");
  form.setAttribute("method", "post");
  form.setAttribute("action", "/auth/register");

  var user_field = document.createElement("input");
  user_field.setAttribute("type", "text");
  user_field.setAttribute("name", "username")

  var pass_field = document.createElement("input");
  pass_field.setAttribute("type", "password");
  pass_field.setAttribute("name", "password");

  var submit = document.createElement("input");
  submit.setAttribute("type", "submit");
  submit.setAttribute("name", "button")
  submit.setAttribute("value", "Register")

  var login_info = document.createElement("p");

  form.appendChild(login_info);
  form.appendChild(document.createElement("br"));
  form.appendChild(user_field);
  form.appendChild(document.createElement("br"));
  form.appendChild(pass_field);
  form.appendChild(document.createElement("br"));
  form.appendChild(submit);

  main.appendChild(form);
}
function signup() {
  var main = document.getElementById("main");
  if(main != null) {
    main.remove();
  }
  main = document.createElement("div");
  main.setAttribute("id", "main");
  document.body.appendChild(main);
  login();
  register();
}
