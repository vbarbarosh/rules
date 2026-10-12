const make_rules_config = require('./src/make_rules_config');

module.exports = [
    ...make_rules_config(),
    {files: ['**/*.js', 'bin/build', 'bin/lint'], languageOptions: {sourceType: 'commonjs'}},
];
