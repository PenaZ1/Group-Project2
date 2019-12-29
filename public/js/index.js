if (
  sessionStorage.getItem("accountCreated") &&
  window.location.pathname === "/"
) {
  $("#accountCreated").text("Account has been created.");
}

if (window.location.pathname === "/signup") {
  sessionStorage.setItem("accountCreated", false);
}

$("#login").on("click", function(event) {
  event.preventDefault();
  sessionStorage.setItem("accountCreated", false);
  $.ajax({
    headers: {
      "Content-Type": "application/json"
    },
    type: "POST",
    url: "/login",
    data: JSON.stringify({
      username: $("#username").val(),
      password: $("#password").val()
    })
  })
    .then(function(data) {
      sessionStorage.setItem("id", data.session.id);
      sessionStorage.setItem("password", data.session.password);
      sessionStorage.setItem("accountCreated", false);
      window.location.href = data.url;
    })
    .catch(err => {
      if (err.statusCode().status === 401) {
        $("#loginError").text("Invalid username or password");
      }
    });
});
$("#register").on("click", function(event) {
  event.preventDefault();
  if (!$("#rusername").val() || !$("#rpassword").val() || !$("#remail").val()) {
    return $("#rerror").text("A required field is empty.");
  }
  $.ajax({
    headers: {
      "Content-Type": "application/json"
    },
    type: "POST",
    url: "/register",
    data: JSON.stringify({
      username: $("#rusername").val(),
      password: $("#rpassword").val(),
      email: $("#remail").val()
    })
  })
    .then(data => {
      if (data.err) {
        alert(data.err);
      } else {
        window.location.href = data.url;
        console.log("data.url");
        sessionStorage.setItem("accountCreated", true);
      }
    })
    .catch(err => {
      console.log(err.statusCode());
    });
});

$("#user").on("click", event => {
  event.preventDefault();
  console.log("clicked");

  window.location.href = `http://localhost:3000/user/${sessionStorage.getItem(
    "id"
  )}`;
});

$("#switchMode").on("click", event => {
  event.preventDefault();
  console.log("clicked");

  //   });
  //  {{>sfwfeed}}
});
