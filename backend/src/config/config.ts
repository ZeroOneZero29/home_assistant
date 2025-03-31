export default () => ({
  port: process.env.PORT || 3000,
  secret_jwt: process.env.JWT_ACCESS_SECRET,
  secret_jwt_refresh: process.env.JWT_REFRESH_SECRET,
  yandex: process.env.YANDEX,
});
