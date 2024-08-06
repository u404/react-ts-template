export const SERVICE_URL: string = import.meta.env.VITE_SERVICE_URL
export const PUBLIC_PATH: string = location.origin + import.meta.env.BASE_URL.replace(/^\/*/, '/').replace(/\/$/, '')
