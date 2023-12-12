// Our custom alert

const showAlert = (elementorTitleText, width = `85%`, height = `auto`, withButton = true, type) => {
    // Check if alert is already open
    // let isAlertOpen = JSON.parse(localStorage.getItem(`alertOpen`)) == true;
    // if (isAlertOpen) return;
  
    // Create the overlay
    let overlay = document.createElement(`div`);
    overlay.className = `overlay`;
    document.body.appendChild(overlay);
  
    // Create the alert
    let alert = document.createElement(`div`);
    alert.className = `alert`;
    alert.innerHTML = elementorTitleText;
  
    // Create the close button
    let closeButton = document.createElement(`button`);
    closeButton.innerHTML = `<span style="position: relative; top: 2px;">X</span>`;
    closeButton.className = `closeButton alertButton josefin`;
    
    // Append UI Elements
    if (withButton) alert.appendChild(closeButton);
    overlay.appendChild(alert);
  
    // Add transition styles for smooth fade-in
    overlay.style.top = `0`;
    overlay.style.left = `0`;
    overlay.style.right = `0`;
    overlay.style.opacity = 0;
    overlay.style.bottom = `0`;
    overlay.style.margin = `auto`;
    overlay.style.display = `flex`;
    overlay.style.cursor = `pointer`;
    overlay.style.position = `fixed`;
    overlay.style.alignItems = `center`;
    overlay.style.justifyContent = `center`;
    // overlay.title = `Click to Close Popup`;
    overlay.style.background = `var(--halfDark)`;
    overlay.style.transition = `opacity 0.3s ease-out`;
  
    alert.style.opacity = 0;
    alert.style.width = width;
    alert.style.color = `white`;
    alert.style.height = height;
    alert.style.padding = `3em`;
    alert.style.display = `flex`;
    alert.style.borderRadius = `4px`;
    alert.style.alignItems = `center`;
    alert.style.justifyContent = `center`;
    alert.style.backdropFilter = `blur(5px)`;
    alert.style.transition = `opacity 0.3s ease-out`;
    alert.style.background = `var(--darkTransparent)`;
  
    // Add styles
    closeButton.style.top = `15px`;
    closeButton.style.right = `15px`;
    closeButton.style.width = `35px`;
    closeButton.style.height = `25px`;
    closeButton.style.border = `none`;
    closeButton.style.color = `black`;
    closeButton.style.outline = `none`;
    closeButton.style.display = `flex`;
    closeButton.style.fontSize = `16px`;
    closeButton.style.cursor = `pointer`;
    closeButton.style.fontWeight = `900`; 
    closeButton.style.background = `white`;
    closeButton.style.borderRadius = `5px`;
    closeButton.style.alignItems = `center`;
    closeButton.style.position = `absolute`;
    closeButton.title = `Click to Close Popup`;
    closeButton.style.justifyContent = `center`;
    closeButton.style.transition = `0.3s ease-out`;
  
    // Flag alert as open
    localStorage.setItem(`alertOpen`, true);
  
    // Trigger reflow to ensure the styles are applied before animating
    void alert.offsetWidth;
  
    // Fade in the alert
    overlay.style.opacity = 1;
    alert.style.opacity = 1;
  
    // Hover style 
    closeButton.onmouseover = () => {
      closeButton.style.color = `var(--lightCorrect)`;
    }
  
    closeButton.onmouseout = () => {
      closeButton.style.color = `black`;  
    }
  
    // Add a click event listener to the close button to dismiss the alert
    closeButton.addEventListener(`click`, () => {
      dismissAlert(); 
    });
  
    // Add a click event listener to the overlay to dismiss the alert
    overlay.addEventListener(`click`, () => {
      // Fade out the alert and overlay
      if (alert) alert.style.opacity = 0;
      if (overlay && overlay.style.opacity != 0) overlay.style.opacity = 0;
  
      // Remove the alert and overlay from the DOM after the animation is complete
      setTimeout(() => {
        if (overlay && document.querySelector(`.overlay`)) document.body.removeChild(overlay);
        localStorage.setItem(`alertOpen`, false);
      }, 300);
    });
}