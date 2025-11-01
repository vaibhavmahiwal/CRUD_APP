Node Hotel Application

A Node.js + Express.js based hotel management API using MongoDB for data storage.
It manages staff (persons) and menu items, providing full CRUD operations for both.

⚙️ Tech Stack

Node.js

Express.js

MongoDB (Mongoose)

📁 Features
👥 Persons API

➕ Add Person → POST /person — Add a new person

📄 Get All Persons → GET /person — Retrieve all persons

🔍 Get Persons by Work Type → GET /person/:workType — Filter persons by role (chef, waiter, manager, etc.)

✏️ Update Person → PUT /person/:id — Update person details by ID

❌ Delete Person → DELETE /person/:id — Remove a person by ID

🍽️ Menu API

➕ Add Menu Item → POST /menu — Add a new menu item

📄 Get All Menu Items → GET /menu — Retrieve all menu items

🔍 Get Menu Items by Taste → GET /menu/:taste — Filter menu items by taste (sweet, spicy, sour, etc.)

✏️ Update Menu Item → PUT /menu/:id — Update menu item details by ID

❌ Delete Menu Item → DELETE /menu/:id — Remove a menu item by ID

🧩 Data Models
👤 Person
{
  "name": "John Doe",
  "age": 30,
  "work": "waiter",
  "mobile": "123-456-7890",
  "email": "john@example.com",
  "address": "123 Main Street",
  "salary": 30000
}

🍴 Menu Item
{
  "name": "Dal Makhni",
  "price": 12.99,
  "taste": "spicy",
  "is_drink": false,
  "ingredients": ["daal", "spices", "vegetables"],
  "num_sales": 50
}

🚀 How to Run
# Install dependencies
npm install

# Start the server
npm start


Server will start on the default port (e.g., http://localhost:3000
).
