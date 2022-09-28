const args = require('minimist')(process.argv.slice(2));
const axios = require('axios');
const fastcsv = require('fast-csv');
const fs = require('fs');
const path = require('path');
const { XMLParser } = require('fast-xml-parser');
const categoriesModule = require('./categories');
const productsModule = require('./products');
const parser = new XMLParser({
    ignoreAttributes : false,
    attributeNamePrefix: ''
});

function getDataFromUrl(url) {
    return axios.get(url,{ responseEncoding: 'utf8', responseType: 'text/xml',});
}

function writeCsv(data, fileName) {
    const ws = fs.createWriteStream(fileName);
    const stream = fastcsv.format({ delimiter: ';', headers: true });
    stream.pipe(ws);
    data.forEach((cat) => {
        stream.write(cat);
    })
    stream.end();
}


(async function main() {
    const url = args.url;
    const outDir = 'result';
    console.log(path.resolve(outDir));
    if (!fs.existsSync(path.resolve(outDir))) {
        fs.mkdirSync(path.resolve( outDir));
    }
    const data = await getDataFromUrl(url);
    let result = parser.parse(data.data);
    const {yml_catalog: {shop: { name, currencies: { currency }, categories: {category}, offers: {offer}}}} = result;

    const timestamp = Date.now();
    const outputProductsFileName = path.resolve(outDir, `${name}-products-${timestamp}.csv`);
    const outputCategoriesFileName = path.resolve(outDir, `${name}-categories-${timestamp}.csv`);

    const catForWrite = categoriesModule.prepareCategories(category);
    writeCsv(catForWrite, outputCategoriesFileName);

    const prodForWrite = productsModule.prepareProducts(offer, category, name);
    writeCsv(prodForWrite, outputProductsFileName);

})();


