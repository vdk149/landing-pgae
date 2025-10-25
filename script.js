$(document).ready(function() {
    
    // Smooth scrolling for navigation links
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if(target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70
            }, 1000);
        }
    });

    // Navbar background on scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('shadow-sm');
        } else {
            $('.navbar').removeClass('shadow-sm');
        }
    });

    // Form validation and submission
    $('#signupForm').on('submit', function(e) {
        e.preventDefault();
        
        // Remove previous validation states
        $(this).removeClass('was-validated');
        
        // Check form validity
        if (this.checkValidity() === false) {
            e.stopPropagation();
            $(this).addClass('was-validated');
            return;
        }

        // Get form data
        var formData = {
            fullName: $('#fullName').val(),
            email: $('#email').val(),
            phone: $('#phone').val(),
            company: $('#company').val(),
            package: $('#package').val()
        };

        // Add loading state to button
        var submitBtn = $(this).find('button[type="submit"]');
        var originalText = submitBtn.html();
        submitBtn.prop('disabled', true);
        submitBtn.html('<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Đang xử lý...');

        // Simulate API call (replace with actual API endpoint)
        setTimeout(function() {
            // Log form data to console
            console.log('Form Data:', formData);
            
            // Show success message
            $('#successMessage').removeClass('d-none').hide().fadeIn();
            
            // Reset form
            $('#signupForm')[0].reset();
            $('#signupForm').removeClass('was-validated');
            
            // Reset button
            submitBtn.prop('disabled', false);
            submitBtn.html(originalText);
            
            // Hide success message after 5 seconds
            setTimeout(function() {
                $('#successMessage').fadeOut(function() {
                    $(this).addClass('d-none');
                });
            }, 5000);
            
            // Optional: Send data to Google Sheets or your backend
            // You can uncomment and modify this section
            /*
            $.ajax({
                url: 'YOUR_BACKEND_URL_HERE',
                method: 'POST',
                data: JSON.stringify(formData),
                contentType: 'application/json',
                success: function(response) {
                    console.log('Success:', response);
                },
                error: function(error) {
                    console.error('Error:', error);
                }
            });
            */
            
        }, 2000);
    });

    // Phone number formatting
    $('#phone').on('input', function() {
        var value = $(this).val().replace(/\D/g, '');
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        $(this).val(value);
    });

    // Email validation
    $('#email').on('blur', function() {
        var email = $(this).val();
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email && !emailRegex.test(email)) {
            $(this).addClass('is-invalid');
        } else {
            $(this).removeClass('is-invalid');
        }
    });

    // Newsletter form submission
    $('.newsletter-form').on('submit', function(e) {
        e.preventDefault();
        var emailInput = $(this).find('input[type="email"]');
        var email = emailInput.val();
        
        if (email) {
            // Show success message
            alert('Cảm ơn bạn đã đăng ký nhận tin! Chúng tôi sẽ gửi thông tin mới nhất đến email: ' + email);
            emailInput.val('');
        }
    });

    // Animate elements on scroll
    function animateOnScroll() {
        $('.feature-card, .pricing-card, .testimonial-card').each(function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).css({
                    'opacity': '1',
                    'transform': 'translateY(0)'
                });
            }
        });
    }

    // Initialize elements with animation
    $('.feature-card, .pricing-card, .testimonial-card').css({
        'opacity': '0',
        'transform': 'translateY(30px)',
        'transition': 'all 0.6s ease'
    });

    // Trigger animation on scroll
    $(window).on('scroll', animateOnScroll);
    
    // Trigger animation on page load
    animateOnScroll();

    // Pricing card click to scroll to signup
    $('.pricing-card .btn').on('click', function(e) {
        e.preventDefault();
        var packageValue = $(this).closest('.pricing-card').find('.pricing-header h4').text().trim();
        
        // Scroll to signup form
        $('html, body').animate({
            scrollTop: $('#signup').offset().top - 70
        }, 1000);
        
        // Pre-select the package after scrolling
        setTimeout(function() {
            var selectBox = $('#package');
            if (packageValue.includes('Cơ Bản')) {
                selectBox.val('basic');
            } else if (packageValue.includes('Chuyên Nghiệp')) {
                selectBox.val('pro');
            } else if (packageValue.includes('Doanh Nghiệp')) {
                selectBox.val('enterprise');
            }
            selectBox.focus();
        }, 1000);
    });

    // Add bounce effect to hero buttons on hover
    $('.hero-buttons .btn').hover(
        function() {
            $(this).addClass('animate__animated animate__pulse');
        },
        function() {
            $(this).removeClass('animate__animated animate__pulse');
        }
    );

    // Counter animation for hero stats
    function animateCounter() {
        $('.hero-stats h3').each(function() {
            var $this = $(this);
            var countTo = $this.text();
            
            // Only animate numbers
            if (countTo.includes('K+')) {
                var number = parseInt(countTo.replace(/[^0-9]/g, ''));
                $({ countNum: 0 }).animate({
                    countNum: number
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.floor(this.countNum) + 'K+');
                    },
                    complete: function() {
                        $this.text(this.countNum + 'K+');
                    }
                });
            } else if (countTo.includes('★')) {
                var rating = parseFloat(countTo.replace('★', ''));
                $({ countNum: 0 }).animate({
                    countNum: rating
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        $this.text(this.countNum.toFixed(1) + '★');
                    },
                    complete: function() {
                        $this.text(this.countNum.toFixed(1) + '★');
                    }
                });
            }
        });
    }

    // Trigger counter animation once when hero section is visible
    var counterAnimated = false;
    $(window).on('scroll', function() {
        if (!counterAnimated) {
            var heroStatsTop = $('.hero-stats').offset().top;
            var viewportBottom = $(window).scrollTop() + $(window).height();
            
            if (viewportBottom > heroStatsTop) {
                animateCounter();
                counterAnimated = true;
            }
        }
    });

    // Trigger on page load if hero is already visible
    if ($(window).scrollTop() === 0) {
        setTimeout(animateCounter, 500);
    }

    // Add active class to navigation on scroll
    $(window).on('scroll', function() {
        var scrollPos = $(document).scrollTop() + 100;
        
        $('.navbar-nav a[href^="#"]').each(function() {
            var currLink = $(this);
            var refElement = $(currLink.attr('href'));
            
            if (refElement.length && refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('.navbar-nav a').removeClass('active');
                currLink.addClass('active');
            } else {
                currLink.removeClass('active');
            }
        });
    });

    // Parallax effect for hero section
    $(window).scroll(function() {
        var scrolled = $(window).scrollTop();
        $('.hero-image img').css('transform', 'translateY(' + (scrolled * 0.3) + 'px)');
    });

    // Console welcome message
    console.log('%c🚀 Welcome to our Landing Page!', 'font-size: 20px; color: #667eea; font-weight: bold;');
    console.log('%cBuilt with ❤️ using HTML, CSS, Bootstrap & jQuery', 'font-size: 14px; color: #764ba2;');

});

// Add loading animation when page loads
$(window).on('load', function() {
    $('body').css('opacity', '0').animate({ opacity: 1 }, 500);
});