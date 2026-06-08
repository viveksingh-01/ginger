import axiosInstance from '@/shared/api/axios';
import axios, { AxiosError } from 'axios';
import type { ApiErrorBody, OrderStatusEvent } from '../models/order-status';

export function subscribeOrderStatus(
  orderId: number,
  onUpdate: (event: OrderStatusEvent) => void,
  signal?: AbortSignal
): Promise<void> {
  return new Promise((resolve, reject) => {
    let lastIndex = 0;
    let buffer = '';

    axiosInstance
      .get<string>(`/order/${orderId}/status`, {
        responseType: 'text', // important: SSE is text, not JSON
        headers: {
          Accept: 'text/event-stream',
        },
        signal,
        onDownloadProgress(progressEvent) {
          const xhr = progressEvent.event?.target as XMLHttpRequest;
          if (!xhr) return;

          const chunk = xhr.responseText.slice(lastIndex);
          lastIndex = xhr.responseText.length;
          if (!chunk) return;

          buffer += chunk;

          let boundary = buffer.indexOf('\n\n');
          while (boundary !== -1) {
            const block = buffer.slice(0, boundary);
            buffer = buffer.slice(boundary + 2);

            const parsed = parseSSEBlock(block);
            if (parsed?.event === 'order-status' && parsed.data) {
              const update = JSON.parse(parsed.data) as OrderStatusEvent;
              onUpdate(update);
              if (update.isTerminal) {
                resolve();
                return;
              }
            }
            boundary = buffer.indexOf('\n\n');
          }
        },
      })
      .then(() => resolve())
      .catch((err: AxiosError<ApiErrorBody>) => {
        if (axios.isCancel(err)) return;
        const message = err.response?.data?.statusMessage ?? err.message ?? 'Request failed';
        reject(new Error(message));
      });
  });
}

function parseSSEBlock(block: string): { event?: string; data?: string } | null {
  let event: string | undefined;
  let data = '';

  for (const line of block.split('\n')) {
    if (line.startsWith('event:')) event = line.slice(6).trim();
    if (line.startsWith('data:')) data += line.slice(5).trim();
  }

  return data ? { event, data } : null;
}
