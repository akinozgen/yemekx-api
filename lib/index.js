"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cityprovider_1 = require("./providers/cityprovider");
const regionprovider_1 = require("./providers/regionprovider");
const restaurantprovider_1 = require("./providers/restaurantprovider");
const menuprovider_1 = require("./providers/menuprovider");
const app = express();
app.get("/", (req, res) => {
    res.send({
        error: "Not Allowed!"
    });
});
app.get("/cities", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const cities = yield cityprovider_1.getCities();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(cities);
}));
app.get("/regions/:city", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const regions = yield regionprovider_1.getRegions({ key: req.params.city });
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(regions);
}));
app.get("/restaurants/:city/:region", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const restaurants = yield restaurantprovider_1.getRestaurants({
        key: req.params.region,
        city: { key: req.params.city }
    });
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(restaurants);
}));
app.get("/menus/:city/:region/:SeoUrl", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const menus = yield menuprovider_1.getMenus({
        SeoUrl: req.params.SeoUrl
    });
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(menus);
}));
app.listen(8080, _ => console.dir(`Listening On: 80`));
//# sourceMappingURL=index.js.map