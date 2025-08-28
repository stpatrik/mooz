<template>
  <header class="header" role="banner">
    <div class="container">
      <div class="header-row">
        <!-- твой бренд -->
        <div class="brand" aria-label="MOOZ">
          <img class="brand-logo" src="/logo.svg" alt="" />
          <img class="brand-logo" src="/mooz-wordmark.svg" alt="" />
        </div>

        <!-- новый компонент поиска -->
        <SearchInput
          v-model="localQuery"
          @submit="onSubmit"
          placeholder="Batman"
          aria-label="Поиск фильмов"
        />

        <!-- пользователь -->
        <div class="user">
          <img class="user-icon" src="/user.svg" alt="" />
          <span>Your Name</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue'
import SearchInput from './SearchInput.vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  loading: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue', 'submit'])

const localQuery = ref(props.modelValue)
watch(() => props.modelValue, v => { if (v !== localQuery.value) localQuery.value = v })
watch(localQuery, v => emit('update:modelValue', v))

function onSubmit () {
  emit('submit')
}
</script>
