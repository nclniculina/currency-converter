document.getElementById('convertBtn').addEventListener('click', async () => {
    const amount = parseFloat(document.getElementById('amount').value);
    const from = document.getElementById('fromCurrency').value;
    const to = document.getElementById('toCurrency').value;

    if (isNaN(amount)) {
        alert('Введите корректное число!');
        return;
    }

    try {
        // Получаем курсы всех валют относительно USD
        const response = await fetch('https://cdn.moneyconvert.net/api/latest.json');
        const data = await response.json();
        console.log('API data:', data);

        // Если базовая валюта сайта — не USD, пересчитываем в USD
        const rates = data.rates;
        
        // Если from и to — одно и то же
        if (from === to) {
            document.getElementById('result').textContent =
                `${amount} ${from} = ${amount.toFixed(2)} ${to}`;
            return;
        }

        // 1) Переводим введённую сумму в USD
        const amountInUSD = amount / rates[from];

        // 2) Потом USD в целевую валюту
        const result = amountInUSD * rates[to];

        const resultEl = document.getElementById('result');
        resultEl.textContent = `${amount} ${from} = ${result.toFixed(2)} ${to}`;
        resultEl.style.opacity = 1;
    } catch (error) {
        alert('Не удалось получить данные. Попробуйте позже 😕');
        console.error(error);
    }
});

