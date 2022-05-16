const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')
const handlebars = require('handlebars')

const htmlToPdf = async () => {
  // launch a new chrome instance
  const browser = await puppeteer.launch({
    headless: true
  })

  // create a new page
  const page = await browser.newPage()

  // set your html as the pages content
	const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8')
	const data = {
		name: "Emran Ibn Shayed"
	}
	
	var template = handlebars.compile(html);
	var finalHtml = encodeURIComponent(template(data));

	await page.goto(`data:text/html;charset=UTF-8,${finalHtml}`, {
    waitUntil: "networkidle0",
  });
  // or a .pdf file
  await page.pdf({
    format: 'A4',
    path: path.join(__dirname, 'ticket.pdf')
  })

  // close the browser
  await browser.close()
}

htmlToPdf()