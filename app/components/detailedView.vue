<script setup lang="ts">

const props = defineProps<{ title: string }>()

</script>

<template>
  <div class="flex responsive-wrap">
    <h2>{{ props.title }}</h2>
    <section class="pane">
      <slot name="left" />
    </section>

    <section class="pane">
      <slot name="right" />
    </section>
  </div>
</template>

<style scoped lang="scss">
.flex{
  display: flex;
}

@media (max-width: 640px){
  .responsive-wrap{
    flex-wrap: wrap;
  }

  .pane{
    flex-basis: 100%;
  }
}

@media (width > 640px){
  .responsive-wrap{
    flex-wrap: nowrap;
  }

  .pane{
    flex-basis: 50%;
    justify-content: center;
  }
}



</style>