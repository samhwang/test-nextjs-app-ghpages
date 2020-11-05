const isProd = process.env.NODE_ENV === "production";
const URL = 'https://samhwang.github.io/test-nextjs-app-ghpages'

module.exports = {
  assetPrefix: isProd ? URL : '',
}