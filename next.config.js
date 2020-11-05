const isProd = process.env.NODE_ENV === "production";
const baseURL = 'https://github.com/samhwang/test-nextjs-app-ghpages';
const prefix = '/test-nextjs-app-ghpages';

module.exports = {
  basePath: isProd ? prefix : '/',
  assetPrefix: isProd ? baseURL : '',
}