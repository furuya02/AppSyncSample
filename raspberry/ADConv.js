const ADS1x15 = require('raspi-kit-ads1x15');

class ADConv{

    constructor(i2c){
        this.adc = new ADS1x15({
            i2c,                                    // i2c interface
            chip: ADS1x15.chips.IC_ADS1015,         // chip model
            address: ADS1x15.address.ADDRESS_0x48,  // i2c address on the bus
            
            // Defaults for future readings
            pga: ADS1x15.pga.PGA_4_096V,            // power-gain-amplifier range
            sps: ADS1x15.spsADS1015.SPS_250         // data rate (samples per second)
        });
        this.channel = ADS1x15.channel.CHANNEL_0;

        this.min = 1270; // 最低値
        this.max = 2027; // 最高値
        this.range = this.max - this.min;
    }

    async read(){
        return new Promise((resolve,reject)=> {
            this.adc.readChannel(this.channel, (err, value, volts) => {
                if (err) {
                    console.error('Failed to fetch value from ADC', err);
                    reject(err);
                } else {
                    let val = value - this.min;
                    val = val / this.range * 100;

                    if(val < 0){
                        val = 0;
                    }
                    if(100 <= val){
                        val = 100;
                    }
                    resolve(Math.round(val * 10) / 10); // 小数第一位を基準
                }
            })
        });
    }
}

module.exports = ADConv;