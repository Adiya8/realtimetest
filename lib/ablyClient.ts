import { Realtime } from "ably";
import Objects from "ably/objects";
import { nanoid } from "nanoid";
import { config } from "./config";

export const ablyClient = new Realtime({
  clientId: nanoid(),
  key: config.ABLY_KEY,
  plugins: { Objects },
});

export const channel = ablyClient.channels.get(config.CHANNEL_NAME, {
  modes: ["OBJECT_PUBLISH", "OBJECT_SUBSCRIBE"],
});
