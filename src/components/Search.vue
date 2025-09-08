<!-- src/components/Search.vue -->
<template>
  <form
    class="search"
    :class="{'search--large': size === 'large'}"
    @submit.prevent="onSubmit"
    role="search"
    aria-label="Поиск фильмов"
  >
    <input
      v-model="proxy"
      type="search"
      :placeholder="placeholder"
      :aria-label="`Поиск: ${proxy || 'введите запрос'}`"
    />
    <button class="search-icon" type="submit" aria-label="Искать"></button>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },   // для v-model
  placeholder: { type: String, default: 'Batman' },
  size: { type: String, default: 'large' }     // чтобы можно было задать search--large
})
const emit = defineEmits(['update:modelValue', 'submit'])

const proxy = ref(props.modelValue)
watch(() => props.modelValue, v => { if (v !== proxy.value) proxy.value = v })
watch(proxy, v => emit('update:modelValue', v))

function onSubmit() {
  emit('submit') // родитель вызовет свой submitSearch()
}
</script>

