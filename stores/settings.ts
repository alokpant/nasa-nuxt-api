import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { formatDate } from '../lib/date';
import { useCookie } from 'nuxt/app';
import { sub } from 'date-fns';

const STORE_KEY = 'settings'
export const useSettingsStore = defineStore(STORE_KEY, () => {
  const updatedSinceCookie = useCookie('updatedSince');
  const currentPageCookie = useCookie('currentPage');
  const perPageCookie = useCookie('perPage');
  const totalResultsCookie = useCookie('totalResults');
  
  const updatedSince = ref(updatedSinceCookie.value || formatDate(sub(new Date(), { days: 14 })))
  const currentPage = ref(currentPageCookie.value ? Number(currentPageCookie.value) : 1);
  const perPage = ref(perPageCookie.value ? Number(perPageCookie.value) : 10);
  const totalResults = ref(totalResultsCookie.value ? Number(totalResultsCookie.value) : 1);
  const isLoading = ref(false)

  updatedSinceCookie.value = updatedSince.value
  currentPageCookie.value = String(currentPage.value)
  perPageCookie.value = String(perPage.value)
  totalResultsCookie.value = String(totalResults.value)
 
  /* Actions */
  const setUpdatedSince = (date: Date) =>{ 
    console.log('setUpdatedSince', date)
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
