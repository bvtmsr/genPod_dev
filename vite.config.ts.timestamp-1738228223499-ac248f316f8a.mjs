// vite.config.ts
import react from "file:///D:/Practice/Chandu/genpod-pre-main_local/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///D:/Practice/Chandu/genpod-pre-main_local/node_modules/vite/dist/node/index.js";
import istanbul from "file:///D:/Practice/Chandu/genpod-pre-main_local/node_modules/vite-plugin-istanbul/dist/index.mjs";
var plugins = [
  react(),
  istanbul({
    cypress: true,
    requireEnv: false,
    exclude: ["socket-server", "node_modules"]
  })
];
var vite_config_default = defineConfig({
  plugins,
  server: {
    port: 3e3,
    fs: {
      strict: true
    },
    watch: {
      ignored: ["socket-server/**"]
    }
  },
  resolve: {
    alias: {
      src: "/src"
    }
  },
  esbuild: {
    exclude: "socket-server"
  },
  build: {
    rollupOptions: {
      external: ["socket-server/**", "node-pty"]
    }
  },
  optimizeDeps: {
    exclude: ["socket-server", "node-pty"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxQcmFjdGljZVxcXFxDaGFuZHVcXFxcZ2VucG9kLXByZS1tYWluX2xvY2FsXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxQcmFjdGljZVxcXFxDaGFuZHVcXFxcZ2VucG9kLXByZS1tYWluX2xvY2FsXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9QcmFjdGljZS9DaGFuZHUvZ2VucG9kLXByZS1tYWluX2xvY2FsL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IGlzdGFuYnVsIGZyb20gJ3ZpdGUtcGx1Z2luLWlzdGFuYnVsJztcbmNvbnN0IHBsdWdpbnMgPSBbXG4gIHJlYWN0KCksXG4gIGlzdGFuYnVsKHtcbiAgICBjeXByZXNzOiB0cnVlLFxuICAgIHJlcXVpcmVFbnY6IGZhbHNlLFxuICAgIGV4Y2x1ZGU6IFsnc29ja2V0LXNlcnZlcicsICdub2RlX21vZHVsZXMnXVxuICB9KVxuXTtcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IHBsdWdpbnMsXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDMwMDAsXG4gICAgZnM6IHtcbiAgICAgIHN0cmljdDogdHJ1ZVxuICAgIH0sXG4gICAgd2F0Y2g6IHtcbiAgICAgIGlnbm9yZWQ6IFsnc29ja2V0LXNlcnZlci8qKiddXG4gICAgfVxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIHNyYzogJy9zcmMnXG4gICAgfVxuICB9LFxuICBlc2J1aWxkOiB7XG4gICAgZXhjbHVkZTogJ3NvY2tldC1zZXJ2ZXInXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IFsnc29ja2V0LXNlcnZlci8qKicsICdub2RlLXB0eSddXG4gICAgfVxuICB9LFxuXG4gIG9wdGltaXplRGVwczoge1xuICAgIGV4Y2x1ZGU6IFsnc29ja2V0LXNlcnZlcicsICdub2RlLXB0eSddXG4gIH1cbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFrVCxPQUFPLFdBQVc7QUFDcFUsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxjQUFjO0FBQ3JCLElBQU0sVUFBVTtBQUFBLEVBQ2QsTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLElBQ1AsU0FBUztBQUFBLElBQ1QsWUFBWTtBQUFBLElBQ1osU0FBUyxDQUFDLGlCQUFpQixjQUFjO0FBQUEsRUFDM0MsQ0FBQztBQUNIO0FBQ0EsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUI7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLElBQUk7QUFBQSxNQUNGLFFBQVE7QUFBQSxJQUNWO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxTQUFTLENBQUMsa0JBQWtCO0FBQUEsSUFDOUI7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLO0FBQUEsSUFDUDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLFNBQVM7QUFBQSxFQUNYO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsTUFDYixVQUFVLENBQUMsb0JBQW9CLFVBQVU7QUFBQSxJQUMzQztBQUFBLEVBQ0Y7QUFBQSxFQUVBLGNBQWM7QUFBQSxJQUNaLFNBQVMsQ0FBQyxpQkFBaUIsVUFBVTtBQUFBLEVBQ3ZDO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
