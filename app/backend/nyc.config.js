module.exports = {
  extends: '@istanbuljs/nyc-config-typescript',
  include: [
    'src/models',
    'src/services',
    'src/controllers',
    'src/schema',
  ],
  reporter: [
    'text',
    'text-summary',
    'json-summary',
    'html',
    'lcov',
  ],
};
