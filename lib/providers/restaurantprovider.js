"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decode = require("decode-html");
const fetch_1 = require("fetch");
function getRestaurants(region) {
    return new Promise((resolve, reject) => {
        fetch_1.fetchUrl(`http://yemeksepeti.com/${region.city.key}/${region.key}`, (err, meta, body) => {
            if (err) {
                reject(err);
                return;
            }
            const restaurantsRaw = body
                .toString()
                .match(/<span data-tooltip="{(.*?)">/g)
                .map(restauranData => {
                return JSON.parse(decode(restauranData
                    .replace('<span data-tooltip="', '')
                    .replace('">', '')));
            });
            resolve(restaurantsRaw);
        });
    });
}
exports.getRestaurants = getRestaurants;
//# sourceMappingURL=restaurantprovider.js.map