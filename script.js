// Dynamic welcome message based on the time of day
window.onload = function () {
    const welcomeMessage = document.getElementById('welcomeMessage');
    const currentHour = new Date().getHours();
    let message;

    if (currentHour < 12) {
        message = "Good Morning! Welcome to My Portfolio";
    } else if (currentHour < 18) {
        message = "Good Afternoon! Welcome to My Portfolio";
    } else {
        message = "Good Evening! Welcome to My Portfolio";
    }

    welcomeMessage.textContent = message;
};
