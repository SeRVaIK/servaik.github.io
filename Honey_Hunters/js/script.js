// col-xl-4 col-lg-5 col-md-5 col-sm-12 

"use strict"

// Стандартная проверка того, что документ уже загружен
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();
        // let error = 0;
        let error = formValidate(form);

        let formData = new FormData(form);

        if (error === 0) {

            form.classList.add('_sending');

            let response = await fetch('./php/index.php', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                let result = await response.json();
                form.reset();
                form.classList.remove('_sending');
                getResponce();
            } else {
                alert("Ошибка в передаче данных!");
                form.classList.remove('_sending');
            }
        } else {
            alert('Заполните обязательные поля!')
            form.classList.remove('_sending');
        }
    }

    function formValidate(form) {

        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];

            formRemoveError(input);

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

    async function getResponce() {

        let responce = await fetch('./php/index.php');
        let backData = await responce.json();
        console.log(backData);

        let list = document.querySelector('.comments');

        list.innerHTML += `
            <li class="comments__card">
                <div class="comments__name">${backData.name}</div>
                <div class="comments__email">${backData.email}</div>
                <div class="comments__text">${backData.textarea}</div>
            </li>
        `
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