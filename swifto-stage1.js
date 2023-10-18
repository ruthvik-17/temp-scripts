(function() {
    // Get the current date and time
    var currentDate = new Date();
  
    // Extract individual data points related to date and time
    var month = currentDate.getMonth() + 1; // Adding 1 to get 1-12 instead of 0-11
    var dayOfWeek = currentDate.getDay(); // 0 for Sunday, 1 for Monday, etc.
    var dayOfMonth = currentDate.getDate();
    var hourOfDay = currentDate.getHours();
    var timezoneOffset = currentDate.getTimezoneOffset() / 60; // Timezone offset in hours
  
    // Get the referrer information from the document
    var referrer = document.referrer;
    var referrerType = "direct"; // Default to "direct" if no referrer
  
    // Determine the referrer type based on the referrer information
    if (referrer) {
      if (referrer.includes("facebook.com") || referrer.includes("twitter.com")) {
        referrerType = "social";
      } else if (referrer.includes("google.") || referrer.includes("bing.com")) {
        referrerType = "seo";
      } else if (referrer.includes("googleads.") || referrer.includes("gads.") || referrer.includes("utm_source=email")) {
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
  
    // Create an object to hold the tracked data
    var trackedData = {
      "month": month,
      "day_of_week": dayOfWeek,
      "day_of_month": dayOfMonth,
      "hour_of_day": hourOfDay,
      "timezone_offset": timezoneOffset,
      "referrer_type_social": referrerType === "social" ? 1 : 0,
      "referrer_type_seo": referrerType === "seo" ? 1 : 0,
      "referrer_type_direct": referrerType === "direct" ? 1 : 0,
      "referrer_type_gads": referrerType === "gads" ? 1 : 0,
      "referrer_type_email": referrerType === "email" ? 1 : 0,
      "device_type_mobile": deviceType === "mobile" ? 1 : 0,
      "device_type_tablet": deviceType === "tablet" ? 1 : 0,
      "device_type_desktop": deviceType === "desktop" ? 1 : 0
    };
  
    // Here, you can send the 'trackedData' object to your server for storage or analysis.
    // You would typically make an AJAX request or use an appropriate method to send this data.
  
    // For demonstration purposes, log the tracked data to the console.
    console.log("Swfto Tracked Data:", trackedData);
  })();
  