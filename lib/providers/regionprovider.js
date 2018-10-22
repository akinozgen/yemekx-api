"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_1 = require("fetch");
function getRegions(city) {
    return new Promise((resolve, reject) => {
        fetch_1.fetchUrl(`http://yemeksepeti.com/${city.key}`, (err, meta, body) => {
            if (err) {
                reject(err);
                return;
            }
            const content = body
                .toString()
                .match(new RegExp(`data-url="/${city.key}/(.*?)">(.*?)</option>`, 'g'));
            const regions = content.map(regionRaw => {
                const region = regionRaw.match(new RegExp(`data-url="/${city.key}/[A-Za-z0-9_@./#&+-]+">(.*?)</option>`, 'g'));
                return region[0]
                    .replace(new RegExp(`data-url="/${city.key}/[A-Za-z0-9_@./#&+-]+">`, 'g'), '')
                    .replace('</option>', '');
            });
            const regionCodes = content.map(region => {
                const ex = new RegExp(`data-url="/${city.key}/(.*?)">`, 'g');
                const regionCode = region.match(ex);
                return regionCode[0]
                    .replace(`data-url="/${city.key}/`, '')
                    .replace('">', '');
            });
            const regionCodePairs = regions.map((region, index) => ({
                city,
                key: regionCodes[index],
                name: region,
            }));
            resolve(regionCodePairs);
        });
    });
}
exports.getRegions = getRegions;
//# sourceMappingURL=regionprovider.js.map