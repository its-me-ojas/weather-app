import request from "request";

const forecast = (address, callback) => {

  const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + address + '&units=metric&appid=28594504f62305af2d01a3ff34d72e9f'

  request({ url, json: true }, (error, body = {}) => {
    if (error) {
      callback("Unable to connect to weather services!", undefined)
    } else {
      callback(undefined, body)
    }
  })
}

export default forecast


