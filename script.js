// Event Listener für den Konvertieren-Button
document.getElementById('convertBtn').addEventListener('click', async () => {
    const amount = parseFloat(document.getElementById('amount').value);
    const from = document.getElementById('fromCurrency').value;
    const to = document.getElementById('toCurrency').value;

    // Prüfen, ob die Eingabe eine gültige Zahl ist
    if (isNaN(amount)) {
        alert('Введите корректное число!');
        return;
    }

    try {
        // Abrufen der aktuellen Wechselkurse aller Währungen relativ zu USD
        const response = await fetch('https://cdn.moneyconvert.net/api/latest.json');
        const data = await response.json();
        console.log('API data:', data);

        const rates = data.rates;
        
        // Prüfen, ob Ausgangs- und Zielwährung gleich sind
        if (from === to) {
            document.getElementById('result').textContent =
                `${amount} ${from} = ${amount.toFixed(2)} ${to}`;
            return;
        }

        // 1) Eingabebetrag in USD umrechnen
        const amountInUSD = amount / rates[from];

        // 2) USD in Zielwährung umrechnen
        const result = amountInUSD * rates[to];

        const resultEl = document.getElementById('result');
        resultEl.textContent = `${amount} ${from} = ${result.toFixed(2)} ${to}`;
        resultEl.style.opacity = 1;
    } catch (error) {
        // Fehlerbehandlung bei API-Problemen
        alert('Daten konnten nicht abgerufen werden. Bitte später erneut versuchen 😕');
        console.error(error);
    }
});
