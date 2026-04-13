# Thunder Bear MMA Inventory

An inventory management app for a martial arts gym. Track equipment stock across categories, add or remove items, and update quantities and categories in bulk from a single page.

![Thunder Bear MMA Inventory](public/images/thunder-bear.png)

## Features

- Browse inventory by category or view all items at once
- Inline bulk editing — edit every item's name, category, and stock on one page and save all changes at once
- Add and delete items and categories
- Search items and categories by name

## Tech Stack

- **Backend:** Node.js, Express 5
- **Templating:** EJS
- **Database:** PostgreSQL (via `pg`)
- **Styling:** Vanilla CSS

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL

### Setup

1. Clone the repo and install dependencies:

```bash
git clone https://github.com/teaghanjohnson/inventory-application.git
cd inventory-application
npm install
```

2. Create a `.env` file in the project root with your database credentials:

```
PGHOST=localhost
PGUSER=your_user
PGDATABASE=your_database
PGPASSWORD=your_password
PGPORT=5432
```

3. Create the database and seed it:

```bash
psql -c "CREATE DATABASE your_database;"
node db/populatedb.js
```

4. Start the server:

```bash
npm start
```

The app runs on [http://localhost:3000](http://localhost:3000).

## Project Structure

```
├── app.js                  # Express app entry point
├── controllers/
│   ├── itemController.js
│   └── categoryController.js
├── db/
│   ├── pool.js             # PostgreSQL connection pool
│   ├── queries.js          # All database queries
│   └── populatedb.js       # Schema creation and seed data
├── routes/
│   ├── itemsRouter.js
│   └── categoriesRouter.js
├── views/                  # EJS templates
└── public/                 # Static assets (CSS, images)
```