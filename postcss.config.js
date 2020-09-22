const purgecss = require('@fullhuman/postcss-purgecss')({
  keyframes: true,
  content: ['./src/*.html', './src/*.js'],
  defaultExtractor: content => {
    const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];

    const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];

    return broadMatches.concat(innerMatches);
  },
});

module.exports = {
  plugins: [
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env')({
      stage: 2,
      features: {
        'nesting-rules': true,
        'prefers-color-scheme-query': true,
      },
      autoprefixer: {
        flexbox: 'no-2009',
        grid: 'autoplace',
      },
    }),
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
  ],
};
