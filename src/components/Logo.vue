<template>
  <div class="brand" aria-label="MOOZ">
    <img class="brand-logo" src="@/assets/logo/logo.svg" alt="MOOZ logo" />
    <img class="brand-text" src="@/assets/logo/mooz-wordmark.svg" alt="MOOZ logo" width="71px" length="17px"/>
  </div>
</template>

<script setup>
</script>

<style scoped>
.brand {
  display: flex;
  align-items: center;
  gap: 13px; /* расстояние между иконкой и текстом */
}

.brand-logo {
  width: 40px;
  height: 30px;
}

.brand-text {
  width: 72px;
  height: 18px;
}
</style>
