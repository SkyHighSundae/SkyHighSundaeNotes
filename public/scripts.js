// public/scripts.js
// Help Center Modal Script
var helpCenterModal = document.getElementById("helpCenterModal");
var helpCenterBtn = document.getElementById("helpCenterBtn");
var helpCenterClose = document.getElementsByClassName("close")[0];

helpCenterBtn.onclick = function() {
    helpCenterModal.style.display = "block";
}
helpCenterClose.onclick = function() {
    helpCenterModal.style.display = "none";
}

// About Modal Script
var aboutModal = document.getElementById("aboutModal");
var aboutBtn = document.getElementById("aboutBtn");
var aboutClose = document.getElementsByClassName("about-close")[0];

aboutBtn.onclick = function() {
    aboutModal.style.display = "block";
}
aboutClose.onclick = function() {
    aboutModal.style.display = "none";
}

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target == helpCenterModal) {
        helpCenterModal.style.display = "none";
    }
    if (event.target == aboutModal) {
        aboutModal.style.display = "none";
    }
}
