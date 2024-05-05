const puppeteer = require('puppeteer');
const mysql = require('mysql2');
const Sequelize = require('sequelize');
require('dotenv').config();
const {HOSTBD, USERDB, PASSBD, NAMEDB, PORTBD} = process.env

const connection = new Sequelize(
    NAMEDB,
    USERDB,
    PASSBD, 
    {
        host: HOSTBD, 
        dialect: 'mysql',
        port: PORTBD
    }
)

connection.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
});

// Hace la estructura de la tabla
const WebPage = connection.define('scraper', {
    url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    total: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

// Sincronizar el modelo con la base de datos sino existe
connection.sync();

const q = ['JavaScript Madrid', 'PHP Madrid', 'Python Madrid', 'Java Madrid']

q.map((v) =>{
    (async () => {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto('https://ticjob.es/');
            await page.waitForSelector('#keywords-input');
            await page.evaluate((q) => {
                document.querySelector('#keywords-input').value = q;
            }, v);
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
        
            await page.screenshot({path: 'img/'+formattedDate+'_'+v.replace(/\s+/g, '').toLowerCase()+'.png'});
            // Extraer el texto del elemento
            const number = await page.evaluate(() => document.querySelector('#numberOfferFound').textContent);

            //Crea un registro en la base de datos
            WebPage.create({
                url: 'https://ticjob.es/',
                name: v,
                total: number
                }).then(() => {
                    console.log('Se ha guardado el resultado');
                }).catch((err) => {
                    console.log('No se ha podido guardar el resultado', err);
            });
            await browser.close();
        } catch (error) {
            console.log('Error', error);
        }
    })();
})








