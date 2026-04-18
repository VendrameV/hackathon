
<template>
  <div class="card">
    <Menubar :model="items">
      <template #start>
        <img src="../../resources/LogoSanglier.png" alt="Logo" height="40" class="mr-2" />
      </template>
      <template #item="{ item, props, hasSubmenu }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon" />
            <span>{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
          <span :class="item.icon" />
          <span>{{ item.label }}</span>
          <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
        </a>
      </template>
    </Menubar>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: () => {
      router.push('/');}
  },
  {
    label: 'Counter',
    icon: 'pi pi-chart-line',
    items: [
      {
        label: 'Wheel',
        route: '/wheel'
      },
      {
        label: 'door',
        route: '/door'
      },
      {
        label: 'Motion Detector',
        route: '/motionDetector'
      }
    ]
  },
  {
    label: 'Pressure Sensor',
    icon: 'pi pi-chart-bar',
    items: [
      {
        label: 'Bar Pressure Sensor',
        route: '/BarPressure'
      }
    ]
  }
]);
</script>
