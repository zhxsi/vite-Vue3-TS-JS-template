<template>
  <div>
    <el-config-provider :locale="locale">
      <router-view v-if="isRouterAlive" />
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import zh from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";
const locale = ref(zh);
const toggleLanguage = (val: string) => {
  locale.value = val === "en" ? en : zh;
};
provide("toggleLanguage", toggleLanguage);
const isRouterAlive = ref(true);
const reload = () => {
  isRouterAlive.value = false;
  nextTick(function () {
    isRouterAlive.value = true;
  });
};
provide("reload", reload);
</script>

<style scoped></style>
