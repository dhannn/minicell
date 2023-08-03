class CellularAutomaton {
    static instance = null;
    static canvas = null;
    static context = null;
    static delay = 500;

    isPlaying = false;

    static getInstance() {
        if (!this.instance) {
            this.instance = {};
        }

        return this.instance;
    }

    static reset() {
        this.isPlaying = false;
        this.context.clearRect(0, 0, canvas.width, canvas.height);
    }

    static readMachineFromJSON(json) {
        this.instance = JSON.parse(json);
        console.log(this.instance);
        return this.instance;
    }

    static setCanvas(c) {
        this.canvas = c;
        this.context = this.canvas.getContext('2d');
    }

    static setDelay(delay) {
        this.delay = delay;
    }

    static initialDraw() {
        console.log(this.instance);
        this.draw(this.instance.definition.initialConfig, 0);
    }

    static compute() {
        let initialConfig = this.instance.definition.initialConfig;
        let comp = initialConfig;
        let steps = 0;
        this.draw(initialConfig, steps);
        this.isPlaying = true;
        
        console.log(steps + ': ' + comp);
        const interval = setInterval(() => {
            if (this.isPlaying) {
                comp = this.nextComputation(comp);
                steps++;
                this.draw(comp, steps);    
                console.log(steps + ': ' + comp);
            } else {
                clearInterval(interval);
            }
        }, this.delay);
    }

    static draw(str, i) {
        const START = 10;
        const initialConfig = str;
        const GRID_COLS = initialConfig.length;
        const SIZE = 20;
        const GRID_ROWS = 1;
    
        for (let row = 0; row < GRID_ROWS; row++) {  
            for (let col = 0; col < GRID_COLS; col++) {
                this.context.strokeStyle = '#467599';
                this.context.lineWidth = 2;
                this.context.strokeRect(START + SIZE * col, START + SIZE * (row + i), SIZE, SIZE);
    
                let currentState = initialConfig.charAt(col);
                let currentFill = this.instance.display.states[currentState];
    
                this.context.fillStyle = currentFill;
                this.context.fillRect(START + SIZE * col, START + SIZE * (row + i), SIZE, SIZE);
            }
        }
    }

    static nextComputation(current) {
        let comp = [];

        for (var i = 0; i < current.length; i++) {
            comp.push('-');
        }

        for (var i = 0; i < current.length; i++) {
            let start = i;
            let end = i + 3;
    
            let x = current.slice(start, end);
    
            if (end > current.length) {
                end = current.length - end;
                start = i;
    
                let s = current.slice(start);
                let e = current.slice(0, 3 - s.length);
                x = s + e;
    
            }
            
            if (this.instance.definition.ruleset[x] !== undefined) {
                comp[(i + 1) % current.length] = this.instance.definition.ruleset[x];
            } else {
                comp[(i + 1) % current.length] = x[1];
            }
        }
        
        console.log(comp);
        return comp.join('');
    }

    static stop() {
        this.isPlaying = false;
        this.context.clearRect(0, 0, canvas.width, canvas.height);
        this.initialDraw();
    }
}
