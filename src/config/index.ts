let SERVER_URL = import.meta.env.VITE_BACKEND_URL;
if (process.env.NODE_ENV === 'development') {
  SERVER_URL = 'http://localhost:8080';
}
const GOOGLE_ANALYTICS = import.meta.env.VITE_GOOGLE_ANALYTICS;

export { SERVER_URL, GOOGLE_ANALYTICS };
