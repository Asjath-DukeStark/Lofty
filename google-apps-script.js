/**
 * LOFTY BEAUTY - GOOGLE CALENDAR AUTOMATIC SYNC & REMINDERS SCRIPT
 * 
 * This is a Google Apps Script that automatically syncs bookings from your website 
 * to your Google Calendar and configures instant 2-hour-prior mobile and email reminders!
 * 
 * =========================================================================
 * 🌟 EASY 3-STEP SETUP INSTRUCTIONS 🌟
 * =========================================================================
 * 
 * 1. GO TO GOOGLE APPS SCRIPT:
 *    Open your web browser and go to: https://script.google.com
 *    Click "New Project" (make sure you are signed into your loftybeautyparlorandcare@gmail.com account).
 * 
 * 2. PASTE THIS CODE:
 *    Delete any code in the editor (like the empty myFunction) and paste this ENTIRE file's code.
 *    Click the Save icon (floppy disk) at the top and name the project "Lofty Calendar Sync".
 * 
 * 3. DEPLOY AS A WEB APP:
 *    - Click the "Deploy" button at the top-right and select "New deployment".
 *    - Click the gear icon next to "Select type" and choose "Web app".
 *    - Configure the fields exactly as follows:
 *      * Description: Lofty Booking Sync
 *      * Execute as: Me (your-email@gmail.com)
 *      * Who has access: Anyone
 *    - Click "Deploy".
 *    - Google will ask you to "Authorize Access". Click it, select your Google Account, click "Advanced" (at the bottom), and then click "Go to Lofty Calendar Sync (unsafe)" -> click "Allow".
 *    - Once deployed, COPY the "Web app URL" (it starts with: https://script.google.com/macros/s/...)
 *    - Paste this URL into your website's .env file:
 *      VITE_GOOGLE_SCRIPT_URL="YOUR_COPIED_URL_HERE"
 * 
 * That's it! Bookings will now automatically add to your calendar in the background!
 */

function doPost(e) {
  try {
    // 1. Parse incoming booking data
    var data = JSON.parse(e.postData.contents);
    
    var userName = data.name || "Client";
    var services = data.services || "Selected Rituals";
    var price = data.price || "N/A";
    var duration = data.duration || "N/A";
    var notes = data.notes || "None";
    
    // Parse Dates
    var startTime = new Date(data.startTime);
    var endTime = new Date(data.endTime);
    
    // Get calendar (primary is the default calendar of your Gmail)
    var calendar = CalendarApp.getCalendarById("primary");
    if (!calendar) {
      calendar = CalendarApp.getDefaultCalendar();
    }
    
    // 2. DUPLICATE PREVENTION:
    // Search for existing events at this exact time range to avoid duplicates
    var existingEvents = calendar.getEvents(startTime, endTime);
    var isDuplicate = false;
    
    for (var i = 0; i < existingEvents.length; i++) {
      var event = existingEvents[i];
      // If there's already an event with this client's name or similar title, mark as duplicate
      if (event.getTitle().indexOf(userName) !== -1 && event.getTitle().indexOf("Lofty Booking") !== -1) {
        isDuplicate = true;
        break;
      }
    }
    
    if (isDuplicate) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "Duplicate prevented. Event already exists on your calendar.",
        duplicate: true
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // 3. Create Google Calendar Event
    var eventTitle = "Lofty Booking: " + userName + " (" + services + ")";
    var eventDescription = 
      "🌟 LOFTY BEAUTY RESERVATION 🌟\n\n" +
      "• Client Name: " + userName + "\n" +
      "• Services: " + services + "\n" +
      "• Total Investment: LKR " + price + "\n" +
      "• Duration: ~" + duration + " min\n" +
      "• Notes: " + notes + "\n\n" +
      "Location: 73/2 AVV Road, Akkaraipattu 19, Sri Lanka\n" +
      "Contact: loftybeautyparlorandcare@gmail.com";
      
    var event = calendar.createEvent(eventTitle, startTime, endTime, {
      description: eventDescription,
      location: "73/2 AVV Road, Akkaraipattu 19, Sri Lanka"
    });
    
    // 4. SET 2-HOUR PRIOR AUTOMATIC REMINDERS:
    // Add pop-up/notification reminder 120 minutes (2 hours) before
    event.addPopupReminder(120);
    // Add email reminder 120 minutes (2 hours) before
    event.addEmailReminder(120);
    
    // Return successful response
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Event created successfully with reminders!",
      eventId: event.getId()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error details gracefully
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Simple GET test endpoint to verify script is active in browser
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "active",
    message: "Lofty Calendar Sync Web App is active and ready to receive POST requests!"
  })).setMimeType(ContentService.MimeType.JSON);
}
