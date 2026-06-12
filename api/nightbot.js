export default async function handler(req, res) {
  try {
    const q = req.query.q || "Hello";
    // 呼叫 Google Gemini API
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + process.env.GOOGLE_API_KEY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: q }] }]
      })
    });

    const data = await response.json();

    // 確保有回傳
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
}

