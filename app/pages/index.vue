<template>
  <h1>Simulator</h1>

  <div :key="trigger" id="porte" :class="{ animatePorte: triggerPorte }">porte</div>
  <div :key="trigger" id="roue" :class="{ animate: trigger }"></div>
  <div :key="trigger" id="detector" :class="{ animateDetector: triggerDetector }">detector</div>
  <div :key="trigger" id="pressure" :class="{ animate: trigger }"></div>
  <div :key="trigger" id="piston" :class="{ animate: trigger }"></div>
</template>

<script setup>

import { onMounted } from 'vue'
import mqtt from 'mqtt'
import { ref } from 'vue'

const triggerPorte = ref(false)
const triggerDetector = ref(false)

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function animatePorte(nbOpen = 1) {
  
  for (let i = 0; i < nbOpen; i++) {
    console.log("porte : " + nbOpen)
    triggerPorte.value = true
    // console.log("door opened " + i);
    await sleep(1000)
    triggerPorte.value = false
    await sleep(50)
  }
}

async function animateDetector(nbOpen = 1) {
  
  for (let i = 0; i < nbOpen; i++) {
    console.log("detector : " + nbOpen)
    triggerDetector.value = true
    // console.log("door opened " + i);
    await sleep(1000)
    triggerDetector.value = false
    await sleep(50)
  }
}

onMounted(() => {
  const seen = new Set()
  let porteCounter = ref(0)
  let detectorCounter = ref(0)

  const client = mqtt.connect('wss://hackathon.finemeca.com/mqtt')

  client.on('connect', () => {
    client.subscribe('application/+/device/+/event/up')
  })

  client.on('message', (topic, payload) => {
    const evt = JSON.parse(payload.toString())

    if (seen.has(evt.deduplicationId)) return
    seen.add(evt.deduplicationId)

    setTimeout(() => {
      seen.delete(evt.deduplicationId)
    }, 5000)
    
    const type = evt.deviceInfo.applicationName
    const capteur = evt.deviceInfo.deviceName

  if (type === "Hackathon") {
    console.log(evt)
    if (capteur === "Lab_1_compteur") {
      console.log("Lab_1_compteur triggered")
      const compteurPorte = evt.object.PA8_TOTAL_PULSE
      const compteurDetector = evt.object.PA4_TOTAL_PULSE

      if (porteCounter.value > 0) {
        animatePorte(compteurPorte - porteCounter.value)
      }

      if (detectorCounter.value > 0) {
        animateDetector(compteurDetector - detectorCounter.value)
      }

      porteCounter.value = compteurPorte
      detectorCounter.value = compteurDetector
    }
  }
    
    
    
    
    
  })
})
</script>