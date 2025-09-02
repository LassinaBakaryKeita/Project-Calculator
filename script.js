// Variables globales
let ecran = document.querySelector('.conteneur-ecran');
let currentInput = '0';
let previousInput = '';
let operation = null;
let shouldResetScreen = false;
let expression = ''; // Nouvelle variable pour stocker l'expression complète

// Mise à jour de l'écran
function updateScreen() {
    ecran.textContent = expression || currentInput;
}

// Ajouter un chiffre
function appendNumber(number) {
    if (currentInput === '0' || shouldResetScreen) {
        currentInput = number;
        shouldResetScreen = false;
    } else {
        currentInput += number;
    }
    
    // Mettre à jour l'expression affichée
    if (operation) {
        expression = previousInput + ' ' + getOperationSymbol(operation) + ' ' + currentInput;
    } else {
        expression = currentInput;
    }
    
    updateScreen();
}

// Ajouter une décimale
function addDecimal() {
    if (shouldResetScreen) {
        currentInput = '0.';
        shouldResetScreen = false;
    } else if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    
    // Mettre à jour l'expression affichée
    if (operation) {
        expression = previousInput + ' ' + getOperationSymbol(operation) + ' ' + currentInput;
    } else {
        expression = currentInput;
    }
    
    updateScreen();
}

// Obtenir le symbole d'opération pour l'affichage
function getOperationSymbol(op) {
    switch(op) {
        case '+': return '+';
        case '-': return '-';
        case '×': return '×';
        case '÷': return '÷';
        default: return op;
    }
}

// Gérer les opérations
function chooseOperation(op) {
    if (currentInput === '0') return;

    if (previousInput !== '') {
        calculate();
    }

    operation = op;
    previousInput = currentInput;
    shouldResetScreen = true;
    
    // Mettre à jour l'expression avec l'opération
    expression = previousInput + ' ' + getOperationSymbol(operation);
    updateScreen();
}

// Calculer le résultat
function calculate() {
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '×':
            computation = prev * current;
            break;
        case '÷':
            if (current === 0) {
                alert("Erreur: Division par zéro!");
                resetCalculator();
                return;
            }
            computation = prev / current;
            break;
        default:
            return;
    }
    
    currentInput = computation.toString();
    operation = null;
    previousInput = '';
    shouldResetScreen = true;
    expression = ''; // Réinitialiser l'expression après calcul
    updateScreen();
}

// Supprimer le dernier caractère
function deleteLast() {
    if (currentInput.length === 1) {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    
    // Mettre à jour l'expression affichée
    if (operation) {
        expression = previousInput + ' ' + getOperationSymbol(operation) + ' ' + currentInput;
    } else {
        expression = currentInput;
    }
    
    updateScreen();
}

// Réinitialiser la calculatrice
function resetCalculator() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    shouldResetScreen = false;
    expression = ''; // Réinitialiser l'expression
    updateScreen();
}

// Ajouter les écouteurs d'événements
document.getElementById('btn-sept').addEventListener('click', () => appendNumber('7'));
document.getElementById('btn-huit').addEventListener('click', () => appendNumber('8'));
document.getElementById('btn-neuf').addEventListener('click', () => appendNumber('9'));
document.getElementById('btn-quart').addEventListener('click', () => appendNumber('4'));
document.getElementById('btn-cinq').addEventListener('click', () => appendNumber('5'));
document.getElementById('btn-six').addEventListener('click', () => appendNumber('6'));
document.getElementById('btn-un').addEventListener('click', () => appendNumber('1'));
document.getElementById('btn-deux').addEventListener('click', () => appendNumber('2'));
document.getElementById('btn-trois').addEventListener('click', () => appendNumber('3'));
document.getElementById('btn-zero').addEventListener('click', () => appendNumber('0'));
document.getElementById('btn-point').addEventListener('click', addDecimal);

document.getElementById('btn-add').addEventListener('click', () => chooseOperation('+'));
document.getElementById('btn-sous').addEventListener('click', () => chooseOperation('-'));
document.getElementById('btn-mul').addEventListener('click', () => chooseOperation('×'));
document.getElementById('btn-div').addEventListener('click', () => chooseOperation('÷'));

document.getElementById('btn-equal').addEventListener('click', calculate);
document.getElementById('btn-ac').addEventListener('click', resetCalculator);
document.getElementById('btn-del').addEventListener('click', deleteLast);

// Support du clavier
document.addEventListener('keydown', (event) => {
    if (/[0-9]/.test(event.key)) {
        appendNumber(event.key);
    } else if (event.key === '.') {
        addDecimal();
    } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        let op = event.key;
        if (op === '*') op = '×';
        if (op === '/') op = '÷';
        chooseOperation(op);
    } else if (event.key === 'Enter' || event.key === '=') {
        calculate();
    } else if (event.key === 'Escape') {
        resetCalculator();
    } else if (event.key === 'Backspace') {
        deleteLast();
    }
});

// Initialisation de l'écran
updateScreen();