import { fetchUrl } from "fetch";
import { ICity } from "../types";

export function getCities(): Promise<ICity[]> {
  return new Promise((resolve, reject) => {
    fetchUrl(
      "https://yemekx-api.herokuapp.com",
      (err: any, meta: any, body: Buffer) => {
        if (err) {
          reject(err);
          return;
        }

        const content = body.toString();

        const cities = content
          .match(/<span class="name">(.*?)<\/span>/g)
          .map(city =>
            city.replace('<span class="name">', "").replace("</span>", "")
          );

        const cityCodes = content
          .match(/<a class="cityLink col-md-1 " href="\/(.*?)">/g)
          .map(city =>
            city
              .replace('<a class="cityLink col-md-1 " href="/', "")
              .replace('">', "")
          );

        const cityCodePairs: ICity[] = cities.map((city, index) => ({
          key: cityCodes[index],
          name: city
        }));

        resolve(cityCodePairs);
      }
    );
  });
}
