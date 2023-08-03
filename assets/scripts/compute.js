let playButton = document.getElementById('play-button');
playButton.addEventListener('click', compute);

let stopButton = document.getElementById('stop-button');
stopButton.addEventListener('click', stop);

let resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', reset);

function makeVisible() {
    playButton.style = 'display: inline';
    stopButton.style = 'display: inline';
    resetButton.style = 'display: inline';
}

function compute() {
    CellularAutomaton.compute();
}

function stop() {
    if (CellularAutomaton.getInstance())
        CellularAutomaton.stop();
}

function reset() {
    playButton.style = 'display: none';
    stopButton.style = 'display: none';
    resetButton.style = 'display: none';

    resetInput();

    if (CellularAutomaton.getInstance())
        CellularAutomaton.reset();
}
