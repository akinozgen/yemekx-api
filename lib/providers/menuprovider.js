"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_1 = require("fetch");
function getMenus(restaurant) {
    return new Promise((resolve, reject) => {
        fetch_1.fetchUrl(`http://yemeksepeti.com/${restaurant.SeoUrl}`, (err, meta, body) => {
            if (err) {
                reject(err);
                return;
            }
            const content = body.toString();
            const menuNames = content
                .match(/<a href(.*?) data-product-id=(.*?)<\/a>/g)
                .map(menu => menu.replace(/<.*?>/g, ''));
            const menuDesctiptions = content
                .match(/<span class="productInfo">+\r(.*?)+<\/p>/g)
                .map(menu => menu.replace(/<(.*?)>/g, '').replace(/\r/g, ''));
            const menuPrices = content
                .match(/<span class="pull-right newPrice">(.*?) TL<\/span>/g)
                .map(menu => menu
                .replace(/<(.*?)>/g, '')
                .replace(/[a-zA-Z._ ]+/g, '')
                .replace(',', '.'));
            const menus = menuNames.map((menu, index) => {
                return {
                    Description: menuDesctiptions[index],
                    Name: menu,
                    Price: parseFloat(menuPrices[index]),
                };
            });
            resolve(menus);
        });
    });
}
exports.getMenus = getMenus;
//# sourceMappingURL=menuprovider.js.map