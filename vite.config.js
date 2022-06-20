import { defineConfig, loadEnv } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig(({ command, mode }) => {
  console.log("command: ", command);
  console.log("mode: ", mode);
  const env = loadEnv(mode, process.cwd(), "");
  console.log("env: ", env);
  const { BASE_URL, PORT, VITE_API_BASE_URL } = loadEnv(mode, process.cwd(), "");
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
    define: {
      API_BASE_URL: VITE_API_BASE_URL,
    }
  };
});
