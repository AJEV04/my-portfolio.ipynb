let executionCount = 0;

const notebookCells = document.querySelectorAll(".notebook-cell");

notebookCells.forEach(function (cell) {

    const runButton = cell.querySelector(".run-button");
    const outputCell = cell.querySelector(".output-cell");

    const executionCountElement =
        cell.querySelector(".execution-brackets");

    const executionStatus =
        cell.querySelector(".execution-status");

    const executionTime =
        cell.querySelector(".execution-time");

    const outputMenu =
        cell.querySelector(".output-menu");

    const outputOptions =
        cell.querySelector(".output-options");

    const clearCell =
        cell.querySelector(".clear-cell");

    let timerInterval = null;

    // RUN CELL

    runButton.addEventListener("click", function () {

        if (executionStatus.classList.contains("running")) {
            return;
        }

        executionCount++;

        executionCountElement.textContent =
            `[${executionCount}]`;

        executionStatus.textContent = "↻";

        executionStatus.classList.add("running");
        executionStatus.classList.remove("finished");

        executionTime.textContent = "0.00s";

        const startTime = performance.now();

        timerInterval = setInterval(function () {

            const currentTime = performance.now();

            const elapsedTime =
                (currentTime - startTime) / 1000;

            executionTime.textContent =
                `${elapsedTime.toFixed(2)}s`;

        }, 10);


        // Simulate execution time
        const time = Math.random() * 2 + 0.5;


        setTimeout(function () {

            clearInterval(timerInterval);

            const endTime = performance.now();

            const finalTime =
                (endTime - startTime) / 1000;

            executionTime.textContent =
                `${finalTime.toFixed(2)}s`;

            executionStatus.classList.remove("running");

            executionStatus.classList.add("finished");

            executionStatus.textContent = "✓";

            outputCell.classList.add("visible");

        }, time * 1000);

    });

    // OUTPUT MENU

    outputMenu.addEventListener("click", function () {

        outputOptions.classList.toggle("visible");

    });

    // CLEAR OUTPUT

    clearCell.addEventListener("click", function () {

        outputCell.classList.remove("visible");

        outputOptions.classList.remove("visible");

    });

});

// DARK / LIGHT MODE

const themeToggle =
    document.getElementById("theme-toggle");

themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {

        themeToggle.textContent = "☽";

    } else {

        themeToggle.textContent = "☼";

    }

});


const popup = document.getElementById("announcementPopup");
const closeButton = document.getElementById("popupClose");
const actionButton = document.getElementById("popupAction");

function openPopup() {
    popup.classList.add("visible");
}

function closePopup() {
    popup.classList.remove("visible");
}

// Show popup as soon as HTML is parsed
openPopup();

// Close using X
closeButton.addEventListener("click", closePopup);

// Close by clicking outside popup
popup.addEventListener("click", function (event) {
    if (event.target === popup) {
        closePopup();
    }
});

// Close using Escape
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closePopup();
    }
});

// Action button
actionButton.addEventListener("click", closePopup);
