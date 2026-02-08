$(document).ready(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('header').addClass('scrolled');
        } else {
            $('header').removeClass('scrolled');
        }
    });

    $('a[href^="#"]').on('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = $(href);
        
        if (target.length && target.is('section')) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 1000);
            
            $('.navbar-collapse').collapse('hide');
        }
    });

    function animateCounter() {
        $('.stat-number').each(function() {
            const $this = $(this);
            const countTo = $this.data('target');
            
            $({ countNum: 0 }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(countTo + '+');
                }
            });
        });
    }

    let statsAnimated = false;
    $(window).on('scroll', function() {
        if (!statsAnimated) {
            const statsSection = $('#statistiques');
            if (statsSection.length) {
                const scrollTop = $(window).scrollTop();
                const elementOffset = statsSection.offset().top;
                const windowHeight = $(window).height();
                
                if ((elementOffset - scrollTop) < windowHeight) {
                    animateCounter();
                    statsAnimated = true;
                }
            }
        }
    });

    const heroCarousel = new bootstrap.Carousel(document.getElementById('heroCarousel'), {
        interval: 5000,
        wrap: true,
        pause: 'hover'
    });

    $('.formation-card').hover(
        function() {
            $(this).addClass('animate__animated animate__pulse');
        },
        function() {
            $(this).removeClass('animate__animated animate__pulse');
        }
    );

    const testimonialsCarousel = new bootstrap.Carousel(document.getElementById('testimonialsCarousel'), {
        interval: 7000,
        wrap: true,
        pause: 'hover'
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
    });

    $('.back-to-top').click(function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 1000);
    });

    $(window).on('scroll', function() {
        const scroll = $(window).scrollTop();
        $('.hero-icon').css('transform', 'translateY(' + (scroll * 0.3) + 'px)');
    });

    $('#formationTabs button').on('click', function() {
        const tabContent = $($(this).data('bs-target'));
        
        tabContent.find('.formation-card').each(function(index) {
            $(this).css('animation-delay', (index * 0.1) + 's');
            $(this).addClass('animate__animated animate__fadeInUp');
        });
    });

    $('.feature-card').hover(
        function() {
            $(this).find('.feature-icon').addClass('animate__animated animate__rubberBand');
        },
        function() {
            $(this).find('.feature-icon').removeClass('animate__animated animate__rubberBand');
        }
    );

    $('.partner-card').hover(
        function() {
            $(this).find('.partner-icon').addClass('animate__animated animate__bounce');
        },
        function() {
            $(this).find('.partner-icon').removeClass('animate__animated animate__bounce');
        }
    );

    $('.certification-card').hover(
        function() {
            $(this).find('i').addClass('animate__animated animate__rotateIn');
        },
        function() {
            $(this).find('i').removeClass('animate__animated animate__rotateIn');
        }
    );

    $('.navbar-nav .nav-link').on('click', function() {
        if ($(window).width() < 992) {
            $('.navbar-collapse').collapse('hide');
        }
    });

    $(window).on('load', function() {
        $('body').addClass('loaded');
    });

    $('#heroCarousel').on('slide.bs.carousel', function(e) {
        $(e.relatedTarget).find('h1').addClass('animate__animated animate__fadeInUp');
        $(e.relatedTarget).find('p').addClass('animate__animated animate__fadeInUp');
        $(e.relatedTarget).find('.hero-buttons').addClass('animate__animated animate__fadeInUp');
        $(e.relatedTarget).find('.hero-image').addClass('animate__animated animate__fadeInRight');
    });

  

    $('form').on('submit', function(e) {
        e.preventDefault();
        const form = $(this);
        alert('Merci pour votre message! Nous vous contacterons bientôt.');
        form[0].reset();
    });

    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function(popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.loading').forEach(el => {
        observer.observe(el);
    });

    $(document).on('keydown', function(e) {
        if (e.key === 'Tab') {
            $('body').addClass('user-is-tabbing');
        }
    });

    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            $('#heroCarousel').carousel('pause');
            $('#testimonialsCarousel').carousel('pause');
        } else {
            $('#heroCarousel').carousel('cycle');
            $('#testimonialsCarousel').carousel('cycle');
        }
    });

});
