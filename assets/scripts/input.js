let submitButton = document.querySelector('#submit-button');
let machineInput = document.querySelector('#machine-input');
let delayInput = document.querySelector('#delay-input');
let canvas = document.querySelector('#machine-canvas');

submitButton.addEventListener('click', handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    parseMachineInput();
    makeVisible();
}

function parseMachineInput() {
    let reader = new FileReader();
    
    reader.onload = (event) => {
        CellularAutomaton.readMachineFromJSON(event.target.result);
        initializeDisplay();
    }
    
    reader.readAsText(machineInput.files[0]);
}

function initializeDisplay() {
    CellularAutomaton.setDelay(delayInput.value);
    CellularAutomaton.setCanvas(canvas);
    CellularAutomaton.initialDraw();
}

function resetInput() {
    machineInput.value = '';
}
