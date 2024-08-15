const { z } = require("zod");

const user = z.object({
    username: z.string(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string()
});

module.exports = user;