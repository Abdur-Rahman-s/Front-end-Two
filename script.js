const amountInput = document.getElementById('M-amount');
const termInput = document.getElementById('M-term');
const interestRateInput = document.getElementById('M-insertRate');
const calculateBtn = document.getElementById('calculate');
const resultDiv = document.getElementById('result');
const repaymentBtn = document.getElementById('repayment');
const interestBtn = document.getElementById('interest-only');
const clear = document.getElementById('clear-btn');
const errorMessageDiv = document.getElementById('error-message');
const form = document.getElementById('mortgage-form');
const secondSection = document.querySelector('.second-section');
const firstResultSection = secondSection.children[0]; 
const secondResultSection = secondSection.children[1];

form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    if (!form.checkValidity()) {
        errorMessageDiv.textContent = 'Please fill out all required fields correctly.';
    } else {
        calculation(); 
        toggleSections(); 
    }
});

function calculation() {
    let principal = parseFloat(amountInput.value);
    let rate = parseFloat(interestRateInput.value) / 100 / 12;
    let loanTerm = parseFloat(termInput.value) * 12;

    errorMessageDiv.textContent = ''; 
    resultDiv.innerHTML = ''; // 

    if (isNaN(principal) || isNaN(rate) || isNaN(loanTerm)) {
        errorMessageDiv.textContent = 'Please fill out all required fields correctly.';
        return;
    }
    if (!repaymentBtn.checked && !interestBtn.checked) {
        errorMessageDiv.textContent = 'Please select a calculation type.';
        return;
    }

    if (repaymentBtn.checked) {
        let monthlyPayment = principal * rate * Math.pow(1 + rate, loanTerm) /
            (Math.pow(1 + rate, loanTerm) - 1);
        resultDiv.innerHTML = `
            <p>Your monthly repayment</p>
            <h1>£${monthlyPayment.toFixed(2)}</h1>
        `;
    } else if (interestBtn.checked) {
        let interestOnlyPayment = principal * rate;
        resultDiv.innerHTML = `
            <p>Your monthly interest payment</p>
            <h1>£${interestOnlyPayment.toFixed(2)}</h1>
        `;
    }
}

function toggleSections() {
    firstResultSection.classList.toggle('hidden'); 
    secondResultSection.classList.toggle('hidden'); 

    if (!secondResultSection.classList.contains('hidden')) {
        secondResultSection.classList.add('fade-in'); 
    } else {
        secondResultSection.classList.remove('fade-in'); 
    }
}

function clearForm() {
    amountInput.value = '';
    termInput.value = '';
    interestRateInput.value = '';
    resultDiv.innerHTML = '';
    repaymentBtn.checked = false;
    interestBtn.checked = false;
    errorMessageDiv.textContent = '';
    firstResultSection.classList.remove('hidden'); 
    secondResultSection.classList.add('hidden'); 
}

clear.addEventListener('click', clearForm);

// Ensure the second section is hidden on page load
window.onload = () => {
    secondResultSection.classList.add('hidden');
};
