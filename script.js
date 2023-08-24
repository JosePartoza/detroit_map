document.addEventListener("DOMContentLoaded", function() {
    // Script for zooming and panning functionality
    const svgContainer = document.querySelector(".overflow-auto");
    let zoomLevel = 1;
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;

    // ... (rest of the zooming and panning code)

    // Get all SVG elements with IDs starting with "XMLID_"
    const svgElements = document.querySelectorAll("#Layer_1 polygon[id^='XMLID_'], #Layer_1 path[id^='XMLID_']");

    // Get the table body to populate the area names
    const areaListTableBody = document.getElementById("area-list");

    // Calculate the number of columns and rows
    const columns = 4;
    const rows = Math.ceil(svgElements.length / columns);

    // Loop through the SVG elements and populate the table
    for (let row = 0; row < rows; row++) {
        const newRow = document.createElement("tr");
        for (let col = 0; col < columns; col++) {
            const index = row * columns + col;
            if (index < svgElements.length) {
                const areaElement = svgElements[index];
                const areaId = areaElement.getAttribute("id");
                const areaName = areaId.replace("XMLID_", ""); // Remove "XMLID_" from the ID

                const cell = document.createElement("td");
                cell.textContent = areaName;
                cell.classList.add("area-cell", "px-4", "py-2");
                cell.setAttribute("data-name", areaName);
                newRow.appendChild(cell);
            }
        }
        areaListTableBody.appendChild(newRow);
    }

    // Add event listeners to synchronize hover behavior between SVG and table
    svgElements.forEach((areaElement) => {
        const areaId = areaElement.getAttribute("id");
        const areaName = areaId.replace("XMLID_", "");

        const cell = areaListTableBody.querySelector(`.area-cell[data-name='${areaName}']`);

        // Separate functions for SVG element and cell to prevent confusion
        const highlightSvgAndCell = () => {
            areaElement.classList.add("highlight");
            cell.classList.add("highlight");
        };

        const unhighlightSvgAndCell = () => {
            areaElement.classList.remove("highlight");
            cell.classList.remove("highlight");
        };

        areaElement.addEventListener("mouseover", highlightSvgAndCell);
        areaElement.addEventListener("mouseout", unhighlightSvgAndCell);

        cell.addEventListener("mouseover", highlightSvgAndCell);
        cell.addEventListener("mouseout", unhighlightSvgAndCell);
    });
});
