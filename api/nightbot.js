export default async function handler(req, res) {
  try {
    const q = req.query.q || "Hello";
    const debug = req.query.debug === "true"; // 判斷是否開啟 debug 模式

    // 呼叫 Google Gemini API (改成 gemini-1.5-flash 或 gemini-1.5-pro)
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
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

    if (debug) {
      // Debug 模式：直接回傳完整 JSON
      res.status(200).json(data);
    } else {
      // 一般模式：只回傳文字
      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "⚠️ 沒有回覆";

      res.status(200).send(reply);
    }
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).send("Error: " + error.message);
  }
}
