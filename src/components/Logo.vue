<template>
  <div class="brand">
    <!-- иконка -->
    <img src="public/logo.svg" alt="Logo icon" class="brand-logo" />

    <!-- текст -->
    <img src="/mooz-wordmark.svg" alt="MOOZ" class="brand-text" />
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
