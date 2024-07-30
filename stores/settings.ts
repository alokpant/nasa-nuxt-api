import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { formatDate } from '../lib/date';
import { useCookie } from 'nuxt/app';
import { sub } from 'date-fns';

const STORE_KEY = 'settings'
const DEFAULT_PAGE = 1
const DEFAULT_PER_PAGE = 12
const DEFAULT_FETCH_TIMEFRAME = 14

const useSettingsStore = defineStore(STORE_KEY, () => {
  const updatedSinceCookie = useCookie('updatedSince');
  const currentPageCookie = useCookie('currentPage');
  const perPageCookie = useCookie('perPage');
  const totalResultsCookie = useCookie('totalResults');
  
  const updatedSince = ref(updatedSinceCookie.value || formatDate(sub(new Date(), { days: DEFAULT_FETCH_TIMEFRAME })))
  const currentPage = ref(currentPageCookie.value ? Number(currentPageCookie.value) : DEFAULT_PAGE);
  const perPage = ref(perPageCookie.value ? Number(perPageCookie.value) : DEFAULT_PER_PAGE);
  const totalResults = ref(totalResultsCookie.value ? Number(totalResultsCookie.value) : 0);
  // set true so that it shows loading when user lands on the page or refreshes the page
  const isLoading = ref(true)

  updatedSinceCookie.value = updatedSince.value
  currentPageCookie.value = String(currentPage.value)
  perPageCookie.value = String(perPage.value)
  totalResultsCookie.value = String(totalResults.value)
 
  /* Actions */
  const setUpdatedSince = (date: Date) =>{ 
    updatedSince.value = formatDate(date)
  }

  const setCurrentPage = (page: number) => {
    currentPage.value = totalResults.value > page ? page : 1;
  }

  const setTotalResults = (total: number) => {
    totalResults.value = total;
  }

  const setPerPage = (value: number) => {
    perPage.value = value;
  }

  const setIsLoading = (value: boolean) => {
    isLoading.value = value;
  }

  /* Watchers */
  watch(updatedSince, (newVal) => {
    updatedSinceCookie.value = newVal;
  });

  watch(currentPage, (newVal) => {
    currentPageCookie.value = String(newVal);
  });

  watch(perPage, (newVal) => {
    perPageCookie.value = String(newVal);
  });

  watch(totalResults, (newVal) => {
    totalResultsCookie.value = String(newVal);
  });

  return {
    updatedSince,
    currentPage,
    perPage,
    totalResults,
    isLoading,
    setUpdatedSince,
    setCurrentPage,
    setTotalResults,
    setPerPage,
    setIsLoading,
  }
});

export default useSettingsStore;
