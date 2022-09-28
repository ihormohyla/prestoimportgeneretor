const urlRewrite = require('./urlRewriter');

module.exports  = {
    getParentCategory: function(category, categories) {
        if (category && category.parentId) {
            const parent = categories.find((cat) => cat.id == category.parentId);
            return parent['#text'];
        }
        return '';
    },
    isRootCategory: function(category) {
        return (category && category.parentId) ? 0 : 1;
    },
    prepareCategories: function (categories){
        const formatCategories = [];
        categories.forEach((category) => {
            const formatCategory = {
                'Category ID': category.id,
                'Active (0/1)': 1,
                'Name *': category['#text'],
                'Parent category': this.getParentCategory(category, categories),
                'Root category (0/1)': this.isRootCategory(category),
                'Description': '',
                'Meta title': '',
                'Meta keywords': '',
                'Meta description': '',
                'URL rewritten': urlRewrite.createRewriteUrl(category['#text']),
                'Image URL': ''
            };

            formatCategories.push(formatCategory);
        });
        return formatCategories;
    }
}