const amountInput = document.getElementById('amount');
const fromSelect = document.getElementById('from-currency');
const toSelect = document.getElementById('to-currency');
const convertBtn = document.getElementById('convert-btn');
const resultDiv = document.getElementById('result-div');
const resultValue = document.getElementById('converted-value');
const rateText = document.getElementById('rate-text');

async function fetchRates(base) {
    try {
        const response = await fetch(`/api/rates/${base}`);
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        return data.rates;
    } catch (error) {
        console.error("Error fetching rates:", error);
        alert("Failed to fetch exchange rates.");
        return null;
    }
}

async function updateConversion() {
    const amount = parseFloat(amountInput.value);
    if (isNaN(amount)) return;

    const from = fromSelect.value;
    const to = toSelect.value;

    convertBtn.textContent = "Converting...";
    convertBtn.disabled = true;

    const rates = await fetchRates(from);
    if (rates) {
        const rate = rates[to];
        const converted = (amount * rate).toFixed(2);
        
        resultValue.textContent = `${converted} ${to}`;
        rateText.textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;
        resultDiv.style.display = 'block';
    }

    convertBtn.textContent = "Convert Currency";
    convertBtn.disabled = false;
}

convertBtn.addEventListener('click', updateConversion);

// Initial conversion
window.addEventListener('DOMContentLoaded', updateConversion);
