import { defineConfig, loadEnv } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig(({ command, mode }) => {
  console.log("command: ", command);
  console.log("mode: ", mode);
  const { BASE_URL, PORT } = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [svelte()],
    base: mode === "production" ? BASE_URL : "/",
    preview: {
      port: PORT,
      host: "localhost",
    },
    server: {
      port: PORT,
      host: "localhost",
      open: true,
    },
  };
});
