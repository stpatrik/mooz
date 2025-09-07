<template>
    <Header v-model:query="query" @submitSearch="submitSearch" />

  <main>
    <div class="container">
      <div class="info" v-if="!loading && totalResultsNum > 0">
        <span>You searched for: <u>{{ queryShown }}</u></span>
        <span class="badge">{{ totalResultsNum }} results</span>
      </div>

      <Loader v-if="loading" />
      <EmptyState v-else-if="!loading && movies.length === 0" />

      <MovieGrid v-else :movies="moviesToRender" />

      <Pagination
        v-if="totalPages > 1"
        :model-value="page"
        :total-pages="totalPages"
        @update:modelValue="goTo"
      />
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import MovieGrid from './components/MovieGrid.vue'
import Pagination from './components/Pagination.vue'
import Loader from './components/Loader.vue'
import EmptyState from './components/EmptyState.vue'
import Logo from './components/Logo.vue'
import User from './components/User.vue'
import Search from './components/Search.vue'
import Header from './components/Header.vue'

/** ----------- состояние ----------- */
const API = 'https://www.omdbapi.com/?apikey=8523cbb8'
const query = ref('Batman')
const queryShown = ref('Batman')
const page = ref(1)
const totalResults = ref('0')        // приходит строкой
const movies = ref([])               // 10 с текущей страницы
const loading = ref(false)

/** Кол-во колонок должно совпадать с CSS брейкпоинтами */
const cols = ref(getCols(window.innerWidth))
function getCols(w) {
  if (w >= 1100) return 4
  if (w >= 820)  return 3
  if (w >= 560)  return 2
  return 1
}
function onResize() { cols.value = getCols(window.innerWidth) }
onMounted(() => window.addEventListener('resize', onResize))
onBeforeUnmount(() => window.removeEventListener('resize', onResize))

/** ----------- вычисления ----------- */
const totalResultsNum = computed(() => Number(totalResults.value || 0))
const totalPages = computed(() => Math.ceil(totalResultsNum.value / 10))

/**
 * Итоговый массив для рендера:
 *  – берём 10 фильмов текущей страницы
 *  – если их число не кратно колонкам и есть следующая страница,
 *    подтягиваем столько фильмов со следующей, сколько нужно
 *    чтобы добить до кратного cols (2 для 4 колоночной, 1 для 3 и т.п.)
 */
const moviesToRender = computed(() => {
  // базовые 10
  const base = movies.value ?? []
  const need = base.length % cols.value === 0 ? 0 : (cols.value - (base.length % cols.value))
  if (!need || !nextSlice.value.length) return base
  return base.concat(nextSlice.value.slice(0, need))
})

/** Кэш «начала следующей страницы», чтобы не мигало при каждом ресайзе */
const nextSlice = ref([])

/** ----------- загрузка ----------- */
async function fetchPage(p) {
  const url = `${API}&s=${encodeURIComponent(queryShown.value)}&page=${p}`
  const res = await fetch(url)
  const data = await res.json()
  if (data.Response === 'True') {
    return { items: data.Search || [], total: data.totalResults || '0' }
  }
  return { items: [], total: '0' }
}

async function load() {
  loading.value = true
  nextSlice.value = []
  try {
    const { items, total } = await fetchPage(page.value)
    movies.value = items
    totalResults.value = total

    // заранее подтянем начало следующей страницы — но ТОЛЬКО если нужно добить
    const remainder = items.length % cols.value
    const need = remainder === 0 ? 0 : (cols.value - remainder)
    if (need > 0 && page.value < totalPages.value) {
      const { items: nextItems } = await fetchPage(page.value + 1)
      nextSlice.value = nextItems
    }
  } catch (e) {
    movies.value = []
    totalResults.value = '0'
  } finally {
    loading.value = false
  }
}

function submitSearch() {
  page.value = 1
  queryShown.value = (query.value || '').trim() || 'Batman'
  load()
}

function goTo(p) {
  if (p === page.value) return
  page.value = p
  load()
}

/** первый запуск */
onMounted(load)
/** если изменились брейкпоинты по ширине — пересобираем дотяжку */
watch(cols, () => {
  // перезагрузки не делаем; movies уже есть,
  // но если теперь не хватает до кратного — подтянем «next»
  const remainder = movies.value.length % cols.value
  const need = remainder === 0 ? 0 : (cols.value - remainder)
  if (need > 0 && page.value < totalPages.value) {
    fetchPage(page.value + 1).then(({ items }) => (nextSlice.value = items || []))
  } else {
    nextSlice.value = []
  }
})
</script>
