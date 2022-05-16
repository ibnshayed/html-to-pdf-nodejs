var fs = require('fs');
var pdf = require('html-pdf');
const path = require('path');
const handlebars = require('handlebars')



var html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
var options = { format: 'A4' };

const data = {
	name: "Emran Ibn Shayed"
}

var template = handlebars.compile(html);
var finalHtml = encodeURIComponent(template(data));

pdf.create(finalHtml, options).toFile(path.join(__dirname, 'htmlpdf.pdf'), function(err, res) {
  if (err) return console.log(err);
  console.log(res); // { filename: '/app/businesscard.pdf' }
});