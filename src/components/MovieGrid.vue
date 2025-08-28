<template>
  <!-- Рендерим только валидные фильмы -->
  <section class="grid movie-grid" role="list">
    <MovieCard
      v-for="m in safeMovies"
      :key="m.imdbID"
      :movie="m"
      role="listitem"
    />
  </section>
</template>

<script setup>
import { computed } from 'vue'
import MovieCard from './MovieCard.vue'

const props = defineProps({
  movies: { type: Array, default: () => [] }
})

/* Отбрасываем «битые» элементы, чтобы не возникали пустые карточки */
const safeMovies = computed(() =>
  (props.movies || []).filter(m => m && m.imdbID && m.Title)
)
</script>
