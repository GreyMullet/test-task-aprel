<script setup lang="ts">
import { onMounted } from 'vue'
import { CryptoApi } from '@shared/api'
import { CardsCrypto } from '@entities/cards_crypto'
import { SearchForm } from '@features/search_currency'

const { items, fetchData }=CryptoApi()

onMounted(fetchData)

</script>

<template>
  <div class="crypto-container">
    <header class="list-header">
      <h2>💰 Cryptocurrency List</h2>
      <SearchForm />
    </header>
    <div v-if="items" class="crypto-list">
      <CardsCrypto :items="items" />
    </div>

    <p v-else class="loading">Загрузка...</p>
  </div>
</template>

<style scoped lang="scss">
.crypto-container {
  max-width: 800px;
  margin: 20px auto;
  text-align: center;
  font-family: Arial, sans-serif;
}
.list-header{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.crypto-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.loading {
  font-size: 1.5em;
  color: #999;
}
</style>
