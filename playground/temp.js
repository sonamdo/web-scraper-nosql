const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var bob = `
<!DOCTYPE html>
<body>
<p>Hello world</p>
<ul>
  <li>1</li>
  <li>2</li>
</ul>
</body>
`

// const dom = new JSDOM(bob, { runScripts: "dangerously" })
//
// console.log(dom.window.document.querySelector("body").textContent)
//
//
// var window = jsdom.jsdom(body).createWindow();
//
// var temp = window.document.getElementsByClassName('u-eng')[0].innerHTML;
// console.log(temp);

var d = new Date()

console.log(d.toLocaleDateString())
