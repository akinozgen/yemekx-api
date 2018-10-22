"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_1 = require("fetch");
function getCities() {
    return new Promise((resolve, reject) => {
        fetch_1.fetchUrl('http://yemeksepeti.com', (err, meta, body) => {
            if (err) {
                reject(err);
                return;
            }
            const content = body.toString();
            const cities = content
                .match(/<span class="name">(.*?)<\/span>/g)
                .map(city => city.replace('<span class="name">', '').replace('</span>', ''));
            const cityCodes = content
                .match(/<a class="cityLink col-md-1 " href="\/(.*?)">/g)
                .map(city => city
                .replace('<a class="cityLink col-md-1 " href="/', '')
                .replace('">', ''));
            const cityCodePairs = cities.map((city, index) => ({
                key: cityCodes[index],
                name: city,
            }));
            resolve(cityCodePairs);
        });
    });
}
exports.getCities = getCities;
//# sourceMappingURL=cityprovider.js.map