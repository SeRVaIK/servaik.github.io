new JustValidate('.js-form', {
  rules: {
    name: {
      required: true,
      minLenght: 2,
      maxLenght: 10
    },
    mail: {
      requared: true,
      email: true
    },
  },
});

$(document).ready(function() {
  $('button.btn-submit').on('click', function() {
    let nameValue = $('input#nameHtml').val();
    let emailValue = $('input#mailHtml').val();
    let textareaValue = $('textarea#commentHtml').val();

    // console.log(nameValue, emailValue, textareaValue);

    $.ajax({
      method: "POST",
      url: "./php/index.php",
      data: { name: nameValue, mail: emailValue, comment: textareaValue }
    })
      .done(function(  ) {
        // alert( "Data Saved: " + msg );
      });
    $('input#nameHtml').val('');
    $('input#mailHtml').val('');
    $('textarea#commentHtml').val('');

    async function getResponce() {
      let responce = await fetch('./php/index.php');
      let backData = await responce.json();
      console.log(backData);

      let list = document.querySelector('.comments');

      list.innerHTML += `
        <li class="col-xl-4 col-lg-5 col-md-5 col-sm-12 comments__card">
            <div class="comments__name">${backData.name}</div>
            <div class="comments__email">${backData.email}</div>
            <div class="comments__text">${backData.textarea}</div>
        </li>
      `

    }
    getResponce()
    

  })
});
