const { verifyKey } = require("discord-interactions");
const getRawBody = require("raw-body");

module.exports = async (req, res) => {
  if (req.method === "POST") {
    const signature = req.headers["x-signature-ed25519"];
    const timestamp = req.headers["x-signature-timestamp"];
    const rawBody = await getRawBody(req);

    // Verify the request
    const isValidRequest = verifyKey(rawBody, signature, timestamp, process.env.PUBLIC_KEY);
    if (!isValidRequest) {
      return res.status(401).send("Invalid request signature");
    }

    const interaction = JSON.parse(rawBody);

    // Respond to Discord's PING
    if (interaction.type === 1) {
      return res.status(200).json({ type: 1 });
    }

    // Respond to a sample slash command `/hello`
    if (interaction.type === 2 && interaction.data.name === "hello") {
      return res.status(200).json({
        type: 4,
        data: { content: "Hello from Vercel!" },
      });
    }

    return res.status(400).send("Unknown interaction type");
  }

  res.status(405).send("Method not allowed");
};
