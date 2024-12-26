const { InteractionResponseType } = require("discord-api-types/v10");

module.exports = async (req, res) => {
  if (req.method === "POST") {
    const body = req.body;

    // Respond to Discord PING for verification
    if (body.type === 1) {
      return res.status(200).json({ type: InteractionResponseType.Pong });
    }

    // Handle interactions (e.g., slash commands)
    if (body.type === 2) {
      const commandName = body.data.name;

      // Example: Respond to `/hello` command
      if (commandName === "hello") {
        return res.status(200).json({
          type: 4,
          data: {
            content: "Hello! This is a bot running on Vercel!",
          },
        });
      }
    }

    res.status(400).json({ error: "Unknown interaction type." });
  } else {
    res.status(405).send("Method not allowed.");
  }
};
