# Stormspot

## Authors

Harihar Subramanyam, Guillermo Vargas, and Giancarlo Sturla.

## Description

StormSpot is an app for reporting severe weathers. You can **view storm reports** on a map. You can **report storms** so that other people are notified. You can **subscribe for text message alerts** when there are storms near your area.

## Usage

Check out the [app demo](https://www.youtube.com/watch?v=G7n9BIvYUT4&feature=youtu.be).

1. `sudo mongod`
2. `git clone https://github.com/6170-fa14/gjvargas_sturlag_hsubrama_proj3 stormspot` (in separate terminal)
3. `cd stormspot`
4. `npm install`
5. `npm start`
6. Navigate your browser to [localhost:3000](http://localhost:3000)

Once you're connected to the app, you can get started. The opening screen will be
a form that allows you to either log in or create an account. Begin by creating an account.
From now on, when you connect to StormSpot you can log in using this account.
Upon account creation you will be taken to our main screen, a map of you area
with pins dropped everywhere a storm has been reported. This is the main screen,
from here you can do several things:

  1) You can look through storm locations across the map. Note the zoom buttons
  are in the top left corner. You should also be able do click and drag to traverse the map.

  2) You can create a report or subscription by clicking a location on the map. When
  you click, a marker will appear with two buttons, a Subscribe button and a Report
  button. A description of these button follows.

      a) Subscribe: This allows you to create a subscription to a small area. Fill
      out the form with your phone number and provider, and the storm severity level
      for which you want to get notifications. Immediately, you'll get a text message
      from StormSpot confirming your subscription. Now when there is a storm near the
      subscription location with at least the designated severity, you will get a
      text message notification, with certain details of the storm.

      b) Report: This button allows you to report a storm at the selected location.
      You can select what type of storm you are reporting, and the severity of the
      storm. You can also include a small description of what you see, to keep other
      users informed. When a user submits a form, the storm will be logged in our
      database and appear as a pin at the location they initially specified when
      they clicked the map.

  3) You can view and delete your Reports and Subscriptions. You'll notice there
  are two buttons at the bottom left corner of the screen, a Reports button and
  Subscriptions button. A description of the buttons follows.

      a) Reports: clicking this button will pull up a list of all reports the current
      user has made. Here the user can simply browse their reports, or delete reports
      if they so choose. Every report has certain details about the storm reported,
      and is followed by a remove button. Clicking this button will remove the report
      from the database. This means the pin will be removed from the map, and nobody
      will be able to see the report again, not even the user.

      b)Subscriptions: clicking this button will pull up a list of all the subscriptions
      the current user has made. The user can simply browse their subscriptions, or
      delete them if they so choose. Every report contains relevant details about the
      subscription, followed by a remove button. Clicking the remove button deletes
      the subscription from the database and stops the user from ever getting notifications
      for storms in the corresponding location again.
