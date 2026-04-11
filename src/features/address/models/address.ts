export default interface IAddress {
  id: string;
  name: string;
  phone: string;
  annotation: string;
  address: string;
  house: string;
  area?: string;
  city?: string;
  landmark: string;
  lat: string;
  lng: string;
}

export interface IAddressResponse {
  statusCode: number;
  statusMessage: string;
  data: IAddress[];
}
