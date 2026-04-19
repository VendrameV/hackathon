<script lang="ts" setup>
import { nextTick } from "vue";

const animateById = (id: string, shouldAnimate: boolean) => {
  nextTick(() => {
    const el = document.getElementById(id);
    if (!el) return;

    const className = `animate${id.charAt(0).toUpperCase() + id.slice(1)}`;

    // reset animation
    if (shouldAnimate) {
      el.classList.add(className);
      console.log("add"+className)
    } 
    void el.offsetWidth;
    if (!shouldAnimate){
      el.classList.remove(className);
      console.log("remove"+className)
    }
  });
};

defineExpose({ animateById });
</script>

<template>
  <slot></slot>
</template>
