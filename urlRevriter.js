const CyrillicToTranslit = require('cyrillic-to-translit-js');
const cyrillicToTranslit = new CyrillicToTranslit();

module.exports = {
    createRewriteUrl: function (text){
        return cyrillicToTranslit.transform(
            text.replace('(', '')
                .replace(')', '')
                .replace('  ', ' ')
                .replace(' - ', ' ')
                .toLowerCase(),
            "-");
    }
}