import puppeteer from 'puppeteer'
import axios from 'axios'
import dotenv, { config } from 'dotenv'

dotenv.config();
const {HOSTQUERY, PORTQUERY} = process.env



export const crawler = async (req, res) => {

    function crawler(tools) {
        tools.map((t) => {
            (async () => {
                try {
                    const config = {
                        headers: {
                          'Authorization': req.headers['authorization'],
                          'Content-Type': 'application/ld+json'
                        }
                    };


                    const browser = await puppeteer.launch();
                    const page = await browser.newPage();
                    await page.goto('https://ticjob.es/');
                    await page.waitForSelector('#keywords-input');
                    await page.evaluate(
                        (q) => { document.querySelector('#keywords-input').value = q;}, 
                        t.name
                    );
                    const searchButton = '#main-search-button';
                    await page.waitForSelector(searchButton);
                    await page.click(searchButton)
        
                    await page.waitForFunction(() => {
                        const element = document.querySelector('#numberOfferFound');
                        return element && element.textContent.trim().length > 0;
                    });
     
                    let date = new Date();
                    let year = date.getFullYear();
                    let month = ('0' + (date.getMonth() + 1)).slice(-2); // Los meses empiezan en 0
                    let day = ('0' + date.getDate()).slice(-2);
                    let hour = ('0' + date.getHours()).slice(-2);
                    let formattedDate = `${year}-${month}-${day}_${hour}`;
                
                    await page.screenshot({path: 'img/'+formattedDate+'_'+t.name.replace(/\s+/g, '').toLowerCase()+'.png'});
                    // Extraer el texto del elemento
                    const number = await page.evaluate(() => document.querySelector('#numberOfferFound').textContent);
        
                    console.log('va a guardar')
                    axios.post(`https://${HOSTQUERY}:${PORTQUERY}/api/queries`, {
                        "result": parseInt(number),
                        "comment": "Crawler",
                        "site": "/api/sites/1",
                        "tool": [t['@id']]
                    }, config)
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    })

                } catch (error) {
                    console.log('Error', error);
                }
            })();
        })
    }
    try {

        const config = {
            headers: {
              'Authorization': req.headers['authorization'],
              'Content-Type': 'application/ld+json'
            }
        };

        axios.get(`https://${HOSTQUERY}:${PORTQUERY}/api/tools`, config)
        .then(function (response) {
            // handle success
            console.log(response.data['hydra:member']);
            const tools = response.data['hydra:member']
            crawler(tools)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

        axios.get(`https://${HOSTQUERY}:${PORTQUERY}/api/sites`, config)
        .then(function (response) {
            // handle success
            console.log(response.data['hydra:member']);
            const sites = response.data['hydra:member']
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

        console.log(req.body)
        res.status(201).json('Crawler')

    } catch (error) {
        console.log('error');
        res.status(400).json({ message: error.message })
    }
}

