// Load the 360 image from the assets folder and hide the intro overlay (if there is one)
function start() {
    document.getElementById("intro").style.display = "none"; // Hide the intro if it exists
}

// Function to set up the device’s main camera feed
function setupMainCameraFeed() {
    const videoElement = document.getElementById("real-world-feed");
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(function (stream) {
            console.log("Camera feed accessed successfully."); // Debug line
            videoElement.srcObject = stream;
            videoElement.play();
        })
        .catch(function (err) {
            console.error("Error accessing camera feed: ", err); // Log errors
        });
    } else {
        console.error("Browser does not support media devices.");
    }
}


// Call the camera setup function when the page loads
window.onload = function() {
    setupMainCameraFeed();
};

// Adjust the 360 image based on the device orientation to always point north
window.addEventListener('deviceorientation', function(event) {
    const alpha = event.alpha; // Get compass heading in degrees
    const sky = document.getElementById('background360');
    const skyDepth = document.getElementById('background360-depth');

    // Rotate the sky (Y-axis) based on compass heading (alpha)
    sky.setAttribute('rotation', `0 ${alpha} 0`);
    skyDepth.setAttribute('rotation', `0 ${alpha} 0`);
});
