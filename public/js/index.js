$("#login").on(click, function(event) {
  event.preventDefault();
  $.ajax({
    headers: {
      "Content-Type": "application/json"
    },
    type: "POST",
    url: "/login",
    data: JSON.stringify({
      username: $("#username").text(),
      password: $("#password").text()
    })
  });
});
