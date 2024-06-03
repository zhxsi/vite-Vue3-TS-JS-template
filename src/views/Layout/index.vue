<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        {{ $t("Header") }}
        <el-switch v-model="value1" @change="toggleDark()" />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            :default-active="router.currentRoute.value.meta.index"
            unique-opened
            class="el-menu-vertical-demo"
          >
            <template
              v-for="(item, index) in filterRoutes(router.getRoutes())"
              :key="index"
            >
              <template v-if="item.children?.length === 1">
                <template
                  v-for="(item2, index2) in item.children"
                  :key="index2"
                >
                  <el-menu-item
                    v-if="!item2.children || item2.children?.length === 0"
                    :index="item2.meta?.index"
                    @click="handleRoute(item2)"
                  >
                    <ep-menu />
                    <span>{{ item2.meta?.title }}</span>
                  </el-menu-item>

                  <el-sub-menu v-else :index="item2.meta?.index ?? ''">
                    <template #title>
                      <ep-menu />
                      <span>{{ item.meta?.title }}</span>
                    </template>
                    <asidemenu
                      :menuList="item2.children"
                      @menuClick="handleRoute"
                    />
                  </el-sub-menu>
                </template>
              </template>
              <template v-else>
                <el-sub-menu :index="item.meta?.index ?? ''">
                  <template #title>
                    <ep-menu />
                    <span>{{ item.meta?.title }}</span>
                  </template>
                  <asidemenu
                    :menuList="item.children"
                    @menuClick="handleRoute"
                  /> </el-sub-menu
              ></template>
            </template>
          </el-menu>
        </el-aside>
        <el-main>
          <el-page-header @back="() => router.go(-1)">
            <template #content>
              <span class="text-large font-600 mr-3">
                {{ router.currentRoute.value.meta.title }}
              </span>
            </template>
          </el-page-header>
          <router-view v-slot="{ Component }">
            <keep-alive :include="store.cachedViews">
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import asidemenu from "./components/asidemenu.vue";
import type { RouteRecordNormalized, RouteRecordRaw } from "vue-router";
import { getIp } from "@/api/index";
const value1 = ref<boolean>(false);
const toggleDark = useToggle(useDark());
const router = useRouter();
const route = useRoute();
const menuList = ref<Array<RouteRecordNormalized | RouteRecordRaw>>([]);
const filterRoutes = (
  routes: RouteRecordNormalized[] | RouteRecordRaw[],
  level: number = 1,
): RouteRecordNormalized[] | RouteRecordRaw[] => {
  return routes
    .filter((route) => {
      if (
        route.path !== "/404" &&
        (level > 1 || route.redirect !== undefined)
      ) {
        if (route.meta && route.meta.hidden !== true) {
          return true;
        }
      }
      return false;
    })
    .map((route) => {
      if (route.children) {
        route.children = filterRoutes(route.children, level + 1);
      }
      return route;
    });
};
menuList.value = filterRoutes(router.getRoutes());
const store = useStore();
// 路由跳转
const handleRoute = (item: RouteRecordNormalized | RouteRecordRaw) => {
  if (item.name !== undefined) {
    store.addCacheRoute(item.name as string);
    router.push(item.path);
  }
};

onMounted(() => {
  window.addEventListener("beforeunload", () => {
    // store.clearCacheRoute(router.currentRoute.value.name);
    if (route.name !== null && route.name !== undefined) {
      store.clearCacheRoute(route.name as string);
    }
  });
  getIp().then((res) => {
    console.log(res);
  });
});
</script>

<style lang="scss" scoped>
.common-layout {
  height: 100vh;

  .el-container {
    height: 100%;

    .el-header {
      // background-color: #b3c0d1;
      outline: 1px solid;
    }

    .el-container {
      height: 100%;

      .el-aside {
        // background-color: #d3dce6;
        outline: 1px solid;
      }

      .el-main {
        // background-color: #e9eef3;
        outline: 1px solid;
      }
    }
  }
}
</style>
