class SevenSegLED {
    constructor(i2c){
      this.i2c = i2c;
        
      this.number = [0x3f, 0x06, 0x5b, 0x4f, 0x66, 0x6d, 0x7d, 0x07, 0x7f, 0x6f];
      this.HT16K33 =  0x70;
      this.buffer = new Buffer.alloc(0x20);
  
      // initiaruize
      this.i2c.writeByteSync(this.HT16K33, (0x20 | 0x01), 1);
      this.i2c.writeByteSync(this.HT16K33, (0x80 | 0b00000001), 1);
  
    } 
  
    disp(n){
        let str = n.toFixed(1);
        str = ('000' + str).slice(-5);
        
        // .1桁
        this.buffer[9] = this.number[Number(str[str.length-1])];
        // 0桁
        this.buffer[7] = this.number[Number(str[str.length-3])];
        this.buffer[7] |= 0x80; // 小数点
        // 10桁
        this.buffer[3] = this.number[Number(str[str.length-4])];
        // 100桁
        this.buffer[1] = this.number[Number(str[str.length-5])];
  
        // 0パディングは表示しない
        if(this.buffer[1] == 0x3f){
            this.buffer[1] = 0;
            if(this.buffer[3] == 0x3f){
                this.buffer[3] = 0;
            }
        }
  
        for(var i=0;i<10;i++){
          this.i2c.writeByteSync(this.HT16K33, i, this.buffer[i+1]);
        }
    }
}

module.exports = SevenSegLED;