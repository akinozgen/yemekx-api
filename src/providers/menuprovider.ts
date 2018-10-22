import { fetchUrl } from 'fetch';
import { IMenu, IRestaurant } from '../types';

export function getMenus(restaurant: IRestaurant): Promise<IMenu[]> {
  return new Promise((resolve, reject) => {
    fetchUrl(
      `http://yemeksepeti.com/${restaurant.SeoUrl}`,
      (err: any, meta: any, body: Buffer) => {
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
          .map(menu =>
            menu
              .replace(/<(.*?)>/g, '')
              .replace(/[a-zA-Z._ ]+/g, '')
              .replace(',', '.')
          );

        const menus: IMenu[] = menuNames.map((menu, index) => {
          return {
            Description: menuDesctiptions[index],
            Name: menu,
            Price: parseFloat(menuPrices[index]),
          };
        });

        resolve(menus);
      }
    );
  });
}
