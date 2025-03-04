Rrenjet
Rrenjet is a web platform that allows users to explore and learn about Albanian personalities.

Download DB from project for a better experience
admin user
email: admin@rrenjet.com
pass: 123123123

Installation
1. Clone the Repository
git clone https://github.com/lprekadini/rrenjet.git
cd rrenjet
2. Install Backend Dependencies
cd backend
npm install
3. Configure the Database
Ensure MySQL is installed and running.
Create a database named rrenjet.
Database credentials:
Username: homestead
Password: secret
Host: 127.0.0.1
Port: 8889
4. Run Database Migrations & Seeders
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
5. Start the Backend Server
npm run dev

Frontend Setup
1. Install Frontend Dependencies
cd ../frontend
npm install
2. Start the Frontend
npm run dev