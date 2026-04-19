<script lang="ts" setup>
import { onMounted } from "vue";
import mqtt from "mqtt";
import { ref, watch } from 'vue'

const triggerPorte = ref(false);
const triggerDetector = ref(false);
const triggerRoue = ref(false);
const triggerPiston = ref(false);
const boardRef = ref();


const seen = new Set();
const porteCounter = ref(0);
const detectorCounter = ref(0);
const roueCounter = ref(0);
const pistonCurrent = ref(false);

function sleep(ms:number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const trigger = (switchi:any,id:string) => {
  watch(switchi, (val) => {
  boardRef.value?.animateById(id,val);
})
}

trigger(triggerPorte,'porte');
trigger(triggerDetector,'detector');
trigger(triggerRoue,'roue');
trigger(triggerPiston,'piston');

async function animatePorte(nbOpen = 1) {
  console.log("porte : " + nbOpen);
  for (let i = 0; i < nbOpen; i++) {
    triggerPorte.value = true;
    // console.log("door opened " + i);
    await sleep(2000);
    triggerPorte.value = false;
    await sleep(50);
  }
}

async function animateDetector(nbOpen = 1) {
  console.log("detector : " + nbOpen);
  for (let i = 0; i < nbOpen; i++) {
    triggerDetector.value = true;
    // console.log("door opened " + i);
    await sleep(2000);
    triggerDetector.value = false;
    await sleep(50);
  }
}

async function animateRoue(nbOpen = 1) {
  console.log("roue : " + nbOpen);
  for (let i = 0; i < nbOpen; i++) {
    triggerRoue.value = true;
    // console.log("door opened " + i);
    await sleep(2000);
    triggerRoue.value = false;
    await sleep(50);
  }
}

async function animatePiston(nbOpen = 1) {
  console.log("piston : ouvert");
  for (let i = 0; i < nbOpen; i++) {
    triggerPiston.value = true;
    // console.log("door opened " + i);
    await sleep(2000);
    triggerPiston.value = false;
    await sleep(50);
  }
}



function triggerElement(event:any) {
  animateDetector(5);
  animatePiston(5);
  animateRoue(5);
  animatePorte(5);
}

triggerElement("")

onMounted(() => {
  const client = mqtt.connect("wss://hackathon.finemeca.com/mqtt");

  client.on("connect", () => {
    client.subscribe("application/+/device/+/event/up");
  });

  client.on("message", (topic, payload) => {
    const evt = JSON.parse(payload.toString());

    if (seen.has(evt.deduplicationId)) return;
    seen.add(evt.deduplicationId);

    setTimeout(() => {
      seen.delete(evt.deduplicationId);
    }, 30000);

    const type = evt.deviceInfo.applicationName;
    const capteur = evt.deviceInfo.deviceName;

    if (type === "Hackathon") {
      console.log(evt);
      if (capteur === "Lab_1_compteur") {
        console.log("Lab_1_compteur triggered");
        const compteurPorte = evt.object.PA8_TOTAL_PULSE;
        const compteurDetector = evt.object.PA4_TOTAL_PULSE;

        if (porteCounter.value > 0) {
          animatePorte(compteurPorte - porteCounter.value);
        }

        if (detectorCounter.value > 0) {
          animateDetector(compteurDetector - detectorCounter.value);
        }

        porteCounter.value = compteurPorte;
        detectorCounter.value = compteurDetector;
      } else if (capteur === "Lab_1") {
        console.log("Lab_1 triggered");
        const compteurRoue = evt.object.Count1_times;
        const pistonStatus = evt.object.DI2_status;

        if (roueCounter.value > 0) {
          animateRoue(compteurRoue - roueCounter.value);
        }

        if (pistonStatus) {
          animatePiston();
        }

        pistonCurrent.value = false;

        roueCounter.value = compteurRoue;
      }
    }
  });
});

</script>

<template>
  <h1>Simulator</h1>
  <BoardBed ref="boardRef" >
    <ListeningBoardSVG></ListeningBoardSVG>
    <div class="bg-red-500 text-white p-4">
  
</div>
  </BoardBed>
</template>
