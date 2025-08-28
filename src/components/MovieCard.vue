<template>
  <article class="movie-card">
    <div class="poster-box">
      <img
        v-if="posterUrl"
        class="poster-img"
        :src="posterUrl"
        :alt="movie.Title"
        loading="lazy"
      />
      <div v-else class="poster-placeholder" aria-hidden="true">
        <svg width="88" height="66" viewBox="0 0 88 66" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1.5" y="1.5" width="85" height="63" rx="10" stroke="#CBD5E1" stroke-width="2"/>
          <circle cx="62" cy="24" r="7" stroke="#CBD5E1" stroke-width="2"/>
          <path d="M12 52L32 36l16 10 12-9 16 15H12Z" stroke="#CBD5E1" stroke-width="2" fill="none"/>
        </svg>
      </div>
    </div>

    <ul class="card-meta">
      <li><span class="label">Name:</span>{{ movie.Title }}</li>
      <li><span class="label">Year:</span>{{ movie.Year }}</li>
      <li><span class="label">imdbID:</span>{{ movie.imdbID }}</li>
      <li><span class="label">Type:</span>{{ movie.Type }}</li>
    </ul>
  </article>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({ movie: { type: Object, required: true } })

const posterUrl = computed(() => {
  const p = props.movie?.Poster
  return p && p !== 'N/A' ? p : ''
})
</script>
