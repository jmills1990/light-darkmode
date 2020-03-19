function removeAllItems() {
var element = document.getElementByClass(buttonfont)
element.parentNode.removeChild(element);
}


function updateItemStatus() {
    var cbID = this.id.replace("cb_", "");
    var itemText = document.getElementById("item_" + cbID);

    if (this.checked) {

        itemText.className = "checked";

    }
    else {
        itemText.className = "";

    }
}

function renameItem() {
    // this == span
    var newText = prompt("What should this item be renamed to?")

    if (!newText || newText == "" || newText == " ") {
        return false;
    }
    this.innerText = newText;
}
function removeItem() {
    //this == span
    this.style.display = "none"

}
function addNewItem(list, itemText) {
    var date = new Date();
    var id = "" + date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds();

    var listItem = document.createElement("li");
    listItem.id = "li_" + id;
    listItem.ondblclick = removeItem;

    var checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.id = "cb_" + id;
    checkBox.onclick = updateItemStatus;



    var span = document.createElement("span");
    span.id = "item_" + id;
    span.innerText = itemText;
    span.onclick = renameItem;


    listItem.appendChild(checkBox);
    listItem.appendChild(span);

    list.appendChild(listItem);

}
var inItemText = document.getElementById("inItemText");
inItemText.focus();
inItemText.onkeyup = function (event) {

    // Event.which (13) -> 

    if (event.which == 13) {
        var itemText = inItemText.value

        if (!itemText || itemText == "" || itemText == " ") {
            return false;
        }

        addNewItem(document.getElementById("todoList"), itemText);


        //inItemText.select();
        document.getElementById("inItemText").blur();
        document.getElementById("inItemText").value = "";
        inItemText.focus();
    }
}


// Client ID and API key from the Developer Console
var CLIENT_ID = '426785396144-a1uiuga3ren4aib10u2t5th3cengacov.apps.googleusercontent.com';
var API_KEY = 'AIzaSyB-KDxVwXLHLYAT5lzBMgmbzOKKgkk7yM0';


// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  }, function(error) {
    appendPre(JSON.stringify(error, null, 2));
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    listUpcomingEvents();
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById('content');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
  gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 10,
    'orderBy': 'startTime'
  }).then(function(response) {
    var events = response.result.items;
    appendPre('Upcoming events:');

    if (events.length > 0) {
      for (i = 0; i < events.length; i++) {
        var event = events[i];
        var when = event.start.dateTime;
        if (!when) {
          when = event.start.date;
        }
        appendPre(event.summary + ' (' + when + ')')
      }
    } else {
      appendPre('No upcoming events found.');
    }
  });
}
