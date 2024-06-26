window.addEventListener('load', solution);

function solution() {
  // Initial element mapping
  let employeeElement = document.getElementById('employee');
  let categoryElement = document.getElementById('category');
  let urgencyElement = document.getElementById('urgency');
  let teamElement = document.getElementById('team');
  let descriptionElement = document.getElementById('description');
  let addButtonElement = document.getElementById('add-btn');

  let previewElement = document.querySelector('.preview-list');
  let pendingElement = document.querySelector('.pending-list');
  let resolvedElement = document.querySelector('.resolved-list');

  addButtonElement.addEventListener('click', onNext);

  function onNext(e) {
    e.preventDefault();

    // If some of the fields is empty, it should not allow to submit
    if (employeeElement.value == '' ||
      categoryElement.value == '' ||
      urgencyElement.value == '' ||
      teamElement.value == '' ||
      descriptionElement.value == ''
    ) {
      return;
    }

    // Build elements to add into the UL for "preview-list"
    let liElement = document.createElement('li');
    liElement.setAttribute('class', 'problem-content');

    let articleElement = document.createElement('article');

    let fromParagraph = document.createElement('p');
    fromParagraph.textContent = `From: ${employeeElement.value}`;

    let categoryParagraph = document.createElement('p');
    categoryParagraph.textContent = `Category: ${categoryElement.value}`;

    let urgencyParagraph = document.createElement('p');
    urgencyParagraph.textContent = `Urgency: ${urgencyElement.value}`;

    let assignedParagraph = document.createElement('p');
    assignedParagraph.textContent = `Assigned to: ${teamElement.value}`;

    let descriptionParagraph = document.createElement('p');
    descriptionParagraph.textContent = `Description: ${descriptionElement.value}`;

    let editButton = document.createElement('button');
    editButton.setAttribute('class', 'edit-btn');
    editButton.textContent = 'Edit';

    let continueButton = document.createElement('button');
    continueButton.setAttribute('class', 'continue-btn');
    continueButton.textContent = 'Continue';

    // Appending paragraphs to the article element
    articleElement.appendChild(fromParagraph);
    articleElement.appendChild(categoryParagraph);
    articleElement.appendChild(urgencyParagraph);
    articleElement.appendChild(assignedParagraph);
    articleElement.appendChild(descriptionParagraph);

    // Appending article and buttons to the li element
    liElement.appendChild(articleElement);
    liElement.appendChild(editButton);
    liElement.appendChild(continueButton);

    // Appending li to the UL element
    previewElement.appendChild(liElement);

    // Saving the imput data for further use like Edit option
    let editedEmployee = employeeElement.value;
    let editedCategory = categoryElement.value;
    let editedUrgency = urgencyElement.value;
    let editedAssigned = teamElement.value;
    let editedDescription = descriptionElement.value;

    // Clearing the input data
    employeeElement.value = '';
    categoryElement.value = '';
    urgencyElement.value = '';
    teamElement.value = '';
    descriptionElement.value = '';

    addButtonElement.disabled = true;

    // When "Edit" button is clicked
    editButton.addEventListener('click', onEdit);

    function onEdit() {
      employeeElement.value = editedEmployee;
      categoryElement.value = editedCategory;
      urgencyElement.value = editedUrgency;
      teamElement.value = editedAssigned;
      descriptionElement.value = editedDescription;

      liElement.remove();
      addButtonElement.disabled = false;
    };

    // When "Continue" button is clicked
    continueButton.addEventListener('click', onContinue);

    function onContinue() {
      // Build elements to add into the UL for "pending-list"
      let liElementContinue = document.createElement('li');
      liElementContinue.setAttribute('class', 'problem-content');

      let articleElementContinue = document.createElement('article');
      articleElementContinue = articleElement;

      let resolvedButton = document.createElement('button');
      resolvedButton.setAttribute('class', 'resolve-btn');
      resolvedButton.textContent = 'Resolved';

      // Appending article and buttons to the li element
      liElementContinue.appendChild(articleElementContinue);
      liElementContinue.appendChild(resolvedButton);

      // Appending li-continue to the UL element
      pendingElement.appendChild(liElementContinue);

      liElement.remove();

      // When "Resolved" button is clicked
      resolvedButton.addEventListener('click', onResolved);

      function onResolved() {
        // Build elements to add into the UL for "resolved-list"
        let liElementResolved = document.createElement('li');
        liElementResolved.setAttribute('class', 'problem-content');

        let articleElementResolved = document.createElement('article');
        articleElementResolved = articleElementContinue;

        let clearButton = document.createElement('button');
        clearButton.setAttribute('class', 'clear-btn');
        clearButton.textContent = 'Clear';

        // Appending article and buttons to the li element
        liElementResolved.appendChild(articleElementResolved);
        liElementResolved.appendChild(clearButton);

        // Appending li-resolved to the UL element
        resolvedElement.appendChild(liElementResolved);

        liElementContinue.remove();

        // When "Clear" button is clicked

        clearButton.addEventListener('click', onClear);

        function onClear() {
          liElementResolved.remove();
        };
      }
    };
  };
}




