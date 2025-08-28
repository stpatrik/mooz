<template>
  <div class="pagination-wrapper" v-if="totalPages > 1">
    <nav class="pagination" aria-label="Pagination">
      <!-- Prev -->
      <button
        class="page-btn arrow"
        :disabled="modelValue <= 1"
        @click="$emit('update:modelValue', modelValue - 1)"
        aria-label="Previous page"
      >‹</button>

      <!-- Первая страница и левое многоточие -->
      <button
        v-if="showFirst"
        class="page-btn"
        :class="{ active: modelValue === 1 }"
        @click="$emit('update:modelValue', 1)"
      >1</button>
      <span v-if="showLeftDots" class="dots">…</span>

      <!-- Три страницы: предыдущая, текущая, следующая -->
      <button
        v-for="p in centerPages"
        :key="p"
        class="page-btn"
        :class="{ active: modelValue === p }"
        @click="$emit('update:modelValue', p)"
      >{{ p }}</button>

      <!-- Правое многоточие и последняя -->
      <span v-if="showRightDots" class="dots">…</span>
      <button
        v-if="showLast"
        class="page-btn"
        :class="{ active: modelValue === totalPages }"
        @click="$emit('update:modelValue', totalPages)"
      >{{ totalPages }}</button>

      <!-- Next -->
      <button
        class="page-btn arrow"
        :disabled="modelValue >= totalPages"
        @click="$emit('update:modelValue', modelValue + 1)"
        aria-label="Next page"
      >›</button>
    </nav>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: Number, default: 1 },
  totalPages: { type: Number, default: 1 }
})
const emit = defineEmits(['update:modelValue'])

/**
 * Логика: показываем максимум 3 страницы по центру:
 * current-1, current, current+1 (в границах 1..total)
 * + стрелки + «1»/«последняя» + многоточия по бокам.
 */
const centerPages = computed(() => {
  if (props.totalPages <= 5) {
    // Короткие списки — показываем все
    return Array.from({ length: props.totalPages }, (_, i) => i + 1)
  }
  const pages = new Set()
  pages.add(clamp(props.modelValue - 1))
  pages.add(clamp(props.modelValue))
  pages.add(clamp(props.modelValue + 1))
  // Убираем 1 и last (они рисуются отдельно)
  pages.delete(1)
  pages.delete(props.totalPages)
  return Array.from(pages).sort((a, b) => a - b)
})

const showFirst = computed(() => props.totalPages > 5)
const showLast  = computed(() => props.totalPages > 5)

const showLeftDots = computed(() => {
  if (props.totalPages <= 5) return false
  const minCenter = centerPages.value[0]
  return minCenter > 2
})

const showRightDots = computed(() => {
  if (props.totalPages <= 5) return false
  const maxCenter = centerPages.value[centerPages.value.length - 1]
  return maxCenter < props.totalPages - 1
})

function clamp(p) {
  if (p < 1) return 1
  if (p > props.totalPages) return props.totalPages
  return p
}
</script>
