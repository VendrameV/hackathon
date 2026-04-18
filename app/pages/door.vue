<script setup>
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement)

const route = useRoute()
const { capteurs } = useCapteurs()

const id = computed(() => route.query.id)
</script>


<template>
  <h1>Dashboard Capteur {{ id }}</h1>
  <div id="filters">
    <ul>
      <li>
        <label for="data1">
          Graph 1
          <input type="checkbox" id="data1" name="data1" />
        </label>
      </li>
      <li>
        <label for="data2">
          Graph 2
          <input type="checkbox" id="data2" name="data2" />
        </label>
      </li>
      <li>
        <label for="data3">
          Graph 3
          <input type="checkbox" id="data3" name="data3" />
        </label>
      </li>
    </ul>
  </div>

  <div>
    <ClientOnly>
      <Line
          :data="{
                labels: capteurs[id]?.labels || [],
                datasets: [
                    {
                    label: id || 'No device',
                    data: capteurs[id]?.data || [],
                    borderColor: `hsl(${Math.random() * 360}, 70%, 50%)`
                    }
                ]
                }"
      />
    </ClientOnly>
  </div>

</template>


