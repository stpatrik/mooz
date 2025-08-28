<template>
  <div class="info">
    <span>You searched for: <strong>{{ query }}</strong></span>
    <span class="badge">{{ formattedTotal }} results</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  query: { type: String, default: '' },
  // ⚠️ имя именно totalResults (в App.vue передаём :total-results="...")
  totalResults: { type: [Number, String], default: 0 },
})

const formattedTotal = computed(() => {
  const n = Number(props.totalResults) || 0
  return n.toLocaleString() // 617 → "617", 12345 → "12,345"
})
</script>
