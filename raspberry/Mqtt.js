var awsIot = require('aws-iot-device-sdk');

class Mqtt {

    constructor(){
        this.topic = 'topic_1';
        this.device = awsIot.device({
            keyPath: './private.pem',
            certPath: './cert.pem',
            caPath: './root-CA.crt',
            clientId: 'iot-data-generator',
            host: 'xxxxxxxxxxxxx.iot.ap-northeast-1.amazonaws.com'
        });
    }

    async connect(){
        return new Promise( (resolve,reject) =>{
            this.device.on('connect', function() {
                console.log('connected');
                resolve();
            });
        });
    }

    publish(value){
        const date = new Date();
        const json = {
            value: value,
            datetime: date.getTime()
        }
        console.log(JSON.stringify(json))
        this.device.publish(this.topic, JSON.stringify(json));
    }
}

module.exports = Mqtt;