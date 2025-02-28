document.addEventListener("DOMContentLoaded", () => {
    // Get all tab buttons and tab contents
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(button => {
        button.addEventListener("click", function () {
            const tabId = this.getAttribute("data-tab"); // Get tab ID

            // Hide all tab contents
            tabContents.forEach(tab => tab.style.display = "none");

            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove("active"));

            // Show the selected tab and mark the button as active
            const selectedTab = document.getElementById(tabId);
            if (selectedTab) {
                selectedTab.style.display = "block";
            }
            this.classList.add("active");
        });
    });

    // Set default tab (first tab should be visible)
    if (tabButtons.length > 0) {
        tabButtons[0].classList.add("active");
        document.getElementById(tabButtons[0].getAttribute('data-tab')).style.display = "block"; // Show first tab

    }
});
