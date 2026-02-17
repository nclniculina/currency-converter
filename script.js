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
      const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`); 
      const data = await response.json();
       // const data = {
       //      result: amount * 90
       //  };
      console.log('Data from API:', data);

      if (!data || !data.result) {
         alert('API не вернул результат. Попробуйте позже.');
         return;
      }
      // показываем результат 
         const resultEl = document.getElementById('result');
         const result = data.rates[to]; // берём значение из rates
         resultEl.textContent = `${amount} ${from} = ${result.toFixed(2)} ${to}`;
         resultEl.style.opacity = 1; // плавное появление
         } catch (error) {
      alert('Ошибка при получении курса валют. Попробуйте позже.');
      console.error(error);
   }
});

