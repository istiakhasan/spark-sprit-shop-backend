export const getBaseUrl = () => {
  return process.env.BASE_ORIGIN || 'http://localhost:3000'
}
export const getLiveServerUrl = () => {
  return process.env.SERVER_SITE || 'http://localhost:5000'
}
