function showModal() {
    document.getElementById('card-body').style.display = 'block';
    // Clear form fields
    document.getElementById('crud-form').reset();
    // Set the submit button action to 'Add'
    document.getElementById('submit-btn').onclick = function() {
        return validateForm();
    };
}

function hideModal() {
    document.getElementById('card-body').style.display = 'none';
}

function validateForm() {
    const form = document.getElementById('crud-form');
    if (!form.checkValidity()) {
        // If any input is invalid, show an alert
        swal("Validation Error!", "Please fill in all required fields.", "error");
        return false; // Prevent form submission
    }

    // Gather form data
    const designation = document.getElementById('Priority1').value;
    const id = document.getElementById('Priority2').value;
    const fullName = document.getElementById('Priority3').value;
    const email = document.getElementById('Priority4').value;

    // Check if the form is in 'Edit' mode
    if (document.getElementById('submit-btn').getAttribute('data-edit') === 'true') {
        // Update existing row
        const rowIndex = document.getElementById('submit-btn').getAttribute('data-row-index');
        const tableBody = document.getElementById('tabledata');
        const row = tableBody.rows[rowIndex];
        row.cells[0].textContent = fullName;
        row.cells[1].textContent = id;
        row.cells[2].textContent = email;
        // Reset button action to 'Add'
        document.getElementById('submit-btn').setAttribute('data-edit', 'false');
        document.getElementById('submit-btn').removeAttribute('data-row-index');
    } else {
        // Add new row
        const tableBody = document.getElementById('tabledata');
        const newRow = tableBody.insertRow();
        newRow.insertCell(0).textContent = fullName;
        newRow.insertCell(1).textContent = id;
        newRow.insertCell(2).textContent = email;
        newRow.insertCell(3).textContent = ""; // Empty cell for phone
        newRow.insertCell(4).innerHTML = `
            <button class="btn btn-warning" onclick="editRow(this)">Edit</button>
            <button class="btn btn-danger" onclick="deleteRow(this)">Delete</button>`;
    }

    // Hide the card and show success alert
    hideModal();
    swal("Good job!", "Data Submitted Successfully!", "success");

    return false; // Prevent form submission to server
}

function deleteRow(button) {
    // Remove row from the table
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function editRow(button) {
    // Get row data
    const row = button.parentNode.parentNode;
    const cells = row.cells;

    // Fill form with row data
    document.getElementById('Priority1').value = cells[0].textContent;
    document.getElementById('Priority2').value = cells[1].textContent;
    document.getElementById('Priority3').value = cells[2].textContent;
    document.getElementById('Priority4').value = cells[3].textContent;

    // Show modal and set button action to 'Edit'
    showModal();
    document.getElementById('submit-btn').setAttribute('data-edit', 'true');
    document.getElementById('submit-btn').setAttribute('data-row-index', row.rowIndex);
}


fetch("https://api.slingacademy.com/v1/sample-data/files/employees.json").then((data) => {
    // console.log(data);
    return data.json();
}).then((objectData) => {
    console.log(objectData);
    let tabledata = "";
    objectData.map((values) => {
        tabledata +=
            `     <tr>
                    <th scope="row">${values.first_name}</th>
                    <td>${values.id}</td>
                    <td>${values.email}</td>
                    <td>${values.phone}</td>
                       </tr>`;


    }); document.getElementById("tabledata").innerHTML = tabledata;

})