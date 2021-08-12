const { withPlausibleProxy } = require('next-plausible');

module.exports = withPlausibleProxy()({
  async redirects() {
    return [
      {
        source: '/.well-known/apple-app-site-association',
        destination: '/api/apple-app-site-association',
        permanent: true
      }
    ];
  }
});
