proj3
=====

Project 3: Mini team project

Try it out!
To run our program clone the repository, install the appropriate node packages,
ensure you're running mondodb, and start the program. You should be able to
accomplish this by executing the following commands:

git clone https://github.com/6170-fa14/gjvargas_sturlag_hsubrama_proj3 <project_name>

Then, in root directory of the project, run:

npm install
sudo mongod
npm start

You can also visit our live version of the project at:
http://storm-hariharfritter.rhcloud.com/

//////////////////////////////////////////////////////////////////////////////////////

A documentation of our API follows:

auth.js

  (POST) /auth/login - Logs the user in.

    The request has a POST body that must include a "username" and "password".

    The response is:
    {
      error: An error message, or null if there is no error.
      result: The session id string (if there is no error).
    }

    It also sets a session_id cookie.

  (POST) /auth/register - Registers a new user.

    The request has a POST body which must contain a "username" and "password".

    The response is:
    {
      error: An error message (or null if there is no error).
      result: The session_id string (if there is no error).
    }

    It also sets a session_id cookie.

  (DELETE) /auth/logout - Logs the user out.

    The request must have a session_id cookie.

    The response is:
    {
      error: The error message (or null if there is no error)
      result: true (if there is no error).
    }

report.js

  (POST) /report - Makes a report.

    The request must be a POST, and the body must contain:

    lat: The latitude of the location of the report.
    lon: The longitude of the location of the report.
    severity_level: Must be one of the constants defined in ../models/severity_level.js
    storm_type: Must be one of the constants defined in ../models/storm_type.js
    content: The text content of the report.

    The session_id must be a cookie.

    The response is of the form:
    {
    error: An error message, or null if there is no error,
    result: The object that represents the report.

  (DELETE) /report/:report_id - Deletes a report.

    The session_id must be a cookie. The report_id in the URL is the ID of the report
    to delete.

    The response is:
    {
      error: An error message, or null if there is no error.
      result: true (if there is no error).
    }

  (GET) /report - Returns the reports for the given user.

    The session_id must be a cookie.

    The response is:
    {
      error: An error message, or null if there is no error.
      result: [...] (array of the reports made by this user)
    }

  (GET) /report/all - Returns all the reports.

    The response is of the form:
    {
      error: An error message, or null if there is no error.
      result: [...] (the array of the reports).
    }

  (GET) /report/latest/:minutes - Returns all the reports at most :minutes minutes old.

    The request is a GET. the :minutes argument is the number of minutes to look back (ex. if
    minutes is 40, we return all reports which are at most 40 minutes old).

    The response is of the form:
    {
      error: An error message, or null if there is no error.
      result: [...] (the array of the reports).
    }

  (GET) /report/near/:lat/:lon/:distance - Returns all the reports that are within :distance miles of :lat, :lon

    The request must have:
    :lat = latitude
    :lon = longitude
    :distance = the distance, in miles.

    The response is:
    {
      error: An error message, or null if there is no error
      result: [...] (the array of reports)
    }

  (GET) /report/:report_id - Return the report with the given ID.

    The request has an :report_id part of the URL, which is the report id.

    The response will take the form:
    {
      error: An error message, or null if there is no error
      result: The report.
    }

  (PUT) /report/upvote/:report_id - Upvotes the given report_id

    The request must have a session_id cookie and have the report id in the URL (:report_id).

    The response will take the form:
    {
      error: An error message, or null if there is no error.
      result: true (if there is no error).
    }

  (PUT) /report/downvote/:report_id - Downvotes the given report_id.

    The request must have a session_id cookie and have the report id in the URL (:report_id).

    The response will take the form:
    {
      error: An error message, or null if there is no error.
      result: true (if there is no error).
    }

  (PUT) /report/novote/:report_id - Removes any upvotes or downvotes on the given report.
    The request must have a session_id cookie and have the report id in the URL (:report_id).

    The response will take the form:
    {
      error: An error message, or null if there is no error.
      result: true (if there is no error).
    }

storm_type.js
  (POST) /subscribe - Makes a subscription.
    The request must be a POST, and the body must contain:

    lat: The latitude of the location to monitor for the subscription.
    lon: The longitude of the location to monitor for the subscription.
    severity_level: Only notify the user about storms with severity >= severity_level
    carrier: The email domain of the carrier of the user's phone (see ../models/carrier.js)
    phone_number: The 10 digit phone number for the user.

    The session_id must be a cookie.

    The response is of the form:
    {
      error: An error message, or null if there is no error,
      result: The object that represents the subscription.
    }
  (DELETE) /subscribe/:subscription_id - Deletes a subscription.

    The session_id must be a cookie.

    The subscription_id must be in the URL.

    The response is:
    {
      error: An error message, or null if there is no error.
      result: true (if there is no error).
    }

  (PUT) /subscribe/:subscription_id - Updates a subscription.
    The request must be a PUT, and the body must contain:

    subscription_id: The subscription id we aim to update.
    lat: The latitude of the location to monitor for the subscription.
    lon: The longitude of the location to monitor for the subscription.
    severity_level: Only notify the user about storms with severity >= severity_level
    carrier: The email domain of the carrier of the user's phone (see ../models/carrier.js)
    phone_number: The 10 digit phone number for the user.

    The session_id must be a cookie.

    The response is of the form:
    {
      error: An error message, or null if there is no error,
      result: true (if no error occured)
    }

  (GET) /subscribe - Returns all the subscriptions for a given user.

    The session_id must be a cookie.

    The response is:
    {
      error: An error message, or null if there is no error.
      result: [...] (an array of the subscriptions).
    }

//////////////////////////////////////////////////////////////////////////////////////


In response to the feedback on Github:

Although session might not need to be in our data model, we currently are
storing all the sessions in case we need them later. Because we are storing
them, we have decided to keep them in the data model.

Regarding the Voting, we do ensure that each user can only vote once, and
can only upvote or downvote. We accomplish this by storing a set of upvoters
and downvoters in each report. We don't use a vote entity because we simply
store the users who have voted. The set of voters provides counts of upvotes
and downvotes, and allows us to authenticate reports.

After considering allowing users to subscribe to specific storm types, we
intend to keep subscriptions as they are. Although a user might only want to
hear about one type of storm, it is in best interest of the user's safety that
we notify them about all storm threats in the area. Our subscribers' safety comes
first.

We intend to keep phone numbers as a property of subscription so that a user
can be notified on multiple phones. Although it is unlikely that a user has
more than one phone, we want to allow a user to be notified through multiple
media. Also, perhaps a subscriber wants to store phone numbers of others (i.e.
a parent might want to subscribe their children).

We have updated our design challenges to reflect new challenges that have come
up this week.

Users indicate their location by latitude and longitude. We have updated the
design document to be less ambiguous in terminology. We've also included the
time a storm stays on the map under our design challenges.
