import axios from "axios";

class getInfoDevice {
  public static async changeState(){
    let data = JSON.stringify({
        "devices": [
          {
            "id": "66b1fe19-83e5-429a-9f77-bc4bd1d9f24a",
            "actions": [
              {
                "type": "devices.capabilities.on_off",
                "state": {
                  "instance": "on",
                  "value": false
                }
              }
            ]
          }
        ]
      });
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.iot.yandex.net/v1.0/devices/actions',
        headers: { 
          'Authorization': 'Bearer y0__xCy0vTdARjJ8DQgsMf3lBK31iFzMwp_zxgsIrgEjxIChtzHUw', 
          'Content-Type': 'application/json'
        },
        data : data
      };

    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
    

      

      
      
  }
}

export default getInfoDevice;


