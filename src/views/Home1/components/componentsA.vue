<template>
  <div>
    <el-button @click="valChange">{{ props.count }}</el-button>
  </div>
</template>

<script setup lang="ts">
// const props = defineProps(["count"]);
const props = defineProps<{ count: number }>();
const emit = defineEmits(["deleteOutcome"]);
const valChange = () => {
  emit("deleteOutcome");
};
</script>

<style lang="scss" scoped></style>
