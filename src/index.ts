import * as express from "express";

import { getCities } from "./providers/cityprovider";
import { getRegions } from "./providers/regionprovider";
import { getRestaurants } from "./providers/restaurantprovider";
import { getMenus } from "./providers/menuprovider";
import { IRestaurant, IRegion, ICity } from "./types";

const app: express.Application = express();

app.get("/", (req, res) => {
  res.send({
    error: "Not Allowed!"
  });
});

app.get("/cities", async (req, res) => {
  const cities = await getCities();

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(cities);
});

app.get("/regions/:city", async (req, res) => {
  const regions = await getRegions(<ICity>{ key: req.params.city });

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(regions);
});

app.get("/restaurants/:city/:region", async (req, res) => {
  const restaurants = await getRestaurants(<IRegion>{
    key: req.params.region,
    city: { key: req.params.city }
  });

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(restaurants);
});

app.get("/menus/:city/:region/:SeoUrl", async (req, res) => {
  const menus = await getMenus(<IRestaurant>{
    SeoUrl: req.params.SeoUrl
  });

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(menus);
});

app.listen(8080, _ => console.dir(`Listening On: 80`));
