export type OrderStatus = 'PLACED' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'PICKED_UP' | 'ON_THE_WAY' | 'DELIVERED';

export interface OrderStatusEvent {
  orderId: number;
  restaurantName: string;
  status: string;
  title: string;
  subtitle?: string;
  step: number;
  totalSteps: number;
  eta: number;
  isTerminal: boolean;
  updatedAt: string;
}

export interface ApiErrorBody {
  statusCode: number;
  statusMessage: string;
}
