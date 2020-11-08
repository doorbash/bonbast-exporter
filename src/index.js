const http = require('http');
const https = require('https');
const cheerio = require('cheerio');

const PORT = 8484
const agents = ["Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36 Edg/86.0.622.63","Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:81.0) Gecko/20100101 Firefox/81.0" , "Mozilla/5.0 (Linux; Android 5.0.2; SAMSUNG SM-A500FU Build/LRX22G) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/3.3 Chrome/38.0.2125.102 Mobile Safari/537.36","Mozilla/5.0 (Linux; Android 6.0.1; SAMSUNG SM-G930T1 Build/MMB29M) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/4.0 Chrome/44.0.2403.133 Mobile Safari/537.36"];
const server = http.createServer((req, res) => {
    var req = https.request({
        hostname: 'bonbast.com',
        port: 443,
        path: '/',
        method: 'GET',
        headers: {
            "user-agent": agents[Math.floor(Math.random() * agents.length)],
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "en-US,en;q=0.9,fa;q=0.8",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            "cookie": "cookieconsent_status=true; _ga=GA1.1.1582202067.1604176058; _ga_PZF6SDPF22=GS1.1.1604849942.6.0.1604849943.0"
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
