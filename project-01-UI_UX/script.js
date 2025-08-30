// Dummy data for multiple people
const peopleData = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", address: "123 Main St", city: "Los Angeles", state: "California", zip: "90001", terms: "Yes", country: "United States" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", address: "456 Oak St", city: "New York", state: "New York", zip: "10001", terms: "No", country: "United States" },
    { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", address: "789 Pine St", city: "Chicago", state: "Illinois", zip: "60601", terms: "Yes", country: "United States" },
    { id: 4, name: "Bob Brown", email: "bob.brown@example.com", address: "101 Maple St", city: "San Francisco", state: "California", zip: "94101", terms: "Yes", country: "United States" },
    { id: 5, name: "Charlie Davis", email: "charlie.davis@example.com", address: "202 Birch St", city: "Seattle", state: "Washington", zip: "98101", terms: "No", country: "United States" }
];

// Function to populate the table with dummy data
function populateTable(filteredData = peopleData) {
    const tableBody = document.querySelector("#people-table tbody");

    // Clear existing rows (if any)
    tableBody.innerHTML = "";

    // Loop through the data and create rows for the table
    filteredData.forEach(person => {
        const row = document.createElement("tr");

        // Create a cell for each piece of data
        for (const key in person) {
            if (key !== 'id') { // Skip the 'id' field as it's not displayed in the table
                const cell = document.createElement("td");
                cell.textContent = person[key];
                row.appendChild(cell);
            }
        }

        // Add action buttons (Print and Update) in the last column
        const actionsCell = document.createElement("td");

        // Print Button
        const printBtn = document.createElement("button");
        printBtn.textContent = "Print";
        printBtn.classList.add("print-btn");
        printBtn.onclick = () => printUserData(person.id);

        // Update Button
        const updateBtn = document.createElement("button");
        updateBtn.textContent = "Update";
        updateBtn.classList.add("update-btn");
        updateBtn.onclick = () => updateUserData(person.id);

        actionsCell.appendChild(printBtn);
        actionsCell.appendChild(updateBtn);

        row.appendChild(actionsCell);

        // Append the row to the table body
        tableBody.appendChild(row);
    });
}

// Function to print specific user data
function printUserData(id) {
    const person = peopleData.find(p => p.id === id);
    const printWindow = window.open("", "", "width=600,height=400");
    printWindow.document.write(`
        <h2>Details for ${person.name}</h2>
        <p><strong>Name:</strong> ${person.name}</p>
        <p><strong>Email:</strong> ${person.email}</p>
        <p><strong>Address:</strong> ${person.address}</p>
        <p><strong>City:</strong> ${person.city}</p>
        <p><strong>State:</strong> ${person.state}</p>
        <p><strong>Zip Code:</strong> ${person.zip}</p>
        <p><strong>Accept Terms:</strong> ${person.terms}</p>
        <p><strong>Country:</strong> ${person.country}</p>
    `);
    printWindow.document.close();
    printWindow.print();
}

// Function to update user data
function updateUserData(id) {
    const person = peopleData.find(p => p.id === id);
    const newName = prompt("Enter new name:", person.name);
    const newEmail = prompt("Enter new email:", person.email);
    const newAddress = prompt("Enter new address:", person.address);
    const newCity = prompt("Enter new city:", person.city);
    const newState = prompt("Enter new state:", person.state);
    const newZip = prompt("Enter new zip code:", person.zip);
    const newTerms = prompt("Accept terms (Yes/No):", person.terms);
    const newCountry = prompt("Enter new country:", person.country);

    // Update the person object
    person.name = newName || person.name;
    person.email = newEmail || person.email;
    person.address = newAddress || person.address;
    person.city = newCity || person.city;
    person.state = newState || person.state;
    person.zip = newZip || person.zip;
    person.terms = newTerms || person.terms;
    person.country = newCountry || person.country;

    // Re-populate the table with updated data
    populateTable();
}

// Search function to filter data
function searchData() {
    const searchValue = document.querySelector("#search").value.toLowerCase();
    const filteredData = peopleData.filter(person => {
        return person.name.toLowerCase().includes(searchValue) ||
               person.email.toLowerCase().includes(searchValue) ||
               person.city.toLowerCase().includes(searchValue) ||
               person.address.toLowerCase().includes(searchValue) ||
               person.state.toLowerCase().includes(searchValue) ||
               person.country.toLowerCase().includes(searchValue);
    });

    // If no search is entered, show all data
    if (searchValue === "") {
        populateTable(peopleData);
    } else {
        populateTable(filteredData);
    }
}

// Event listener for search bar
document.querySelector("#search").addEventListener("input", searchData);

// Call the function to populate the table when the page loads
window.onload = () => {
    populateTable(); // Load all data initially
};
