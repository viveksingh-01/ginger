import type { ILoginPayload, ISignupPayload } from '../models/payload';
import type IAuthResponse from '../models/response';

const BASE_URL = import.meta.env.VITE_GINGER_API_URL;

export async function login(payload: ILoginPayload): Promise<IAuthResponse> {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data: IAuthResponse = await res.json();
    if (!res.ok || data.statusCode !== 0) {
      throw new Error(data.statusMessage || 'Login failed');
    }
    return data;
  } catch (err) {
    throw err;
  }
}

export async function signup(payload: ISignupPayload): Promise<IAuthResponse> {
  try {
    const res = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data: IAuthResponse = await res.json();
    if (!res.ok || data.statusCode !== 0) {
      throw new Error(data.statusMessage || 'Signup failed');
    }
    return data;
  } catch (err) {
    throw err;
  }
}
