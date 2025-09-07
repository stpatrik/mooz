<template>
  <header class="header">
    <div class="container">
      <div class="header-row">
        <Logo />
        <!-- v-model привязан НЕ к пропу, а к локальному computed 'model' -->
        <Search v-model="model" size="large" @submit="onSubmit" />
        <User />
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import Logo from './Logo.vue'
import User from './User.vue'
import Search from './Search.vue'

const props = defineProps({
  query: { type: String, default: '' }
})
const emit = defineEmits(['update:query', 'submitSearch'])

// прокси для v-model: читаем из пропа, пишем через emit
const model = computed({
  get: () => props.query,
  set: (v) => emit('update:query', v)
})

function onSubmit() {
  emit('submitSearch')
}
</script>