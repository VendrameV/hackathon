<script lang="ts" setup>
import { nextTick } from 'vue'

const animateById = (id:string) => {
  nextTick(() => {
    const el = document.getElementById(id)
    if (!el) return

    const className = `animate${id.charAt(0).toUpperCase() + id.slice(1)}`

    // reset animation
    el.classList.remove(className)
    void el.offsetWidth
    el.classList.add(className)
  })
}

defineExpose({ animateById })
</script>

<template>
  <slot></slot>
</template>
