const axios = require("axios");
require("dotenv").config();

async function sendTelegramNotification(complaint) {
  const message = `
🚨 New Complaint

👤 Name: ${complaint.name}
🏢 Department: ${complaint.department}
📂 Category: ${complaint.category}

📝 Complaint:
${complaint.message}

Status: Pending
`;

  console.log("Sending to Telegram...");
  console.log("CHAT_ID:", process.env.CHAT_ID);

  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
      {
        chat_id: process.env.CHAT_ID,
        text: message,
      }
    );

    console.log("Telegram Success:", response.data);

  } catch (error) {
    console.log("Telegram Failed!");

    if (error.response) {
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    throw error;
  }
}

module.exports = sendTelegramNotification;