const http = require('http');
const https = require('https');
const cheerio = require('cheerio');

const PORT = 8484

const server = http.createServer((req, res) => {
    var req = https.request({
        hostname: 'bonbast.com',
        port: 443,
        path: '/',
        method: 'GET',
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:81.0) Gecko/20100101 Firefox/81.0",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        }
    }, _res => {
        const chunks = []

        _res.on("data", (chunk) => {
            chunks.push(chunk)
        });

        _res.on("end", () => {
            const body = Buffer.concat(chunks).toString('utf8');

            const $ = cheerio.load(body);

            var gold_ounce = parseFloat($('div.container')
                .find('div.row')
                .find('div.col-sm-3.col-md-2.hidden-xs.col-panel')
                .find('div.panel.panel-info.text-center')
                .find('div.panel-body.feature')
                .find('span#ounce_top')
                .text().split(",").join(""))

            var gold_gram = parseInt($('div.container')
                .find('div.row')
                .find('div.col-md-2.hidden-xs.hidden-sm.col-panel')
                .find('div.panel.panel-info.text-center')
                .find('div.panel-body.feature')
                .find('span#gol18_top')
                .text().split(",").join(""))

            var gold_mesghal = parseInt($('div.container')
                .find('div.row')
                .find('div.col-md-2.hidden-xs.hidden-sm.col-panel')
                .find('div.panel.panel-info.text-center')
                .find('div.panel-body.feature')
                .find('span#mithqal_top')
                .text().split(",").join(""))


            var coin_emami = parseInt($('div.container')
                .find('div.row')
                .find('div.col-sm-3.col-md-2.hidden-xs.col-panel')
                .find('div.panel.panel-info.text-center')
                .find('div.panel-body.feature')
                .find('span#emami1_top')
                .text().split(",").join(""))

            var usd = parseInt($('div.container')
                .find('div.row')
                .find('div.col-sm-3.col-md-2.hidden-xs.col-panel')
                .find('div.panel.panel-info.text-center')
                .find('div.panel-body.feature')
                .find('span#usd1_top')
                .text().split(",").join(""))

            var eur = parseInt($('div.container')
                .find('div.row')
                .find('div.col-sm-3.col-md-2.hidden-xs.col-panel')
                .find('div.panel.panel-info.text-center')
                .find('div.panel-body.feature')
                .find('span#eur1_top')
                .text().split(",").join(""))

            res.writeHead(200);
            res.end("price_gold_ounce{} " + gold_ounce + "\n" +
                "price_gold_gram{} " + gold_gram + "\n" +
                "price_gold_mesghal{} " + gold_mesghal + "\n" +
                "price_coin_emami{} " + coin_emami + "\n" +
                "price_usd{} " + usd + "\n" +
                "price_eur{} " + eur + "\n")
        });
    })

    req.on('error', (error) => {
        console.error(error)
    })

    req.end()
});
server.listen(PORT, '127.0.0.1');