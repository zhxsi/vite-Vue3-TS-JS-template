<template>
  <template v-for="(item, index) in props.menuList" :key="index">
    <el-menu-item
      v-if="!item.children || item.children.length === 0"
      :index="item.meta?.index"
      @click="handleMenuClick(item)"
    >
      <ep-menu />
      <span>{{ item.meta?.title }}</span>
    </el-menu-item>
    <el-sub-menu v-else :index="item.meta?.index ?? ''">
      <template #title>
        <ep-menu />
        <span>{{ item.meta?.title }}</span>
      </template>
      <asidemenu :menuList="item.children" @menuClick="handleMenuClick" />
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts" name="asidemenu">
import type { RouteRecordNormalized, RouteRecordRaw } from "vue-router";
const props = defineProps<{
  menuList: Array<RouteRecordNormalized | RouteRecordRaw> | undefined;
}>();
const emit = defineEmits(["menuClick"]);
const handleMenuClick = (item: RouteRecordNormalized | RouteRecordRaw) => {
  emit("menuClick", item);
};
</script>
