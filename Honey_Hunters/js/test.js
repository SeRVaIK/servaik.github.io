document.addEventListener("DOMContentLoaded", function() { // событие загрузки страницы

    // выбираем на странице все элементы типа textarea и input
    document.querySelectorAll('textarea, input').forEach(function(e) {
        // если данные значения уже записаны в sessionStorage, то вставляем их в поля формы
        // путём этого мы как раз берём данные из памяти браузера, если страница была случайно перезагружена
        if (e.value === '') e.value = window.sessionStorage.getItem(e.name, e.value);
        // на событие ввода данных (включая вставку с помощью мыши) вешаем обработчик
        e.addEventListener('input', function() {
            // и записываем в sessionStorage данные, в качестве имени используя атрибут name поля элемента ввода
            window.sessionStorage.setItem(e.name, e.value);
        })
    })

});

/*

let row = 0;

    function saveCardData(form) {



        console.log(form);

        // formData[row].push(
        //     form[0].value,
        //     form[1].value,
        //     form[2].value);

        // console.log(formData.length);
        // formData[row].length++;
        // console.log(formData.length);
        // console.log(formData);
        // row++;
        // console.log(row);
    }



*/