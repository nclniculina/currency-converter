// Находим кнопку по id и вешаем событие click
document.getElementById('convertBtn').addEventListener('click', async () => {
   // берём значения из полей
   const amount = parseFloat(document.getElementById('amount').value);
   const from = document.getElementById('fromCurrency').value;
   const to = document.getElementById('toCurrency').value;

   // проверка на корректное число 
   if (isNaN(amount)) {
      alert('Введите число!');
      return;
   }

   try {
      // делаем запрос к бесплатному API
      const response = await fetch(`https://free.ratesdb.com/v1/rates?from=${from}&to=${to}`);
      const data = await response.json();
      console.log('Data from API:', data); // для отладки

      const rate = data.data.rates[to];
        if (!rate) {
            alert('Не удалось получить курс для выбранных валют');
            return;
        }
      
      // показываем результат 
         const result = amount * rate;
         const resultEl = document.getElementById('result');
         resultEl.textContent = `${amount} ${from} = ${result.toFixed(2)} ${to}`;
         resultEl.style.opacity = 1; // плавное появление
         
        } catch (error) {
                alert('Ошибка при получении курса валют. Попробуйте позже.');
                console.error(error);
   }
});

