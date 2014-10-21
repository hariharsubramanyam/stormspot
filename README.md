# Project 3: Stormspot

## Usage

1. Navigate to [http://storm-hariharfritter.rhcloud.com](http://storm-hariharfritter.rhcloud.com)

**or**

1. `sudo mongod`
2. (in separate termninal) `git clone https://github.com/6170-fa14/gjvargas_sturlag_hsubrama_proj3 stormspot`
2. `cd stormspot`
3. `npm install`
4. `npm start`
5. Navigate your browser to [localhost:8080][http://localhost:8080]

## Description

We've implemented the **backend API** for this part of the project. The **frontend** (which you see in your browser) currently is a simple test page where can issue requests to the server and see the responses. This is to show that the available API functionality works.

## API

### Authentication

`(POST) /auth/login - Logs the user in.`

`(POST) /auth/register - Registers a new user.`

`(DELETE) /auth/logout - Logs the user out.`

### Reports

`(POST) /report - Makes a report.`

`(DELETE) /report/:report_id - Deletes a report.`

`(GET) /report - Returns the reports for the given user.`

`(GET) /report/all - Returns all the reports.`

`(GET) /report/latest/:minutes - Returns all the reports at most :minutes minutes old.`

`(GET) /report/near/:lat/:lon/:distance - Returns all the reports that are within :distance miles of :lat, :lon`

`(GET) /report/:report_id - Return the report with the given ID.`

`(PUT) /report/upvote/:report_id - Upvotes the given report_id`

`(PUT) /report/downvote/:report_id - Downvotes the given report_id.`

`(PUT) /report/novote/:report_id - Removes any upvotes or downvotes on the given report.`

### Subscriptions

`(POST) /subscribe - Makes a subscription.`

`(DELETE) /subscribe/:subscription_id - Deletes a subscription.`

`(PUT) /subscribe/:subscription_id - Updates a subscription.`

`(GET) /subscribe - Returns all the subscriptions for a given user.`

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
