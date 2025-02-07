<script setup lang="ts">
import { ref } from 'vue'
import { useSearchValue } from '@app/store'

const searcher=useSearchValue()
const searchTerm=ref('')
const minPrice=ref('')
const maxPrice=ref('')
const minMarketCap=ref('')
const maxMarketCap=ref('')
const minChange=ref('')
const maxChange=ref('')

const handleSearch=()=>{
  searcher.updateSearchCriteria({
    searchVal: searchTerm.value,
    minPrice: minPrice.value,
    maxPrice: maxPrice.value,
    minMarketCap: minMarketCap.value,
    maxMarketCap: maxMarketCap.value,
    minChange: minChange.value,
    maxChange: maxChange.value,
  })
  console.log('Обновлённое значение поиска:', searcher.searchVal)
}
</script>

<template>
  <div class="search-container">
    <input
      type="text"
      placeholder="Search currency"
      v-model="searchTerm"
    />
    <input
      type="number"
      placeholder="Min Price"
      v-model="minPrice"
    />
    <input
      type="number"
      placeholder="Max Price"
      v-model="maxPrice"
    />
    <input
      type="number"
      placeholder="Min Market Cap"
      v-model="minMarketCap"
    />
    <input
      type="number"
      placeholder="Max Market Cap"
      v-model="maxMarketCap"
    />
    <input
      type="number"
      placeholder="Min Change (%)"
      v-model="minChange"
    />
    <input
      type="number"
      placeholder="Max Change (%)"
      v-model="maxChange"
    />
    <button @click="handleSearch">Search</button>
  </div>
</template>

<style scoped lang="scss">
.search-container {
  position: absolute;
  right: 3px;
  top: 10px;
  height: auto;
  width: 20%;
  display: flex;
  flex-direction: column;

  button {
    background: none;
    border: none;
    height: 100%;
    cursor: pointer;
  }

  input {
    height: 100%;
    border: 1px solid rgb(171, 170, 170);
    border-radius: 3px;
    outline: none;
    margin-bottom: 5px;
  }
}
</style>
