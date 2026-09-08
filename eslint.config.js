const rules_config = require('./src/config');

module.exports = [
    ...rules_config(),
    {files: ['**/*.js', 'bin/lint'], languageOptions: {sourceType: 'commonjs'}},
];
