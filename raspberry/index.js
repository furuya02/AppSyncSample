"use strict";

const I2C = require('raspi-i2c').I2C;
const ADConv = require('./ADConv');
const SevenSegLED = require('./SevenSegLED');
const Pixels = require('./Pixels');
const Mqtt = require('./Mqtt');

async function sleep(t) {
    return await new Promise(r => {
      setTimeout(() => {
        r();
      }, t);
    });
}

async function main() {

    const i2c = new I2C();

    const adconv = new ADConv(i2c);
    const sevenSegLED = new SevenSegLED(i2c);
    const pixels = new Pixels();
    const mqtt = new Mqtt();
    await mqtt.connect();
    
    while(true){
        const value = await adconv.read();

        console.log(value);

        mqtt.publish(value);
        sevenSegLED.disp(value);
        pixels.show(value);

        await sleep(300);
    }

}

main();