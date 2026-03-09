import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import base44 from "@base44/vite-plugin"

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [react(), cloudflare()],
});