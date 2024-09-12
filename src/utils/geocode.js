const request = require('postman-request')
const geocode = (address, cb) => {
    const url =
        'https://api.weatherstack.com/current?access_key=513315a574e34c69f8a08902c8a85c60&query=' +
        encodeURIComponent(address)

    request({ url, json: true }, (err, res) => {
        const data = res?.body
        if (err) {
            cb('Unable to connect to location services', undefined)
        } else if (data?.success === false) {
            cb('Bad request. Unable to find location', undefined)
        } else {
            const { lat, lon } = data?.location
            cb(undefined, {
                lat,
                lon,
            })
        }
    })
}

module.exports = geocode
