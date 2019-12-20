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
      password: sessionStorage.getItem("password")
    })
  })
    .then(data => {
      if (data.err){
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
