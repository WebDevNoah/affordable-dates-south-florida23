document.addEventListener("DOMContentLoaded", function () {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            const dateList = document.getElementById("date-list");
            const searchBar = document.getElementById("searchBar");

            function displayDates(filteredDates) {
                dateList.innerHTML = "";
                filteredDates.forEach(date => {
                    const dateCard = document.createElement("div");
                    dateCard.classList.add("date-card");
                    dateCard.innerHTML = `
                        <img src="${date.image}" alt="${date.name}">
                        <h2>${date.name}</h2>
                        <p>${date.description}</p>
                        <p><strong>Price:</strong> ${date.price}</p>
                        <a href="${date.link}" target="_blank">More Info</a>
                    `;
                    dateList.appendChild(dateCard);
                });
            }

            searchBar.addEventListener("input", function () {
                const searchText = searchBar.value.toLowerCase();
                const filteredDates = data.dates.filter(date =>
                    date.name.toLowerCase().includes(searchText) ||
                    date.description.toLowerCase().includes(searchText)
                );
                displayDates(filteredDates);
            });

            displayDates(data.dates);
        })
        .catch(error => console.error("Error loading data:", error));
});
