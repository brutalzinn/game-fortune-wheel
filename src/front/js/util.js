const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};


function applyOwnerVisualEffects() {
  if (isOwner) {
    lblUserId.innerHTML = `${clientId} - MASTER`
    menu.style.visibility = "block"
    return
  }
  lblUserId.innerHTML = `${clientId} - SLAVE`
  menu.style.visibility = "hidden"
}

///like squid lib
function generateShortID() {
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  var string_length = 8;
  var randomstring = '';
  for (var i = 0; i < string_length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
  }
  return randomstring;
}