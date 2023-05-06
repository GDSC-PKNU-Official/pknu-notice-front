let SERVER_URL: string = import.meta.env.VITE_BACKEND_URL;
if (process.env.NODE_ENV === 'development') {
  SERVER_URL = 'http://localhost:8080';
}

export { SERVER_URL };
