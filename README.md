# Project 3: Stormspot

## Usage

1. Navigate to [http://storm-hariharfritter.rhcloud.com](http://storm-hariharfritter.rhcloud.com)

**or**

1. `sudo mongod`
2. `git clone https://github.com/6170-fa14/gjvargas_sturlag_hsubrama_proj3 stormspot` (in separate terminal)
3. `cd stormspot`
4. `npm install`
5. `npm start`
6. Navigate your browser to [localhost:3000](http://localhost:3000)

## Description

We've implemented the **backend API** for this part of the project. The **frontend** is currently a simple test page where you can issue requests to the server and see the responses. This is to show that the available API functionality works.

## API

### Authentication (see [`/routes/auth.js`](https://github.com/6170-fa14/gjvargas_sturlag_hsubrama_proj3/blob/master/routes/auth.js))

`(POST) /auth/login` - Logs the user in.

`(POST) /auth/register` - Registers a new user.

`(DELETE) /auth/logout` - Logs the user out.

### Reports  (see [`/routes/report.js`](https://github.com/6170-fa14/gjvargas_sturlag_hsubrama_proj3/blob/master/routes/report.js))

`(POST) /reports` - Makes a report.

`(DELETE) /reports/:report_id` - Deletes a report.

`(GET) /reports` - Returns the reports for the given user.

`(GET) /reports/all` - Returns all the reports.

`(GET) /reports/:report_id` - Return the report with the given ID.

`(PUT) /reports/upvote/:report_id` - Upvotes the given report_id

`(PUT) /reports/downvote/:report_id` - Downvotes the given report_id.

`(PUT) /reports/novote/:report_id` - Removes any upvotes or downvotes on the given report.

### Subscriptions  (see [`/routes/subscribe.js`](https://github.com/6170-fa14/gjvargas_sturlag_hsubrama_proj3/blob/master/routes/subscribe.js))

`(POST) /subscriptions` - Makes a subscription.

`(DELETE) /subscriptions/:subscription_id` - Deletes a subscription.

`(PUT) /subscriptions/:subscription_id` - Updates a subscription.

`(GET) /subscriptions` - Returns all the subscriptions for a given user.

## Response to 3.1 Feedback

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
