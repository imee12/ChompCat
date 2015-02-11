var template = [];

template.room1 = [
//"<div class= 'room1'>",
'<article data-msgid="<%= _id %>">',
'<h4> <%= username %></h4>',
'<p> <%= msg %></p>',
"<button class='deletemsgx'>Delete?</button>",
"</article>"

].join("");


// template.foodpix = [
// "div class='fodpix'>",
// "<img src='<%= img %>'>",
// "</div>"
//
// ].join("");
