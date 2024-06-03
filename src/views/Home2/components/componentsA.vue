<template>
  <div>
    <el-button @click="valChange">{{ props.count }}</el-button>
  </div>
</template>

<script setup>
// 接收父组件传递的数据
const props = defineProps(["count"]);
const emit = defineEmits(["deleteOutcome"]);
// 点击按钮触发父组件的事件
const valChange = () => {
  emit("deleteOutcome");
};
</script>

<style lang="scss" scoped></style>
