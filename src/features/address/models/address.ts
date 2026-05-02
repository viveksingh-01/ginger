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
  lat: number;
  lng: number;
}

export interface IAddressResponse {
  statusCode: number;
  statusMessage: string;
  data: IAddress[];
}

export interface ISaveAddressPayload {
  name: string;
  phone: string;
  annotation: string;
  address: string;
  house: string;
  area?: string;
  city?: string;
  landmark: string;
  lat: number;
  lng: number;
}
