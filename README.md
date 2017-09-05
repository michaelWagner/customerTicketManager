# Customer Ticket Manager

### An application where customers can manage their assigned tickets.

#### Authored by: Mike Wagner

Once logged in, a user can:
* Authenticates a user from an API call
* Can create new tickets.
* Search for a ticket by ID or filter by date.
* Show ticket details.
* Summary page show stats.
* Shows all tickets in the reports sections.
* Can paginate tickets.

Clone repo from your console:

`git clone https://github.com/michaelWagner/customerTicketManager.git`

To build this project:
cd to project directory and run:

### `bower install grunt`

then,
### `npm install`

then,

### `npm start`

Which runs the app in the development mode.<br>
Open [http://localhost:3006](http://localhost:3006) to view it in the browser.

Also being hosted on heroku at [https://customer-ticket-manager.herokuapp.com](https://customer-ticket-manager.herokuapp.com)


TODOS:
* Filter tickets.
* There is a db error preventing new notes from being saved.
* Summary data is currently mocked due to an API error.
* Show status colors on report page.
