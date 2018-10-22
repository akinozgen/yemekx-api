import { ICity } from './city';

export interface IRegion {
  key: string;
  name: string;
  city: ICity;
}
