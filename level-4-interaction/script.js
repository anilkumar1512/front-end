/* ============================================================
   Eventora - Event Ticket Booking System
   Level 4: Front-End Interaction (JavaScript)
   ------------------------------------------------------------
   - "Book Ticket" button: select / unselect toggle + redirect
   - Show / hide the event details + payment panel
   - Selecting an event in the form redirects back to the event
   - Booking form validation
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

    /* ------------------------------------------------------
       Helper: find the event card linked to an event name
       (each card's Book Ticket button carries a data-event value)
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

    /* Helper: smoothly reveal + briefly highlight an event card */
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
       Task 1: "Book Ticket" button (single selection)
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
       Task 2: Show / hide the event details + payment panel
       ------------------------------------------------------
       The panel (venue, time, price and the Book Ticket button)
       is hidden by default via the [hidden] attribute and is
       revealed / collapsed by the "View Details" toggle button. */
    document.querySelectorAll('.toggle-details').forEach(function (button) {
        button.addEventListener('click', function () {
            var details = document.getElementById(button.getAttribute('aria-controls'));
            if (!details) return;

            var willOpen = details.hidden;
            var label = button.querySelector('.toggle-text');

            details.hidden = !willOpen;
            if (label) label.textContent = willOpen ? 'Hide Details' : 'View Details';
            button.setAttribute('aria-expanded', String(willOpen));
        });
    });

    /* ------------------------------------------------------
       Task 3 & 4: Booking form validation
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

        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        function currentPrice() {
            var option = eventSelect.options[eventSelect.selectedIndex];
            return option && option.dataset.price ? Number(option.dataset.price) : 0;
        }

        updateSummary = function () {
            var tickets = Number(ticketsInput.value) || 0;

            if (eventSelect.value === '' || tickets < 1) {
                summary.hidden = true;
                return;
            }

            summary.hidden = false;
            summaryEvent.textContent = eventSelect.value;
            summaryTickets.textContent = tickets;
            summaryTotal.textContent = '\u20B9' + (tickets * currentPrice()).toLocaleString('en-IN');
        };

        function setError(input, message) {
            var errorEl = document.querySelector('[data-error-for="' + input.id + '"]');
            if (message) {
                input.classList.add('invalid');
                if (errorEl) errorEl.textContent = message;
            } else {
                input.classList.remove('invalid');
                if (errorEl) errorEl.textContent = '';
            }
        }

        function validateField(input) {
            var value = input.value.trim();

            if (input.id === 'name') {
                if (value === '') {
                    setError(input, 'Please enter your full name.');
                    return false;
                }
                if (value.length < 3) {
                    setError(input, 'Name must be at least 3 characters.');
                    return false;
                }
            }

            if (input.id === 'email') {
                if (value === '') {
                    setError(input, 'Please enter your email address.');
                    return false;
                }
                if (!emailPattern.test(value)) {
                    setError(input, 'Please enter a valid email address.');
                    return false;
                }
            }

            if (input.id === 'event') {
                if (value === '') {
                    setError(input, 'Please select an event.');
                    return false;
                }
            }

            if (input.id === 'tickets') {
                if (value === '') {
                    setError(input, 'Please enter the number of tickets.');
                    return false;
                }
                if (Number(value) < 1 || Number(value) > 10) {
                    setError(input, 'Tickets must be between 1 and 10.');
                    return false;
                }
            }

            setError(input, '');
            return true;
        }

        var fields = [nameInput, emailInput, eventSelect, ticketsInput];

        fields.forEach(function (field) {
            field.addEventListener('blur', function () {
                validateField(field);
            });
            field.addEventListener('input', function () {
                if (field.classList.contains('invalid')) {
                    validateField(field);
                }
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
                if (!validateField(field)) {
                    allValid = false;
                }
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

});
