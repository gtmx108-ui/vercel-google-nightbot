export default async function handler(req, res) {
  try {
    const q = req.query.q || "Hello";

    // 呼叫 Google Gemini API
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" +
        process.env.GOOGLE_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: q }] }]
        })
      }
    );

    const data = await response.json();

    // 嘗試解析 Gemini API 回傳的文字
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "⚠️ 沒有回覆";

    // 回傳文字給使用者
    res.status(200).send(reply);

  } catch (error) {
    console.error("API Error:", error);
    res.status(500).send("Error: " + error.message);
  }
}
