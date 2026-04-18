<script setup lang="ts">
import NavBar from "~/components/nav/navBar.vue";
</script>

<template>
  <div>
    <navBar></navBar>
    <main>
      <NuxtRouteAnnouncer />
      <slot />
    </main>

    <footer>Helmo - Hackaton 2026</footer>
  </div>
</template>

<style scoped>
</style>