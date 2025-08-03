// Function to open directions with choice of maps
function openDirections(address) {
    // Encode the address for URL
    const encodedAddress = encodeURIComponent(address);
    
    // Detect if user is on iOS/Mac for better Apple Maps support
    const isAppleDevice = /iPhone|iPad|iPod|Mac/.test(navigator.userAgent);
    
    // Create URLs for both map services
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
    const appleMapsUrl = `http://maps.apple.com/?daddr=${encodedAddress}`;
    
    if (isAppleDevice) {
        // On Apple devices, give choice with Apple Maps as default
        const useAppleMaps = confirm("Open in Apple Maps? (Click Cancel for Google Maps)");
        if (useAppleMaps) {
            window.open(appleMapsUrl, '_blank');
        } else {
            window.open(googleMapsUrl, '_blank');
        }
    } else {
        // On other devices, give choice with Google Maps as default
        const useGoogleMaps = confirm("Open in Google Maps? (Click Cancel for Apple Maps)");
        if (useGoogleMaps) {
            window.open(googleMapsUrl, '_blank');
        } else {
            window.open(appleMapsUrl, '_blank');
        }
    }
}

// Add event listeners when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Find all direction buttons and add click handlers
    const directionButtons = document.querySelectorAll('.directions-btn');
    
    directionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const address = this.getAttribute('data-address');
            openDirections(address);
        });
    });
});
