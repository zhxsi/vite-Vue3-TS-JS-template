<template>
  <div>
    <el-button @click="count++">{{ count }}</el-button>
    <componentsA :count="count" @deleteOutcome="doSomething" />
  </div>
</template>

<script setup>
import componentsA from "./components/componentsA.vue";
const count = ref(0);
const doSomething = () => {
  count.value--;
};
</script>

<style lang="scss" scoped></style>
