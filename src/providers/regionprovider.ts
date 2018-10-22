import { fetchUrl } from 'fetch';
import { ICity, IRegion } from '../types';

export function getRegions(city: ICity): Promise<IRegion[]> {
  return new Promise((resolve, reject) => {
    fetchUrl(
      `http://yemeksepeti.com/${city.key}`,
      (err: any, meta: any, body: Buffer) => {
        if (err) {
          reject(err);
          return;
        }

        const content = body
          .toString()
          .match(
            new RegExp(`data-url="/${city.key}/(.*?)">(.*?)</option>`, 'g')
          );

        const regions = content.map(regionRaw => {
          const region = regionRaw.match(
            new RegExp(
              `data-url="/${city.key}/[A-Za-z0-9_@./#&+-]+">(.*?)</option>`,
              'g'
            )
          );
          return region[0]
            .replace(
              new RegExp(`data-url="/${city.key}/[A-Za-z0-9_@./#&+-]+">`, 'g'),
              ''
            )
            .replace('</option>', '');
        });

        const regionCodes = content.map(region => {
          const ex = new RegExp(`data-url="/${city.key}/(.*?)">`, 'g');
          const regionCode = region.match(ex);

          return regionCode[0]
            .replace(`data-url="/${city.key}/`, '')
            .replace('">', '');
        });

        const regionCodePairs: IRegion[] = regions.map((region, index) => ({
          city,
          key: regionCodes[index],
          name: region,
        }));

        resolve(regionCodePairs);
      }
    );
  });
}
