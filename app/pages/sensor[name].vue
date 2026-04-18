<script setup lang="ts">
import LineChart from "~/components/LineChart.vue";
import DetailedView from "~/components/detailedView.vue";

defineProps<{ name: string }>()
</script>

<template>
  <detailed-view :title=name >
    <template #left>
      <LineChart />
      <MqttFetch />
    </template>
    <template #right>
      <ul>
        <li>TEST</li>
        <li>TEST</li>
      </ul>
    </template>
  </detailed-view>
</template>

<style scoped lang="scss">

</style>