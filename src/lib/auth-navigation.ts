type NavigateOptions = { replace?: boolean; state?: unknown };

let navigate: ((to: string, options?: NavigateOptions) => void) | null = null;

export function registerAuthNavigate(fn: (to: string, options?: NavigateOptions) => void) {
  navigate = fn;
}

export function redirectToLogin() {
  if (window.location.pathname.startsWith('/auth/')) return;
  navigate?.('/auth/login', { replace: true });
}
