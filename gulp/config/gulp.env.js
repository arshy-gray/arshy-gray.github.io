const minimist = require('minimist')

const envOption = {
	string: 'env',
	default: { env: process.env.NODE_ENV || 'dev' },
}
const options = minimist(process.argv.slice(2), envOption)
const isProduction = options.env === 'prod'
module.exports = isProduction
