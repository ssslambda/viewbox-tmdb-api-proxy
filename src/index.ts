import { Hono } from "hono";
import { logger } from "hono/logger";

const app = new Hono();
app.use(logger());

app.all("*", (c) => {
  const originalRequest = c.req.raw.clone();
  const url = new URL(originalRequest.url);
  url.protocol = "https:";
  url.hostname = "api.themoviedb.org";
  url.port = "";
  url.searchParams.append("api_key", "e9c61faf3514198bf3e0f0a26d2dac4e");

  console.log(`Proxying ${originalRequest.method} ${url.toString()}`);

  return fetch(url, originalRequest);
});

export default app;
