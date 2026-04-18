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
    <NuxtPage />
  </main>

  <footer>Helmo - Hackaton 2026</footer>
</template>

