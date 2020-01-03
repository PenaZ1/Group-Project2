var otherUserID = window.location.href.split("/");
otherUserID = otherUserID.pop();
if (otherUserID === sessionStorage.getItem("id")) {
  $("#followBtn").hide();
}
