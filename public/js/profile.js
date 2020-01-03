$("#followBtn").click(function(event) {
  event.preventDefault();
  var foreignUserID = window.location.href.split("/");
  foreignUserID = foreignUserID.pop();
  $.ajax({
    headers: {
      "Content-Type": "application/json"
    },
    type: "POST",
    url: "/follow/" + foreignUserID,
    data: JSON.stringify({
      id: sessionStorage.getItem("id"),
      password: sessionStorage.getItem("password")
    })
  })
    .then(data => {
      if (data.err) {
        alert(data.err);
      } else {
        //window.location.href = data.url;
        console.log(data);
      }
    })
    .catch(err => {
      console.log(err.statusCode());
    });
});
$("#logout").on("click", function() {
  sessionStorage.setItem("id", "");
  sessionStorage.setItem("password", "");
  sessionStorage.setItem("accountCreated", "false");
  window.location.href = "/";
});
$(".ui.radio.checkbox").checkbox();
