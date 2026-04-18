<template>
  <header>
    <nav>
      <ul>
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/dashboard">Dashboard</NuxtLink></li>
        <li><NuxtLink to="/settings">Settings</NuxtLink></li>
      </ul>
    </nav>
  </header>
  <main>
    <NuxtRouteAnnouncer />
    <div id="leftNav">
      <h2>Capteurs</h2>
      <ul>
        <li v-for="link in links" :key="link.deviceId">
          <NuxtLink :to="{ path: `/sensor${ link.deviceId }` }">
            Capteur {{ link.deviceId }}
          </NuxtLink>
      </li>
      </ul>
    </div>
    <div id="page">
      <NuxtPage />
    </div>
  </main>

  <footer>Helmo - Hackaton 2026</footer>
</template>

<script setup>

import mqtt from 'mqtt'
import { onMounted } from 'vue'


const links = [
  { deviceId: 'Lab_1'},
  { deviceId: 'Lab_3'},
  { deviceId: 'Lab_1_compteur'}
]

const { capteurs } = useCapteurs()

onMounted(() => {
  const client = mqtt.connect('wss://hackathon.finemeca.com/mqtt')

  client.on('connect', () => {
    client.subscribe('application/+/device/+/event/up')
  })

  client.on('message', (topic, payload) => {
    const evt = JSON.parse(payload.toString())
    const id = evt.deviceInfo.deviceName
    const value = evt.rxInfo[0].rssi
    const time = evt.time
    console.log(evt)

    const existing = capteurs[id] || { labels: [], data: [] }

    const labels = [...existing.labels, time].slice(-20)
    const data = [...existing.data, value].slice(-20)
    const borderColor = existing.borderColor
    

    capteurs[id] = {
      labels,
      data,
      borderColor
    }

    capteurs[id].labels = capteurs[id].labels.slice(-20)
    capteurs[id].data = capteurs[id].data.slice(-20)
  })
})
</script>