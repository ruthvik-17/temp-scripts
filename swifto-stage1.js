(function () {

    // measuring clicks of the session
    var interactions = 0;
    var tracked_in_mini_session_interations = 0;

    // Function to track data and save it to cookies
    function trackAndSaveData() {
      // Get the current date and time
      var currentDate = new Date();
  
      // Extract individual data points related to date and time
      var month = currentDate.getMonth() + 1; // Adding 1 to get 1-12 instead of 0-11
      var dayOfWeek = currentDate.getDay(); // 0 for Sunday, 1 for Monday, etc.
      var dayOfMonth = currentDate.getDate();
      var hourOfDay = currentDate.getHours();
      var timezoneOffset = -currentDate.getTimezoneOffset() / 60; // Timezone offset in hours
  
      // Get referrer information
      var referrer = document.referrer;
      var referrerType = "direct"; // Default to "direct" if no referrer
  
      if (referrer) {
        if (
          referrer.includes("facebook.com") ||
          referrer.includes("twitter.com")
        ) {
          referrerType = "social";
        } else if (
          referrer.includes("google.") ||
          referrer.includes("bing.com")
        ) {
          referrerType = "seo";
        } else if (
          referrer.includes("googleads.") ||
          referrer.includes("gads.") ||
          referrer.includes("utm_source=email")
        ) {
          referrerType = "gads";
        } else if (referrer.includes("email")) {
          referrerType = "email";
        }
      }
  
      // Determine the device type based on the user agent
      var deviceType = "desktop"; // Default to "desktop" if not identified
      var userAgent = navigator.userAgent.toLowerCase();
  
      if (userAgent.match(/mobile/i)) {
        deviceType = "mobile";
      } else if (userAgent.match(/tablet/i)) {
        deviceType = "tablet";
      }
  
      // Create or load the tracked data object from cookies
      var trackedData = JSON.parse(getCookie("trackedData")) || {};
  
      // Check if this is a new session based on whether the page was just loaded
      var isNewSession = !trackedData.hasOwnProperty("last_page_load_time");
  
      // Initialize session-related data if it's a new session or tab is reopened
      if (isNewSession || isSessionRestarted()) {
        trackedData.session_num_byuser =
          (trackedData.session_num_byuser || 0) + 1;
        trackedData.interaction_num_by_user = 0; // Initialize the interaction count
        trackedData.interaction_num_bysession = 0;
        trackedData.total_seconds_onsite_this_session = 0;
      }
  
      // Calculate the time since the last event (in seconds)
      var currentTime = currentDate.getTime();
      var lastEventTime = trackedData.last_event_time || currentTime;
      var secondsSinceLastEvent = (currentTime - lastEventTime) / 1000;
  
      // Detect user interactions (clicks) and update interaction counts
    //   document.addEventListener("click", function () {
    //     trackedData.interaction_num_by_user =
    //       (trackedData.interaction_num_by_user || 0) + 1;
    //     trackedData.interaction_num_bysession =
    //       (trackedData.interaction_num_bysession || 0) + 1;
    //   });

      if (interactions > tracked_in_mini_session_interations) {
      trackedData.interaction_num_by_user =
      (trackedData.interaction_num_by_user || 0) + (interactions-tracked_in_mini_session_interations);
    trackedData.interaction_num_bysession =
      (trackedData.interaction_num_bysession || 0) + (interactions-tracked_in_mini_session_interations);

      // update the tracked_in_mini_interactions
      tracked_in_mini_session_interations = interactions
      }
  
      // Update the other tracked data points
      trackedData.month = month;
      trackedData.day_of_week = dayOfWeek;
      trackedData.day_of_month = dayOfMonth;
      trackedData.hour_of_day = hourOfDay;
      trackedData.timezone_offset = timezoneOffset;
      trackedData.referrer_type_social = referrerType === "social" ? 1 : 0;
      trackedData.referrer_type_seo = referrerType === "seo" ? 1 : 0;
      trackedData.referrer_type_direct = referrerType === "direct" ? 1 : 0;
      trackedData.referrer_type_gads = referrerType === "gads" ? 1 : 0;
      trackedData.referrer_type_email = referrerType === "email" ? 1 : 0;
      trackedData.device_type_mobile = deviceType === "mobile" ? 1 : 0;
      trackedData.device_type_tablet = deviceType === "tablet" ? 1 : 0;
      trackedData.device_type_desktop = deviceType === "desktop" ? 1 : 0;
      trackedData.seconds_since_last_event = secondsSinceLastEvent;
  
      // Update the total time spent data
      trackedData.total_seconds_onsite_by_user += secondsSinceLastEvent;
      trackedData.total_seconds_onsite_this_session += secondsSinceLastEvent;
  
      // Update the last event time
      trackedData.last_event_time = currentTime;
  
      // Update the last page load time for session tracking
      trackedData.last_page_load_time = currentTime;
  
      // Save the updated tracked data to cookies
      setCookie("trackedData", JSON.stringify(trackedData), 365); // Store data for 365 days
  
      // Here, you can send the 'trackedData' object to your server for storage or analysis.
      // You would typically make an AJAX request or use an appropriate method to send this data.
  
      // For demonstration purposes, log the tracked data to the console.
      console.log("Tracked Data:", trackedData);
    }
  
    document.addEventListener("click", function (event) {
      if (event.target.tagName === "A" || event.target.type === "button") {

        interactions = interactions + 1;
        console.log("Clicked on a link or button. and added to interactions count");

        trackAndSaveData()

      } else {
        console.log("Dead click.");
      }
    });
  
    // Function to check if the tab is reopened
    function isSessionRestarted() {
      var lastSessionStart = parseInt(getCookie("lastSessionStart"), 10);
      var currentTime = new Date().getTime();
      var sessionTimeout = 30 * 60 * 1000; // 30 minutes
  
      if (lastSessionStart && currentTime - lastSessionStart > sessionTimeout) {
        setCookie("lastSessionStart", currentTime, 365); // Store the start time for 365 days
        return true;
      } else if (!lastSessionStart) {
        setCookie("lastSessionStart", currentTime, 365);
      }
  
      return false;
    }
  
    // Track data and save it every 10 seconds (10000 milliseconds)
    setInterval(trackAndSaveData, 10000);
  
    // Function to set a cookie
    function setCookie(name, value, days) {
      var expires = "";
      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + value + expires + "; path=/";
    }
  
    // Function to get a cookie by name
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
  
