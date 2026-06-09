import { useEffect, useState } from 'react';
import { subscribeOrderStatus } from '../api/order-status-service';
import type { OrderStatusEvent } from '../models/order-status';

export function useOrderStatusStream(orderId: number | null) {
  const [event, setEvent] = useState<OrderStatusEvent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!orderId) return;

    const ac = new AbortController();
    setLoading(true);
    setError(null);

    subscribeOrderStatus(orderId, update => setEvent(update), ac.signal)
      .catch(e => {
        if ((e as Error).name !== 'AbortError') {
          setError((e as Error).message);
        }
      })
      .finally(() => setLoading(false));

    return () => ac.abort();
  }, [orderId]);

  return { event, error, loading };
}
