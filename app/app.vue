<script  setup></script>
<template>
  <header>
    <!-- <nav>
      <ul>
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/dashboard">Dashboard</NuxtLink></li>
        <li><NuxtLink to="/settings">Settings</NuxtLink></li>
      </ul>
    </nav> -->
  </header>
  <main>
    <NuxtRouteAnnouncer />
    <!-- <div id="leftNav">
      <h2>Capteurs</h2>
      <ul>
        <li v-for="link in links" :key="link.deviceId">
          <NuxtLink :to="{ path: '/dashboard', query: { id: link.deviceId } }">
            Capteur {{ link.deviceId }}
          </NuxtLink>
      </li>
      </ul>
    </div> -->
    <div id="page">
      <NuxtPage />
    </div>
  </main>

  <!-- <footer>Helmo - Hackaton 2026</footer> -->
</template>

