window.addEventListener("load", solve);

function solve() {
    // Initial elements mapping
    let numberOfTicketsElement = document.getElementById('num-tickets');
    let seatingPreferenceElement = document.getElementById('seating-preference');
    let fullNameElement = document.getElementById('full-name');
    let emailElement = document.getElementById('email');
    let phoneNumberElement = document.getElementById('phone-number');
    let purchaseButtonElement = document.getElementById('purchase-btn');

    let previewElement = document.getElementById('ticket-preview');
    let purchaseElement = document.getElementById('ticket-purchase');
    let bottomElement = document.querySelector('.bottom-content');

    // Adding eventlistener to the "Purchase Tickets" button
    purchaseButtonElement.addEventListener('click', onPurchase);

    function onPurchase(e) {
        e.preventDefault();

        // If some of the fields is empty, it should not allow to submit

        if (numberOfTicketsElement.value == '' ||
            seatingPreferenceElement.value == '' ||
            fullNameElement.value == '' ||
            emailElement.value == '' ||
            phoneNumberElement.value == ''
        ) {
            return;
        }

        // Build elements to add into the UL for "ticket-preview"
        let liElement = document.createElement('li');
        liElement.setAttribute('class', 'ticket-purchase');

        let articleElement = document.createElement('article');

        let numberOfTickets = document.createElement('p');
        numberOfTickets.textContent = `Count: ${numberOfTicketsElement.value}`;

        let seatingPreference = document.createElement('p');
        seatingPreference.textContent = `Preference: ${seatingPreference.value}`;

        let fullName = document.createElement('p');
        fullName.textContent = `To: ${fullNameElement.value}`;

        let emailInput = document.createElement('p');
        emailInput.textContent = `Email: ${emailElement.value}`;

        let phoneNumberInput = document.createElement('p');
        phoneNumberInput.textContent = `Phone Number: ${phoneNumberElement.value}`;

        // Creating button container and the buttons "Edit" and "Next"
        let divButtonContainer = document.createElement('div');
        divButtonContainer.setAttribute('class', 'btn-container');

        let editButton = document.createElement('button');
        editButton.setAttribute('class', 'edit-btn');
        editButton.textContent = 'Edit';

        let nextButton = document.createElement('button');
        nextButton.setAttribute('class', 'next-btn');
        nextButton.textContent = 'Next';

        // Appending paragraphs to the article element
        articleElement.appendChild(numberOfTickets);
        articleElement.appendChild(seatingPreference);
        articleElement.appendChild(fullName);
        articleElement.appendChild(emailInput);
        articleElement.appendChild(phoneNumberInput);

        // Appending the buttons to the buttons-container
        divButtonContainer.appendChild(editButton);
        divButtonContainer.appendChild(nextButton);

        // Appending artile and buttons-container to the li element
        liElement.appendChild(articleElement);
        liElement.appendChild(divButtonContainer);

        // Appending li to the UL element
        previewElement.appendChild(liElement);

        // Saving the imput data for further use like Edit option
        let editedNumberofTickets = numberOfTicketsElement.value;
        let editedSeatingPreference = seatingPreferenceElement.value;
        let editedFullName = fullNameElement.value;
        let editedEmail = emailElement.value;
        let editedPhoneNumber = phoneNumberElement.value;

        // Clearing the input data
        numberOfTicketsElement.value = '';
        seatingPreferenceElement.value = '';
        fullNameElement.value = '';
        emailElement.value = '';
        phoneNumberElement.value = '';

        purchaseButtonElement.disabled = true;

        // When "Edit" button is clicked
        editButton.addEventListener('click', onEdit);

        function onEdit() {
            numberOfTicketsElement.value = editedNumberofTickets;
            seatingPreferenceElement.value = editedSeatingPreference;
            fullNameElement.value = editedFullName;
            emailElement.value = editedEmail;
            phoneNumberElement.value = editedPhoneNumber;

            liElement.remove();
            purchaseButtonElement.disabled = false;
        };

        // When "Next" button is clicked
        nextButton.addEventListener('click', onNext);

        function onNext() {
            // Build elements to add into the UL for "ticket-purchase"
            let liElementNext = document.createElement('li');
            liElementNext.setAttribute('class', 'ticket-purchase');

            let articleElementNext = document.createElement('article');
            articleElementNext = articleElement;

            let buyButton = document.createElement('button');
            buyButton.setAttribute('class', 'buy-btn');
            buyButton.textContent = 'Buy';

            // Appending article and buttons to the li element
            liElementNext.appendChild(articleElementNext);
            liElementNext.appendChild(buyButton);

            // Appending li-continue to the UL element
            purchaseElement.appendChild(liElementNext);

            liElement.remove();

            // When "Buy" button is clicked
            buyButton.addEventListener('click', onBuy);

            function onBuy() {
                liElementNext.remove();

                // Build elements to add into the UL for "bottomElement"
                let h2Element = document.createElement('h2');
                h2Element.textContent = "Thank you for your purchase!";

                let backButton = document.createElement('button');
                backButton.setAttribute('class', 'back-btn');
                backButton.textContent = 'Back';

                // Appending h2 and button elements
                bottomElement.appendChild(h2Element);
                bottomElement.appendChild(backButton);

                // When "Back" button is clicked

                backButton.addEventListener('click', onBack);

                function onBack() {
                    //h2Element.remove();
                    window.location.reload();
                    purchaseButtonElement.disabled = false;
                };
            }
        }

    }
}