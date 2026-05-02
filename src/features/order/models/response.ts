import type IOrderDetail from './order';

export default interface IOrderResponse {
  statusCode: number;
  statusMessage: string;
  data: IOrderDetail;
}
