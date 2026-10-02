const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sendTelegramNotification = require("./telegram");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Running...");
});

app.post("/complaint", async (req, res) => {
  console.log("========== NEW REQUEST ==========");
  console.log(req.body);

  try {
    console.log("Calling Telegram function...");

    await sendTelegramNotification(req.body);

    console.log("Telegram function finished.");

    res.status(200).json({
      success: true,
      message: "Complaint Submitted Successfully!",
    });

  } catch (error) {
    console.log("ERROR INSIDE SERVER:");
    console.log(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "Telegram failed",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});