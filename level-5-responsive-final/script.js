/* ============================================================
   Eventora - Event Ticket Booking System
   Level 5: Responsive Design & Final Touches (JavaScript)
   ------------------------------------------------------------
   - Responsive navigation toggle
   - Book Ticket button state change
   - Show / hide event details
   - Booking form validation + live order summary
   - Back-to-top button
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

    /* ------------------------------------------------------
       Responsive navigation toggle
       ------------------------------------------------------ */
    var navToggle = document.getElementById('nav-toggle');
    var primaryNav = document.getElementById('primary-nav');

    if (navToggle && primaryNav) {
        navToggle.addEventListener('click', function () {
            var isOpen = navToggle.classList.toggle('open');
            primaryNav.classList.toggle('open', isOpen);
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });

        primaryNav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navToggle.classList.remove('open');
                primaryNav.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ------------------------------------------------------
       Helpers: link an event name back to its card
       ------------------------------------------------------ */
    function findEventCard(name) {
        var card = null;
        document.querySelectorAll('.book-btn').forEach(function (btn) {
            if (btn.getAttribute('data-event') === name) {
                card = btn.closest('.event-card');
            }
        });
        return card;
    }

    function goToEventCard(name) {
        var card = findEventCard(name);
        if (!card) return;

        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.classList.add('highlight');

        window.clearTimeout(card._highlightTimer);
        card._highlightTimer = window.setTimeout(function () {
            card.classList.remove('highlight');
        }, 2000);
    }

    /* Helper: allow only ONE event to be selected at a time */
    function setSelectedCard(name) {
        document.querySelectorAll('.book-btn').forEach(function (btn) {
            var match = name !== null && btn.getAttribute('data-event') === name;
            btn.classList.toggle('is-booked', match);
            btn.textContent = match ? 'Selected \u2713' : 'Book Ticket';
        });
    }

    /* ------------------------------------------------------
       Book Ticket button (single selection)
       - click an event   -> select it (others are cleared) + redirect
       - click it again   -> unselect it
       ------------------------------------------------------ */
    document.querySelectorAll('.book-btn').forEach(function (button) {
        button.addEventListener('click', function () {
            var eventName = button.getAttribute('data-event');
            var select = document.getElementById('event');
            var alreadySelected = button.classList.contains('is-booked');

            if (alreadySelected) {
                setSelectedCard(null);
                if (select) {
                    select.value = '';
                    updateSummary();
                }
                return; /* unselected: nothing else to do */
            }

            setSelectedCard(eventName);
            if (select) {
                select.value = eventName;
                updateSummary();
            }

            var bookingSection = document.getElementById('booking');
            if (bookingSection) {
                bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ------------------------------------------------------
       Show / hide event details
       ------------------------------------------------------ */
    document.querySelectorAll('.toggle-details').forEach(function (button) {
        button.addEventListener('click', function () {
            var details = button.closest('.event-card').querySelector('.card-details');
            var isOpen = !details.hidden;

            details.hidden = isOpen;
            button.textContent = isOpen ? 'View Details' : 'Hide Details';
            button.setAttribute('aria-expanded', String(!isOpen));
        });
    });

    /* ------------------------------------------------------
       Booking form: validation + live order summary
       ------------------------------------------------------ */
    var form = document.getElementById('booking-form');
    var updateSummary = function () {}; /* replaced once the form exists */

    if (form) {
        var nameInput = document.getElementById('name');
        var emailInput = document.getElementById('email');
        var eventSelect = document.getElementById('event');
        var ticketsInput = document.getElementById('tickets');
        var formMessage = document.getElementById('form-message');

        var summary = document.getElementById('order-summary');
        var summaryEvent = document.getElementById('summary-event');
        var summaryTickets = document.getElementById('summary-tickets');
        var summaryTotal = document.getElementById('summary-total');

        var fields = [nameInput, emailInput, eventSelect, ticketsInput];
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        function setError(input, message) {
            var errorEl = document.querySelector('[data-error-for="' + input.id + '"]');
            input.classList.toggle('invalid', Boolean(message));
            if (errorEl) errorEl.textContent = message || '';
        }

        function validateField(input) {
            var value = input.value.trim();

            if (input.id === 'name') {
                if (value === '') return setError(input, 'Please enter your full name.'), false;
                if (value.length < 3) return setError(input, 'Name must be at least 3 characters.'), false;
            }

            if (input.id === 'email') {
                if (value === '') return setError(input, 'Please enter your email address.'), false;
                if (!emailPattern.test(value)) return setError(input, 'Please enter a valid email address.'), false;
            }

            if (input.id === 'event' && value === '') {
                return setError(input, 'Please select an event.'), false;
            }

            if (input.id === 'tickets') {
                if (value === '') return setError(input, 'Please enter the number of tickets.'), false;
                if (Number(value) < 1 || Number(value) > 10) {
                    return setError(input, 'Tickets must be between 1 and 10.'), false;
                }
            }

            setError(input, '');
            return true;
        }

        function currentPrice() {
            var option = eventSelect.options[eventSelect.selectedIndex];
            return option && option.dataset.price ? Number(option.dataset.price) : 0;
        }

        updateSummary = function () {
            var hasEvent = eventSelect.value !== '';
            var tickets = Number(ticketsInput.value) || 0;
            var price = currentPrice();

            if (!hasEvent || tickets < 1) {
                summary.hidden = true;
                return;
            }

            summary.hidden = false;
            summaryEvent.textContent = eventSelect.value;
            summaryTickets.textContent = tickets;
            summaryTotal.textContent = '\u20B9' + (tickets * price).toLocaleString('en-IN');
        };

        fields.forEach(function (field) {
            field.addEventListener('blur', function () { validateField(field); });
            field.addEventListener('input', function () {
                if (field.classList.contains('invalid')) validateField(field);
                updateSummary();
            });
            field.addEventListener('change', updateSummary);
        });

        /* Selecting an event in the form jumps back to its card
           and keeps the card selection in sync (one at a time) */
        eventSelect.addEventListener('change', function () {
            setSelectedCard(eventSelect.value || null);
            if (eventSelect.value !== '') {
                goToEventCard(eventSelect.value);
            }
        });

        form.addEventListener('submit', function (event) {
            event.preventDefault();

            var allValid = true;
            fields.forEach(function (field) {
                if (!validateField(field)) allValid = false;
            });

            if (!allValid) {
                formMessage.textContent = 'Please fix the highlighted fields.';
                formMessage.className = 'form-message error';
                return;
            }

            var tickets = Number(ticketsInput.value);
            var total = tickets * currentPrice();

            formMessage.textContent = 'Booking confirmed for ' + nameInput.value.trim() +
                ' \u2014 ' + tickets + ' ticket(s) to "' + eventSelect.value +
                '". Total: \u20B9' + total.toLocaleString('en-IN');
            formMessage.className = 'form-message success';

            form.reset();
            summary.hidden = true;
            setSelectedCard(null);
        });
    }

    /* ------------------------------------------------------
       Back-to-top button
       ------------------------------------------------------ */
    var backToTop = document.getElementById('back-to-top');

    if (backToTop) {
        window.addEventListener('scroll', function () {
            backToTop.classList.toggle('show', window.scrollY > 500);
        });

        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

});
