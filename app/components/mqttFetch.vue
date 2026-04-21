<script lang="ts" setup>
import mqtt from "mqtt";
const c = mqtt.connect("wss://hackathon.finemeca.com/mqtt");
c.on("connect", () => c.subscribe("application/+/device/+/event/up"));
c.on("message", (topic, payload) => {
  const evt = payload;
  console.log(evt);
});
</script>

<template></template>
