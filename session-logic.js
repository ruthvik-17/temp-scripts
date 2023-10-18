(function() {
  // Initialize session-related data
  initSessionData();

  // Function to initialize session data
  function initSessionData() {
    if (isNewSession()) {
      // This is a new session or a session restart
      console.log("New session started.");
      // Perform any necessary actions for a new session
    } else {
      // This is an existing session
      console.log("Existing session.");
    }

    // Call the tracking function on page load
    trackAndSaveData();

    // Set up a "heartbeat" to periodically update session data
    setInterval(function() {
      trackAndSaveData();
    }, 10000); // Every 10 seconds
  }

  // Function to check if it's a new session or a session restart
  function isNewSession() {
    var lastSessionStart = parseInt(getCookie("lastSessionStart"), 10);
    var currentTime = new Date().getTime();
    var sessionTimeout = 30 * 60 * 1000; // 30 minutes

    if (!lastSessionStart || currentTime - lastSessionStart > sessionTimeout) {
      setCookie("lastSessionStart", currentTime, 365); // Store the start time for 365 days
      return true;
    }

    return false;
  }

  // Function to track data and save it to cookies
  function trackAndSaveData() {
    // ... (the rest of the code for tracking and saving data)
  }

  // Utility functions for working with cookies
  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  }

  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
})();
