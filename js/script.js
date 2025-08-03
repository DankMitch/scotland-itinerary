// Function to open Google Maps directions
function openGoogleMaps(address) {
    const encodedAddress = encodeURIComponent(address);
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
    window.open(googleMapsUrl, '_blank');
}

// Function to open Apple Maps directions
function openAppleMaps(address) {
    const encodedAddress = encodeURIComponent(address);
    const appleMapsUrl = `http://maps.apple.com/?daddr=${encodedAddress}`;
    window.open(appleMapsUrl, '_blank');
}

// Header collapse functionality
function handleHeaderCollapse() {
    const header = document.querySelector('header');
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        header.classList.add('collapsed');
    } else {
        header.classList.remove('collapsed');
    }
}

// Add event listeners when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Find all Google Maps buttons
    const googleMapsButtons = document.querySelectorAll('.google-maps');
    googleMapsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const address = this.getAttribute('data-address');
            openGoogleMaps(address);
        });
    });
    
    // Find all Apple Maps buttons
    const appleMapsButtons = document.querySelectorAll('.apple-maps');
    appleMapsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const address = this.getAttribute('data-address');
            openAppleMaps(address);
        });
    });
    
    // Add scroll listener for header collapse
    window.addEventListener('scroll', handleHeaderCollapse);
});
