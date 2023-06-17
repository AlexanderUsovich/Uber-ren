window.addEventListener('DOMContentLoaded', function() {
    
    const hamb = document.querySelector('.hamburger'),
          menu = document.querySelector('.menu__list'),
          links = document.querySelectorAll('.menu__link');
    let width = document.documentElement.clientWidth;

    hamb.addEventListener('click', () => {
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = document.documentElement.clientWidth - width + 'px';
        hamb.classList.toggle('hamburger_active');
        menu.classList.toggle('menu__list_active');
        if(!hamb.classList.contains('hamburger_active')){
            document.body.style.overflow = "";
            document.body.style.paddingRight = "0px";
        }
    });
    

    for(let link of links) {
        link.addEventListener('click', ()=> {
            document.body.style.overflow = "";
            document.body.style.paddingRight = 0;
            hamb.classList.remove('hamburger_active');
            menu.classList.remove('menu__list_active');
        })
    }
   
    $(window).scroll(function () {
        if ($(this).scrollTop() > 1600) {
            $('#pageup').fadeIn("slow");
        } else {
            $('#pageup').fadeOut("slow");
        }

        $('.choice__img').each(function () {
            var imagePos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow + 500) {
                $(this).addClass("animate__slideInLeft");
                $(this).css('visibility','visible');
            }
        });
    })

    $('[data-modal=cons]').on('click', function() {
        $('.overlay, #cons').fadeIn("slow");
    });

    $('.close').on('click', function() {
        $('.overlay, #cons, #thanks').fadeOut('slow');
    });
    // $('.btn_submit').on('click', function() {
    //     $('#cons').fadeOut('slow')
    //     $('#thanks').fadeIn('slow')
    // });

    //Закрытие модального окна нажатием на окружающее пространство
    $(window).on('click', function (e) {
        if (e.target.classList.contains('overlay')) {
            $('.overlay, #cons, #thanks').fadeOut('slow');
        }
    });

    //Закрытие модального окна нажатием на Esc
    $(document).keyup(function (e) {
        if (e.keyCode === 27) {   // esc
            $('.overlay, #cons, #thanks').fadeOut('slow');
        }
    });
     //Валидация форм
     function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true,
                    email: true,
                },
                phone: "required",
            },
            messages: {
                name: {
                    required: "Пожалуйста, укажите Ваше имя",
                    minlength: jQuery.validator.format("Введите не менее {0} символов!")
                },
                email: {
                    required: "Укажите Ваш email",
                    email: "Укажите правильный email",
                },
                phone: "Укажите Ваш номер телефона",
            }
        });
    }
    validateForms('#cons form');
    //Маска ввода
    $("input[name=phone]").mask("+375(99) 999-99-99");

     //Отправка форм
     $('form').submit(function(e) {
        e.preventDefault();
        if (!$(this).valid()){
            return;
        }
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#cons').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false;
    });

    jQuery.event.special.touchstart = {
        setup: function( _, ns, handle ) {
            this.addEventListener("touchstart", handle, { passive: !ns.includes("noPreventDefault") });
        }
    };

})
