 // Utility Functions
 function binaryToDecimal(binary) {
    return parseInt(binary, 2);
}

function decimalToBinary(decimal) {
    return (decimal & 255).toString(2).padStart(8, '0');
}

// Simulation Functions
function simulateAND(inputA, inputB) {
    const steps = [];
    for (let i = 0; i < 8; i++) {
        const bitA = inputA[i];
        const bitB = inputB[i];
        const resultBit = bitA === '1' && bitB === '1' ? '1' : '0';
        
        steps.push({
            step: `Bit ${7-i}: ${bitA} AND ${bitB} = ${resultBit}`,
            explanation: bitA === '1' && bitB === '1' 
                ? 'Both bits are 1, result is 1' 
                : 'At least one bit is 0, result is 0'
        });
    }
    return steps;
}

function simulateOR(inputA, inputB) {
    const steps = [];
    for (let i = 0; i < 8; i++) {
        const bitA = inputA[i];
        const bitB = inputB[i];
        const resultBit = bitA === '1' || bitB === '1' ? '1' : '0';
        
        steps.push({
            step: `Bit ${7-i}: ${bitA} OR ${bitB} = ${resultBit}`,
            explanation: bitA === '1' || bitB === '1' 
                ? 'At least one bit is 1, result is 1' 
                : 'Both bits are 0, result is 0'
        });
    }
    return steps;
}

function simulateXOR(inputA, inputB) {
    const steps = [];
    for (let i = 0; i < 8; i++) {
        const bitA = inputA[i];
        const bitB = inputB[i];
        const resultBit = bitA !== bitB ? '1' : '0';
        
        steps.push({
            step: `Bit ${7-i}: ${bitA} XOR ${bitB} = ${resultBit}`,
            explanation: bitA !== bitB 
                ? 'Bits are different, result is 1' 
                : 'Bits are the same, result is 0'
        });
    }
    return steps;
}

function simulateAddition(inputA, inputB) {
    const steps = [];
    let carry = 0;
    let resultBinary = '';

    for (let i = 7; i >= 0; i--) {
        const bitA = parseInt(inputA[i]);
        const bitB = parseInt(inputB[i]);
        
        // Full adder logic
        const sum = bitA + bitB + carry;
        const resultBit = sum % 2;
        carry = Math.floor(sum / 2);

        steps.push({
            step: `Bit ${7-i}: ${bitA} + ${bitB} + Carry(${carry}) = ${resultBit}`,
            explanation: `Sum: ${sum}, New Carry: ${carry}`
        });

        resultBinary = resultBit + resultBinary;
    }

    return steps;
}

function simulateShiftLeft(inputA) {
    return [{
        step: `Shift Left: ${inputA} -> ${inputA.slice(1)}0`,
        explanation: 'All bits shifted left, least significant bit becomes 0.'
    }];
}

function simulateShiftRight(inputA) {
    return [{
        step: `Shift Right: ${inputA} -> 0${inputA.slice(0, 7)}`,
        explanation: 'All bits shifted right, most significant bit becomes 0.'
    }];
}

function simulateNOT(inputA) {
    const steps = [];
    for (let i = 0; i < 8; i++) {
        const bitA = inputA[i];
        const resultBit = bitA === '1' ? '0' : '1';
        steps.push({
            step: `Bit ${7-i}: NOT ${bitA} = ${resultBit}`,
            explanation: bitA === '1' 
                ? 'Bit is 1, result is inverted to 0' 
                : 'Bit is 0, result is inverted to 1'
        });
    }
    return steps;
}

// Event Listeners
document.getElementById('inputA').addEventListener('input', function (e) {
    let value = e.target.value;
    value = value.replace(/[^01]/g, '');
    e.target.value = value; 
    document.getElementById('decimalA').textContent = `Decimal: ${binaryToDecimal(value.padStart(8, '0'))}`;
});

document.getElementById('inputB').addEventListener('input', function (e) {
    let value = e.target.value;
    value = value.replace(/[^01]/g, '');
    e.target.value = value; 
    document.getElementById('decimalB').textContent = `Decimal: ${binaryToDecimal(value.padStart(8, '0'))}`;
});

document.getElementById('calculateBtn').addEventListener('click', () => {
    const inputA = document.getElementById('inputA').value.padStart(8, '0');
    const inputB = document.getElementById('inputB').value.padStart(8, '0');
    const operation = document.getElementById('operation').value;

    let result = '';
    if (operation === 'add') {
        result = decimalToBinary(binaryToDecimal(inputA) + binaryToDecimal(inputB));
    } else if (operation === 'and') {
        result = decimalToBinary(binaryToDecimal(inputA) & binaryToDecimal(inputB));
    } else if (operation === 'or') {
        result = decimalToBinary(binaryToDecimal(inputA) | binaryToDecimal(inputB));
    } else if (operation === 'xor') {
        result = decimalToBinary(binaryToDecimal(inputA) ^ binaryToDecimal(inputB));
    } else if (operation === 'shift-left') {
        result = inputA.slice(1) + '0';
    } else if (operation === 'shift-right') {
        result = '0' + inputA.slice(0, 7);
    } else if (operation === 'not-a') {
        result = inputA.split('').map(bit => bit === '1' ? '0' : '1').join('');
    }

    document.getElementById('resultBinary').textContent = result;
    document.getElementById('resultDecimal').textContent = binaryToDecimal(result);
});

document.getElementById('simulateBtn').addEventListener('click', () => {
    const inputA = document.getElementById('inputA').value.padStart(8, '0');
    const inputB = document.getElementById('inputB').value.padStart(8, '0');
    const operation = document.getElementById('operation').value;

    let steps = [];
    if (operation === 'add') {
        steps = simulateAddition(inputA, inputB);
    } else if (operation === 'and') {
        steps = simulateAND(inputA, inputB);
    } else if (operation === 'or') {
        steps = simulateOR(inputA, inputB);
    } else if (operation === 'xor') {
        steps = simulateXOR(inputA, inputB);
    } else if (operation === 'shift-left') {
        steps = simulateShiftLeft(inputA);
    } else if (operation === 'shift-right') {
        steps = simulateShiftRight(inputA);
    } else if (operation === 'not-a') {
        steps = simulateNOT(inputA);
    }

    const simulationContainer = document.getElementById('simulationSteps');
    simulationContainer.style.display = 'block';
    simulationContainer.innerHTML = '<h3>Simulation Steps</h3>';
    steps.forEach(step => {
        simulationContainer.innerHTML += `
            <div class="simulation-step">
                <strong>${step.step}</strong>
                <p>${step.explanation}</p>
            </div>
        `;
    });
});