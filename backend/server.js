const express = require('express');
const connectDB = require('./config/db');
const ExpenseRoute = require('./routes/expenseRoute')
const AuthRoute = require('./routes/authRoute');
const cors = require('cors')
const PORT = 3001;
const app = express();

// Relax CORS for local development across ports (e.g., 3000/5173)
app.use(cors());
app.use(express.json());
connectDB();


app.use('/api/Expense',ExpenseRoute)

app.use('/api/auth', AuthRoute);

app.listen(3001,()=>{
    console.log("server is running")
})