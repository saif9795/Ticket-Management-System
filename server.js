const express = require("express");
const dbConnection = require("./dbConnection/dbConnection");
const dotenv = require("dotenv").config();
const authRoute = require("./routes/userAuth.routes");
const adminRoute = require("./routes/admin.routes");
const userRoute = require("./routes/user.routes");


const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

app.use("/auth", authRoute);
app.use("/admin", adminRoute);
app.use("/", userRoute);


app.listen(PORT, async()=> {
    await dbConnection();
    console.log(`Server is running at http://localhost:${PORT}`);
})