let SERVER_URL = '13.209.91.5:8080';
if (process.env.NODE_ENV === 'development') {
  SERVER_URL = 'http://localhost:8080';
}

export { SERVER_URL };
