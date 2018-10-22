import { IPromotion } from './index';

export interface IRestaurant {
  AreaName: string;
  CatalogName: string;
  ClosedByParent: boolean;
  CuisineNameList: string[];
  DeliveryFee: number;
  DeliveryTime: number;
  DisplayName: string;
  HasDVDPromotion: boolean;
  ImageLabel: any;
  ImageLabelList: string[];
  ImagePath: string;
  ImageFullPath: string;
  IsOpen: boolean;
  IsRestaurantOpen: boolean;
  MinimumDeliveryPrice: Float64Array;
  PaymentMethodsList: string[];
  PromotionInfo: IPromotion[];
  WorkHoursText: string;
  AvgPoint?: Float64Array;
  Flavour?: Float64Array;
  Serving?: Float64Array;
  Speed?: Float64Array;
  SeoUrl: string;
}
