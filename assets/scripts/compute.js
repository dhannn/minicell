let playButton = document.getElementById('play-button');
playButton.addEventListener('click', compute);

let stopButton = document.getElementById('stop-button');
stopButton.addEventListener('click', stop);

let resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', reset);

let stepButton = document.getElementById('step-button');
stepButton.addEventListener('click', step);

let pauseButton = document.getElementById('pause-button');
pauseButton.addEventListener('click', pause);

let generationHeading = document.getElementsByClassName('generation-heading')[0];


function updateGeneration() {
    console.log(generationHeading);

    if (JSON.stringify(CellularAutomaton.lastComputation) === "{}") {
        generationHeading.innerHTML = "Generation: 0";
        generationHeading.style = "display: none";
        return;
    }
    
    let step = CellularAutomaton.lastComputation.step;
    generationHeading.innerHTML = `Generation: ${step}`;
}

function makeVisible() {
    generationHeading.style = "display: block";
    playButton.style = 'display: inline';
    stopButton.style = 'display: inline';
    resetButton.style = 'display: inline';
    stepButton.style = 'display: inline';
}

function compute() {
    CellularAutomaton.compute(updateGeneration);
    playButton.style = 'display: none';
    pauseButton.style = 'display: inline';
}

function pause() {
    CellularAutomaton.pause();
    pauseButton.style = 'display: none';
    playButton.style = 'display: inline';
}

function stop() {
    if (CellularAutomaton.getInstance())
        CellularAutomaton.stop(updateGeneration);
}

function reset() {
    playButton.style = 'display: none';
    stopButton.style = 'display: none';
    resetButton.style = 'display: none';
    stepButton.style = 'display: none';
    pauseButton.style = 'display: none';

    resetInput();

    if (CellularAutomaton.getInstance())
        CellularAutomaton.reset(updateGeneration);
}

function step() {
    CellularAutomaton.step(updateGeneration);
    pauseButton.style = 'display: none';
    playButton.style = 'display: inline';
}
