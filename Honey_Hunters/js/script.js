"use strict"

// Стандартная проверка того, что документ уже загружен
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);


        if (error === 0) {

            let cardCreation = document.querySelector('.cards__container');

            cardCreation.innerHTML += `
              <div class="card__column">
                  <div class="cards__body">
                      <div class="cards__title">${form[0].value}</div>
                      <div class="cards__email">${form[1].value}</div>
                      <div class="cards__text">${form[2].value}</div>
                  </div>
              </div>
            `
        } else {
            alert('Поля пустые, либо заполнены некорректно! Повторите ввод!')
        }
        form.reset();
    }

    // Функция валидации формы
    function formValidate(form) {

        // Счётчик ошибок - 0 по умолчанию
        let error = 0;
        // Слушаем поля с классом _req
        let formReq = document.querySelectorAll('._req');

        // Пробегаем по массиву обязательных полей
        for (let index = 0; index < formReq.length; index++) {
            // Собираем инпуты с обязательным заполнением 
            const input = formReq[index];

            // На всякий случай убираем класс _error
            formRemoveError(input);
            // Во имя борьмы с инъекциями экранируем спец-символы
            input.value = input.value
                .split('&').join('&amp;')
                .split('<').join('&lt;')
                .split('>').join('&gt;')
                .split('"').join('&quot;');

            // Валидация поля ввода эл.почты
            if (input.classList.contains('_email')) {

                if (emailTest(input)) {

                    formAddError(input);
                    error++;
                }
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;

    }



    function formAddError(input) {
        // Добавляем родительскому объекту класс error
        input.parentElement.classList.add('_error');
        // Добавляем самому объекту класс error
        input.classList.add('_error');
    }

    function formRemoveError(input) {
        // Удаляем с родителя объекта класс error
        input.parentElement.classList.remove('_error');
        // Удаляем с объекта класс error
        input.classList.remove('_error');
    }

    // Функция теста email
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }
});