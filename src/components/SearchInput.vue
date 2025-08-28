<template>
  <!-- Обёртка-форма ради Enter и доступности -->
  <form
    class="search search--large"
    role="search"
    aria-label="Поиск фильмов"
    @submit.prevent="emit('submit')"
  >
    <input
      type="search"
      autocomplete="off"
      :placeholder="placeholder"
      :aria-label="ariaLabel"
      :value="modelValue"
      @input="onInput"
    />

    <!-- просто иконка (не кнопка) — стилизуется глобальными стилями -->
    <span class="search-icon" aria-hidden="true"></span>
  </form>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: 'Batman' },
  ariaLabel: { type: String, default: 'Поиск' },
})

const emit = defineEmits(['update:modelValue', 'submit'])

function onInput (e) {
  emit('update:modelValue', e.target.value)
}
</script>
