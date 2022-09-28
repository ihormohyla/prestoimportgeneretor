const urlRewrite = require('./urlRevriter');

module.exports = {
    getCategory: function(product, categories) {
        const parent = categories.find((cat) => cat.id == product.categoryId);
        return parent['#text'];
    },
    getArticul: function(product) {
        if (product.param && product.param.length) {
            const parent = product.param.find((pr) => pr.name == 'Артикул');
            return (parent) ? parent['#text'] : '';
        }
        return '';

    },
    getPictures: function (product){
        if(product.picture) {
            if (Array.isArray(product.picture)) {
                return (product.picture) ? product.picture.join(',') : '';
            } else {
                return product.picture
            }
        }
        return '';
    },
    prepareProducts: function (products, categories, shopName){
        const formatProducts = [];
        products.forEach((product) => {
            const formatProduct = {
                'Product ID': product.id,
                'Active (0/1)': 1,
                'Name *': (product.name_ua) ? product.name_ua : product.name,
                'Categories (x,y,z...)': this.getCategory(product, categories),
                'Price tax excluded': product.price,
                'Tax rules ID': '',
                'Wholesale price': '',
                'On sale (0/1)': 1,
                'Discount amount': '',
                'Discount from (yyyy-mm-dd)': '',
                'Reference #': '',
                'Supplier reference #': '',
                'Supplier': shopName,
                'Manufacturer': product.vendor,
                'EAN13': this.getArticul(product),
                'UPC': '',
                'Ecotax': '',
                'Width': '',
                'Height': '',
                'Depth': '',
                'Weight': '',
                'Delivery time of in-stock products': '',
                'Delivery time of out-of-stock products with allowed orders': '',
                'Quantity': product.stock_quantity,
                'Minimal quantity': 1,
                'Low stock level': '',
                'Send me an email when the quantity is under this level': 0,
                'Visibility': '',
                'Additional shipping cost': '',
                'Unity': '',
                'Unit price': '',
                'Summary': '',
                'Description': (product.description_ua) ? product.description_ua : product.description,
                'Tags (x,y,z...)': '',
                'Meta title': '',
                'Meta keywords': '',
                'Meta description': '',
                'URL rewritten': urlRewrite.createRewriteUrl((product.name_ua) ? product.name_ua : product.name),
                'Text when in stock': '',
                'Text when backorder allowed': '',
                'Available for order (0 = No, 1 = Yes)': '',
                'Product available date': '',
                'Product creation date': '',
                'Show price (0 = No, 1 = Yes)': 1,
                'Image URLs (x,y,z...)': this.getPictures(product),
                'Delete existing images (0 = No, 1 = Yes)': 0,
                'Feature(Name:Value:Position)': '',
                'Available online only (0 = No, 1 = Yes)': 0,
                'Condition': 'new',
                'Customizable (0 = No, 1 = Yes)': 0,
                'Uploadable files (0 = No, 1 = Yes)': 0,
                'Text fields (0 = No, 1 = Yes)': 0,
                'Out of stock action': 0,
                'Virtual product': 0,
                'File URL': '',
                'Number of allowed downloads': '',
                'Expiration date': '',
                'Number of days': '',
                'ID / Name of shop': 0,
                'Advanced stock management': 0,
                'Depends On Stock': 0,
                'Warehouse': 0,
                'Acessories  (x,y,z...)': ''
            };

            formatProducts.push(formatProduct);
        });
        return formatProducts;
    }
}