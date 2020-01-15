const ws281x = require('rpi-ws281x-v2');

class Pixels {
    constructor(){
        const config = {
            leds: 8,
            brightness: 100, // 0-255
            gpio: 18,// BMC18(12pin)
            strip: 'rgb' // "rgb", "rbg", "grb", "gbr", "bgr", "brg".
        };
        ws281x.configure(config);
        
        this.pixels = new Uint32Array(config.leds);
    }
  
    // dat=0..100
    show(dat){
        const n = dat * 0.08
        for(var i=0; i < 8; i++) {
            if(i < n){
                if (i < 4) {
                    this.pixels[i] = 0xFF0000; // GREEN
                } else if(i < 6) {
                    this.pixels[i] = 0xFFFF00; // YELLOW
                } else if(i < 7) {
                    this.pixels[i] = 0x88FF00; // ORANGE
                } else {
                    this.pixels[i] = 0x00FF00; // RED
                }
            } else {
                this.pixels[i] = 0x000000;
            }
        }    
        ws281x.render(this.pixels);
    }
}

module.exports = Pixels;