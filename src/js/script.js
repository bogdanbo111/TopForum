$(document).ready(function(){

    //Header Menu

    $('.menu__item_link').on('mouseenter',  function () {
        $(this).closest('div.menu').find('div.sub-menu').removeClass('sub-menu__active');
        $(this).next().addClass('sub-menu__active');
    });
    $('.menu__item').on('mouseleave',  function () {
        $(this).closest('div.menu').find('div.sub-menu').removeClass('sub-menu__active');
    });


    //Subheader

    $('.button_subheader').on('click', function () {
       document.location = './register.html'
    });
    function toogleButton(item) {
        $(item).on('click',  function () {
            $(this).addClass('button-active').siblings().removeClass('button-active')
        });
    }
    toogleButton('.button_package');
    toogleButton('.button_mini');


    //Select

    const fieldSelect = document.querySelectorAll('.register__field_sel'),
        contentSponsors = document.querySelectorAll('.content__sponsors');


    fieldSelect.forEach(item => {
        item.addEventListener('change', function () {
            contentSponsors.forEach(cont => {
                cont.classList.remove('content__sponsors_active');
            });
            let index = this.options[this.selectedIndex].index;
            contentSponsors[index].classList.add('content__sponsors_active');
        });
    });


    function sponsorsTab() {
        return $('div.sponsors__detail').on('click',  function() {
            let elink = $(this).closest('div.menu__item').find('.menu__item_link').attr('href');
            let currentLocation = window.location.pathname;
            if (currentLocation != '/' + elink) {
                document.location = './sponsors.html'
            }
        });
    }
   sponsorsTab();


    // Media.html

    function moreArticles() {
        $('.more').on('click', function () {
            $(this).closest('div.content__sponsors').find('div.d-none').slideDown('fast');
            $(this).hide().closest('div.sponsors__item_btn').next().find('.less').show();
        })
    }
    moreArticles();

    function lessArticles() {
        $('.less').on('click', function () {
            $(this).closest('div.content__sponsors').find('div.toogle').slideUp('fast');
            $(this).hide().closest('div.sponsors__item_btn').prev().find('.more').show();
        })
    }
    lessArticles();

    
    //events.html

    function moreText() {
        $('.button_learn-event')
            .toggle(function () {
                    $(this).text('Show less').closest('div.event__item_descr').find('div.event__item_text')
                        .css({height: "110%"});
                },
                function () {
                    $(this).text('Learn more').closest('div.event__item_descr').find('div.event__item_text')
                        .css({height: '103px'});
                });
    }
    moreText();

    function learnMore() {
        $('.button_learn').on('click', function () {
            let a = $(this).text();
             a == 'Learn more' ? $(this).text('Show less') : $(this).text('Learn more');
            $('.overlay__card').toggleClass('d-block');
            $(this).closest('.sponsors__item').toggleClass('big');
            let span = $(this).closest('.sponsors__item').find('span');
            span.hasClass('sponsors__item_span') ? span.removeClass('sponsors__item_span') :
                span.addClass('sponsors__item_span');

        })
    }
    learnMore();


    // Modal

    $('.call_modal').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
        $(this).closest('div.hamburger-menu').fadeOut('slow');
    });

    $('.modal__close').on('click', function() {
        $('.overlay, #consultation').fadeOut('slow').find("input").val("")
            .css({'border': '1px solid #e8d8b6'});
        $('.overlay, #consultation').find('label.error').css('display', 'none');
    });

    function modal() {
        $('.input').on('change', function () {
            let btn = $(this).closest('.modal__form').find('.button_subscribe');
            $(this).val() == "" ? btn.prop('disabled', true) : btn.prop('disabled', false);
        })

    }

    modal();

    //Forms

    function validateForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                company: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Please, enter your name",
                    minlength: jQuery.validator.format("Enter min {2} symbols!")
                  },
                company: "Please, enter your company name",
                email: {
                  required: "Please, enter your email",
                  email: "Email is incorrect"
                }
            }
        });
    }

    validateForms('.register__block');
    validateForms('.modal__form');

    $('input[name=tel]').mask("+7 (999) 999-99-99");

    $('#checkbox').click(function () {
        if (this.checked != true) {
            $(this).closest('div.register__field').find('.button_register').prop('disabled', true);
        } else {
            $(this).closest('div.register__field').find('.button_register').prop('disabled', false).addClass('button-active');
        }
    });

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
        });
        $(this).find("input.register__field_select").val("");
        return false;
    });

    // Smooth scroll and pageup

    $(window).scroll(function() {
        if ($(this).scrollTop() > 600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href=#up]").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    new WOW().init();
});



