<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Crypto } from "@shared/api"
import { useSearchValue } from '@app/store'
import { computed } from 'vue'
import { ref } from 'vue';

const router=useRouter()
const searcher=useSearchValue()
const viewMode=ref('grid')

const goToKryptoDetail=(kryptoName: string)=>{
  router.push(`/detailed/${kryptoName}`)
}

const props=defineProps<{ items: Crypto[] }>()

const filteredItems=computed(() => {
  return props.items.filter(krypto=>{
    const matchesSearch=krypto.name.toLowerCase().includes(searcher.searchVal.toLowerCase()) ||
                          krypto.symbol.toLowerCase().includes(searcher.searchVal.toLowerCase())
    const matchesPrice=(searcher.minPrice==='' || krypto.current_price >= parseFloat(searcher.minPrice)) &&
                         (searcher.maxPrice==='' || krypto.current_price <= parseFloat(searcher.maxPrice))
    const matchesMarketCap=(searcher.minMarketCap==='' || krypto.market_cap >= parseFloat(searcher.minMarketCap)) &&
                             (searcher.maxMarketCap==='' || krypto.market_cap <= parseFloat(searcher.maxMarketCap))
    const matchesChange=(searcher.minChange==='' || krypto.price_change_percentage_24h >= parseFloat(searcher.minChange)) &&
                          (searcher.maxChange==='' || krypto.price_change_percentage_24h <= parseFloat(searcher.maxChange))
    return matchesSearch && matchesPrice && matchesMarketCap && matchesChange
  })
})

const toggleViewMode=()=>{
  viewMode.value=viewMode.value==='grid' ? 'list' : 'grid'
}
</script>

<template>
  <div class="view-toggle">
    <button @click="toggleViewMode">
      {{ viewMode === 'grid' ? 'Switch to List View' : 'Switch to Grid View' }}
    </button>
  </div>
  <div :class="['crypto-container', viewMode]">
    <div v-for="krypto in filteredItems" :key="krypto.id" class="crypto-card" @click="goToKryptoDetail(krypto.name)">
      <img :src="krypto.image" :alt="krypto.name" class="crypto-image" />
      <div class="crypto-info">
        <h3>{{ krypto.name }} ({{ krypto.symbol.toUpperCase() }})</h3>
        <p class="price">💲 {{ krypto.current_price.toLocaleString() }} USD</p>
        <p class="market-cap">🏦 Market Cap: {{ krypto.market_cap.toLocaleString() }} USD</p>
        <p class="rank">📊 Rank: #{{ krypto.market_cap_rank }}</p>
        <p class="change" :class="{ positive: krypto.price_change_percentage_24h > 0, negative: krypto.price_change_percentage_24h < 0 }">
          {{ krypto.price_change_percentage_24h.toFixed(2) }}%
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.view-toggle {
  text-align: right;
  margin-bottom: 10px;

  button {
    background: none;
    border: 1px solid #ccc;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
  }
}

.crypto-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;

  &.list {
    flex-direction: column;
    align-items: flex-start;

    .crypto-card {
      width: 100%;
      flex-direction: row;
      align-items: center;
      padding: 10px;

      .crypto-image {
        margin-right: 15px;
      }

      .crypto-info {
        text-align: left;
      }
    }
  }

  &.grid {
    .crypto-card {
      flex-direction: column;
      align-items: center;
    }
  }
}

.crypto-card {
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  color: #fff;
  padding: 15px;
  border-radius: 12px;
  display: flex;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }

  .crypto-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-bottom: 10px;
  }

  .crypto-info {
    h3 {
      font-size: 1.1em;
      margin: 5px 0;
    }

    .price {
      font-size: 1.2em;
      font-weight: bold;
    }

    .market-cap,
    .rank {
      font-size: 0.9em;
      color: #ccc;
    }

    .change {
      font-size: 1em;
      font-weight: bold;
      margin-top: 10px;

      &.positive {
        color: #4caf50;
      }

      &.negative {
        color: #e53935;
      }
    }
  }
}
</style>
