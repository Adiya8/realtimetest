// ./config.ts
export const config = {
  ABLY_KEY: process.env.ABLY_KEY || "",
  CHANNEL_NAME: process.env.CHANNEL_NAME || "objects-live-map",
};

if (!config.ABLY_KEY) {
  throw new Error("❌ Missing ABLY_KEY in .env.local");
}
