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
}
