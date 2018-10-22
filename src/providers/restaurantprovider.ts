import * as decode from 'decode-html';
import { fetchUrl } from 'fetch';
import { IRegion, IRestaurant } from '../types';

export function getRestaurants(region: IRegion): Promise<IRestaurant[]> {
  return new Promise((resolve, reject) => {
    fetchUrl(
      `http://yemeksepeti.com/${region.city.key}/${region.key}`,
      (err: any, meta: any, body: Buffer) => {
        if (err) {
          reject(err);
          return;
        }

        const restaurantsRaw: IRestaurant[] = body
          .toString()
          .match(/<span data-tooltip="{(.*?)">/g)
          .map(restauranData => {
            return JSON.parse(
              decode(
                restauranData
                  .replace('<span data-tooltip="', '')
                  .replace('">', '')
              )
            );
          });

        resolve(restaurantsRaw);
      }
    );
  });
}
