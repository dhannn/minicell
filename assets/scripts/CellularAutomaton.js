class CellularAutomaton {
    static instance = null;
    static canvas = null;
    static context = null;
    static delay = 500;
    static lastComputation = {};
    static showState = false;

    isPlaying = false;

    static getInstance() {
        if (!this.instance) {
            this.instance = {};
        }

        return this.instance;
    }

    static reset(updateFn) {
        this.isPlaying = false;
        this.context.clearRect(0, 0, canvas.width, canvas.height);
        this.lastComputation = {};
        updateFn();
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

    static setShowState(showState) {
        this.showState = showState;
    }

    static initialDraw() {
        this.draw(this.instance.definition.initialConfig, 0);
    }

    static compute(updateFn) {
        if (JSON.stringify(this.lastComputation) === '{}') {    
            this.lastComputation = {
                config: this.instance.definition.initialConfig,
                step: 0
            };
        }

        let comp = this.lastComputation.config;
        let steps = this.lastComputation.step;

        this.draw(comp, steps);
        updateFn();
        this.isPlaying = true;
        
        console.log(steps + ': ' + comp);
        const interval = setInterval(() => {
            if (this.isPlaying) {
                comp = this.nextComputation(comp);
                steps++;
                this.draw(comp, steps % 30);
                
                this.lastComputation = {
                    config: comp,
                    step: steps
                };

                updateFn();
            } else {
                clearInterval(interval);
            }
        }, this.delay);
    }
    
    static pause() {
        this.isPlaying = false;
    }

    static step(updateFn) {
        if (JSON.stringify(this.lastComputation) === '{}') {    
            this.lastComputation = {
                config: this.instance.definition.initialConfig,
                step: 0
            };
        }

        this.isPlaying = false;

        let { config, step } = this.lastComputation;
        let comp = this.nextComputation(config);
        step++;

        this.draw(comp, step % 30);
        this.lastComputation = {
            config: comp, 
            step: step
        }

        updateFn();
    }

    static draw(str, i) {
        const START = 25;
        const initialConfig = str;
        const GRID_COLS = initialConfig.length;
        const SIZE = 25;
        
        for (let col = 0; col < GRID_COLS; col++) {
            this.context.strokeStyle = '#467599';
            this.context.lineWidth = 4;
            this.context.strokeRect(START + SIZE * col, START + SIZE * i, SIZE, SIZE);
            
            let currentState = initialConfig.charAt(col);
            let currentFill = this.instance.display.states[currentState];
            
            this.context.fillStyle = currentFill;
            this.context.fillRect(START + SIZE * col, START + SIZE * i, SIZE, SIZE);

            if (this.showState) {
                this.context.font = "15px monospace";
                this.context.strokeStyle = "#467599";
                this.context.fillStyle = "white";
                this.context.lineWidth = 4;
                this.context.strokeText(currentState, (START + SIZE * col) + SIZE / 2 - 10, START + SIZE * i + SIZE / 2);
                this.context.fillText(currentState, (START + SIZE * col) + SIZE / 2 - 10, (START + SIZE * i) + SIZE / 2);
            }
        }

        this.context.font = "50px monospace";
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

    static stop(updateFn) {
        this.isPlaying = false;
        this.lastComputation = {
            config: this.instance.definition.initialConfig,
            step: 0
        };
        this.context.clearRect(0, 0, canvas.width, canvas.height);
        this.initialDraw();

        updateFn();
    }
}
