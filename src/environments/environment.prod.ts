export const environment = {
  production: true,
  apiUrl: 'http://localhost:4000',
  session: JSON.parse(localStorage.getItem('currentUser'))
};