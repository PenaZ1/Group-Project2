$("#post").on("click", function(event) {
  event.preventDefault();
  $.ajax({
    headers: {
      "Content-Type": "application/json"
    },
    type: "POST",
    url: "/post",
    data: JSON.stringify({
      text: $("#postcontent").val(),
      id: sessionStorage.getItem("id"),
      password: sessionStorage.getItem("password"),
      nsfw: $("input[name='nsfw']:checked").val()
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
