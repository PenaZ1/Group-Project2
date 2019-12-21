$("#login").on("click", function(event) {
  event.preventDefault();
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
      sessionStorage.setItem("id", data.session.id); // Important
      sessionStorage.setItem("password", data.session.password); // Important
      window.location.href = data.url; // Important
    })
    .catch(err => {
      if (err.statusCode().status === 401){
        $("#loginError").text("Invalid username or password");
      }
    });
});
$("#register").on("click", function(event) {
  event.preventDefault();
  $.ajax({
    headers: {
      "Content-Type": "application/json"
    },
    type: "POST",
    url: "/register",
    data: JSON.stringify({
      username: $("#rusername").val(),
      password: $("#rpassword").val()
    })
  })
    .then(data => {
      if (data.err) {
        alert(data.err);
      } else {
        window.location.href = data.url;
      }
    })
    .catch(err => {
      console.log(err.statusCode());
    });
});

$("#user").on("click", (event) => {
  event.preventDefault()
  console.log("clicked");
  
    window.location.href = `http://localhost:3000/user/${sessionStorage.getItem("id")}`;
    //  $.ajax({
    //     type: "GET",
    //     url: `/user/${sessionStorage.getItem("id")}`
    //   }).then(response, () => {
  
    //   });
  });
  