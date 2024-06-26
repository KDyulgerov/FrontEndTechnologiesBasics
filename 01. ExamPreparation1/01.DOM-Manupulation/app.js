window.addEventListener("load", solve);

function solve() {
  // Initial elements mapping
  let snowmanNameElement = document.getElementById('snowman-name');
  let snowmanHeightElement = document.getElementById('snowman-height');
  let locationElement = document.getElementById('location');
  let creatorNameElement = document.getElementById('creator-name');
  let specialAttributeElement = document.getElementById('special-attribute');
  let addButtonElement = document.querySelector('.add-btn');

  let previewElement = document.querySelector('.snowman-preview');
  let yourSnowmanElement = document.querySelector('.snow-list');
  let hiddenImage = document.getElementById('back-img');

  let main = document.getElementById('hero');
  let bodyElement = document.querySelector('.body');

  // Adding eventlistener to the "Add" button
  addButtonElement.addEventListener('click', onAdd);

  function onAdd(e) {
    e.preventDefault();

    // If some of the fields is empty, it should not allow to submit

    if (snowmanNameElement.value == '' ||
      snowmanHeightElement.value == '' ||
      locationElement.value == '' ||
      creatorNameElement.value == '' ||
      specialAttributeElement.value == ''
    ) {
      return;
    }

    // Build elements to add into the UL for "snowman-preview"
    let liElement = document.createElement('li');
    liElement.setAttribute('class', 'snowman-info');

    let articleElement = document.createElement('article');

    let nameInput = document.createElement('p');
    nameInput.textContent = `Name: ${snowmanNameElement.value}`;

    let heightInput = document.createElement('p');
    heightInput.textContent = `Height: ${snowmanHeightElement.value}`;

    let locationInput = document.createElement('p');
    locationInput.textContent = `Location: ${locationElement.value}`;

    let creatorNameInput = document.createElement('p');
    creatorNameInput.textContent = `Creator: ${creatorNameElement.value}`;

    let attributeInput = document.createElement('p');
    attributeInput.textContent = `Attribute: ${specialAttributeElement.value}`;

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
    articleElement.appendChild(nameInput);
    articleElement.appendChild(heightInput);
    articleElement.appendChild(locationInput);
    articleElement.appendChild(creatorNameInput);
    articleElement.appendChild(attributeInput);

    // Appending the buttons to the buttons-container
    divButtonContainer.appendChild(editButton);
    divButtonContainer.appendChild(nextButton);

    // Appending artile and buttons-container to the li element
    liElement.appendChild(articleElement);
    liElement.appendChild(divButtonContainer);

    // Appending li to the UL element
    previewElement.appendChild(liElement);

    // Saving the imput data for further use like Edit option
    let editedName = snowmanNameElement.value;
    let editedHeight = snowmanHeightElement.value;
    let editedLocation = locationElement.value;
    let editedCreatorName = creatorNameElement.value;
    let editedAttribute = specialAttributeElement.value;

    // Clearing the input data
    snowmanNameElement.value = '';
    snowmanHeightElement.value = '';
    locationElement.value = '';
    creatorNameElement.value = '';
    specialAttributeElement.value = '';

    addButtonElement.disabled = true;

    // When "Edit" button is clicked
    editButton.addEventListener('click', onEdit);

    function onEdit() {
      snowmanNameElement.value = editedName;
      snowmanHeightElement.value = editedHeight;
      locationElement.value = editedLocation;
      creatorNameElement.value = editedCreatorName;
      specialAttributeElement.value = editedAttribute;

      liElement.remove();
      addButtonElement.disabled = false;
    };

    // When "Continue" button is clicked
    nextButton.addEventListener('click', onNext);

    function onNext() {
      // Build elements to add into the UL for "snow-list"
      let liElementNext = document.createElement('li');
      liElementNext.setAttribute('class', 'snowman-content');

      let articleElementNext = document.createElement('article');
      articleElementNext = articleElement;

      // Creating a "Send" button
      let sendButton = document.createElement('button');
      sendButton.setAttribute('class', 'send-btn');
      sendButton.textContent = 'Send';

      // Appending artile and button to the li element Next
      liElementNext.appendChild(articleElementNext);
      liElementNext.appendChild(sendButton);

       // Appending li-next to the UL element
      yourSnowmanElement.appendChild(liElementNext);
      liElement.remove();

      // When "Send" button is clicked
      sendButton.addEventListener('click', onSend);

      function onSend() {
        main.remove();
        
        // Creating a "Back" butoon
        let backButton = document.createElement('button');
        backButton.setAttribute('class', 'back-btn');
        backButton.textContent = 'Back';

        // Showing the hidden image
        hiddenImage.hidden = false;

        // Appending the button to the body
        bodyElement.appendChild(backButton);

        // When "Back" button is clicked
        backButton.addEventListener('click', onBack);

        function onBack() {
          window.location.reload();
        }
      }
    }
  }
}
