import { ref, computed } from 'vue'
import { searchMovies } from '../api/omdb'

const COLS = 4           // хотим 4 карточки в ряд
const PAGE_SIZE = 10     // у OMDb всегда 10 на страницу

export function useOmdbSearch() {
  const query = ref('Batman')
  const page = ref(1)
  const totalResults = ref(0)
  const movies = ref([])
  const loading = ref(false)
  const error = ref('')

  const totalPages = computed(() => {
    const pages = Math.ceil(totalResults.value / PAGE_SIZE) || 0
    // OMDb обычно ограничен ~100 страницами
    return Math.min(pages, 100)
  })

  async function runSearch(newQuery = query.value, newPage = page.value) {
    error.value = ''
    const q = String(newQuery || '').trim()
    if (!q) {
      movies.value = []
      totalResults.value = 0
      page.value = 1
      return
    }

    loading.value = true
    try {
      // 1) основная страница
      const main = await searchMovies({ query: q, page: newPage })
      const mainList = main.movies ?? []
      totalResults.value = main.totalResults || 0
      page.value = newPage

      // 2) если последняя строка не полная — дозаберём из следующей страницы
      let filled = [...mainList]
      const mod = filled.length % COLS
      const need = mod === 0 ? 0 : (COLS - mod)

      const hasNextPage = newPage < totalPages.value
      if (need > 0 && hasNextPage) {
        const next = await searchMovies({ query: q, page: newPage + 1 })
        const take = next.movies?.slice(0, need) ?? []
        // помечаем как «подхваченные», если хочешь — можешь стилизовать
        filled.push(...take.map(m => ({ ...m, _fromNext: true })))
      }

      movies.value = filled
      if (main.error) error.value = main.error
    } catch (e) {
      error.value = e.message || 'Network error'
      movies.value = []
      totalResults.value = 0
    } finally {
      loading.value = false
    }
  }

  function setQuery(newQuery) {
    query.value = newQuery
  }

  async function submitSearch() {
    await runSearch(query.value, 1)
  }

  async function goToPage(p) {
    const target = Math.max(1, Math.min(Number(p) || 1, totalPages.value || 1))
    await runSearch(query.value, target)
  }

  // первый запуск
  runSearch()

  return { query, setQuery, submitSearch, goToPage, page, totalPages, totalResults, movies, loading, error }
}
