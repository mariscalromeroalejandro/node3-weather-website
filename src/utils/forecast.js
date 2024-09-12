const request = require('postman-request')

const forecast = (lat, lon, cb) => {
    const url =
        'https://api.weatherstack.com/current?access_key=513315a574e34c69f8a08902c8a85c60&query=' +
        lat +
        ',' +
        lon
    request({ url, json: true }, (err, res) => {
        if (err) {
            cb('NETWORK ERROR', undefined)
        }
        if (res?.body?.error) {
            cb('BAD QUERY', undefined)
        } else {
            const { location, current } = res?.body
            const { name, country } = location
            const { weather_descriptions, temperature, feelslike } = current
            cb(
                undefined,
                'The weather in ' +
                    name +
                    '(' +
                    country +
                    ') is: ' +
                    weather_descriptions[0] +
                    ', ' +
                    temperature +
                    ' degrees out. It feels like ' +
                    feelslike
            )
        }
    })
}

module.exports = forecast
