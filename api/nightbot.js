export default async function handler(req, res) {
  const q = req.query.q || "Hello";

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GOOGLE_API_KEY}`
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: q }]}]
      })
    }
  );

  const data = await response.json();
  const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ 沒有回覆";

  res.status(200).send(reply);
}
