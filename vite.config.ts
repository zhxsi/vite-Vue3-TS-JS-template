import { defineConfig, loadEnv } from "vite"; // vite
import vue from "@vitejs/plugin-vue"; // vue
import { fileURLToPath, URL } from "node:url"; // nodejs
import vueJsx from "@vitejs/plugin-vue-jsx"; // jsx
import AutoImport from "unplugin-auto-import/vite"; // 自动导入
import Components from "unplugin-vue-components/vite"; // 组件自动导入
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"; // element-plus自动导入
import Icons from "unplugin-icons/vite"; // icons
import IconsResolver from "unplugin-icons/resolver"; // icons
import ElementPlus from "unplugin-element-plus/vite"; // element-plus
import EslintPlugin from "vite-plugin-eslint"; // eslint
import mkcert from "vite-plugin-mkcert"; //  https
import progress from "vite-plugin-progress"; // 构建显示进度条
import vueSetupExtend from "vite-plugin-vue-setup-extend"; // setup扩展 在setup中使用name属性
export default defineConfig(({ command, mode }) => {
  const { VITE_APP_HOST, VITE_APP_PORT } = loadEnv(
    mode,
    fileURLToPath(new URL("./src/env", import.meta.url)),
  );
  return {
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        dts: "typings/auto-imports.d.ts",
        resolvers: [ElementPlusResolver(), IconsResolver()],
        eslintrc: {
          enabled: true,
          filepath: "/typings/.eslintrc-auto-import.json",
        },
        imports: [
          "vue",
          "vue-router",
          { "@/stores": ["useStore"], "element-plus": ["ElMessage"] },
          "vue-i18n",
          "@vueuse/core",
        ],
      }),
      Components({
        dts: "typings/components.d.ts",
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            prefix: false,
            enabledCollections: ["ep"],
          }),
        ],
      }),
      Icons({
        autoInstall: true,
      }),
      ElementPlus({ useSource: true }),
      EslintPlugin({
        exclude: ["node_modules", "dist", "python"],
      }),
      mkcert(),
      progress({
        format: "building [:bar] :percent",
        total: 200,
        width: 60,
        complete: "=",
        incomplete: "",
      }),
      vueSetupExtend(),
    ],
    server: {
      host: VITE_APP_HOST,
      port: Number(VITE_APP_PORT),
      cors: true,
      open: true,
    },
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: (assetInfo) => {
            const fileTypes = {
              "favicon.ico": "[name].[ext]",
              "favicon.png": "[name].[ext]",
              "favicon.svg": "[name].[ext]",
              "\\.(woff2?|eot|ttf|otf)(\\?.*)?$":
                "static/fonts/[name]-[hash].[ext]",
              "\\.(png|jpe?g|gif|svg)(\\?.*)?$":
                "static/images/[name]-[hash].[ext]",
              "\\.css$": "static/css/[name]-[hash].[ext]",
              "\\.(mp4|webm|ogg|mp3|wav|flac|aac)(\\?.*)?$":
                "static/videos/[name]-[hash].[ext]",
            };

            for (const fileType in fileTypes) {
              if (assetInfo.name && new RegExp(fileType).test(assetInfo.name)) {
                return fileTypes[fileType];
              }
            }

            // Default return value
            return "static/[name]-[hash].[ext]";
          },
          manualChunks(id) {
            if (id.includes("node_modules")) {
              const moduleName = id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();

              const usedModules = ["vue"];
              if (usedModules.includes(moduleName)) {
                return moduleName;
              }
            }
          },
        },
      },
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      sourcemap: false,
      // assetsInlineLimit: 1024 * 10,
    },
    envDir: fileURLToPath(new URL("./src/env", import.meta.url)),
    publicDir: false,
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: ``, // 全局scss
        },
      },
    },
  };
});
