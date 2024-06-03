<template>
  <div>
    <el-button @click="count++">{{ count }}</el-button>
    <componentsA :count="count" @deleteOutcome="valChange" />
  </div>
</template>
<script setup name="Home1-1" lang="ts">
import componentsA from "./components/componentsA.vue";
const count = ref<number>(0);

const valChange = () => {
  count.value--;
  console.log(123);
};
</script>

<style lang="scss" scoped></style>
