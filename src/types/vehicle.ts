export interface IVehicle {
  id: string;
  price: number;
  make: string;
  model: string;
  body: string;
  imageUrl: string;
}

export interface IVehicleFilter {
  manufacturer: string | null
  bodyStyle: string | null
  priceRangeLow: number | null
  priceRangeHigh: number | null
}

export interface ICart {
  item: ICartItem[]
}

export interface ICartItem {
  manufacturer: string
  model: string
  quantity: number
}
