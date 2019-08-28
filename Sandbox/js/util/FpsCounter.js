

class FpsCounter {
    
    constructor(refreshRate = 100, sampleSize = 10){
        this.size = sampleSize;
        this.rate = refreshRate;
        this.counter = 0;
        this.lastFps = 0;
        this.lastNow = performance.now();
        this.samples = [];
    }

    tick() {
        let now = performance.now();
        this.samples.unshift(now - this.lastNow);
        this.lastNow = now;
        while(this.samples.length > this.size)
            this.samples.pop();
        
        if(this.counter++ > this.rate) {
            this.counter = 0;
            this.lastFps = Math.floor(this.calc() * 10) / 10;
        }
        return this.lastFps;
    }

    calc() {
        var sum = 0;
        for(var sample of this.samples) 
            sum += sample;
        return (1000.0 / (sum / this.samples.length));
    }
}

exports.FpsCounter = FpsCounter;