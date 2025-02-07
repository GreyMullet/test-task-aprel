<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { CryptoApi } from '@shared/api'
import { Crypto } from '@shared/model'

const route=useRoute()
const { items, fetchData }=CryptoApi()
const cryptoData=ref<Crypto>(null)

const formatDate=(dateString: string)=>{
  return new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

onMounted(async ()=>{
  if (!items.value) await fetchData()
  cryptoData.value=items.value?.find((crypto)=>crypto.name===route.params.crypto) || null
})
</script>

<template>
  <div class="crypto-details">
    <h2 v-if="cryptoData">🔍 {{ cryptoData.name }} ({{ cryptoData.symbol.toUpperCase() }})</h2>

    <div v-if="!cryptoData" class="loading">Загрузка...</div>
    
    <div v-else class="crypto-card">
      <img :src="cryptoData.image" :alt="cryptoData.name" class="crypto-image" />

      <div class="crypto-info">
        <p class="price">💲 Цена: {{ cryptoData.current_price.toLocaleString() }} USD</p>
        <p class="market-cap">🏦 Рыночная капитализация: {{ cryptoData.market_cap.toLocaleString() }} USD</p>
        <p class="rank">📊 Рейтинг: #{{ cryptoData.market_cap_rank }}</p>
        
        <p class="ath">
          📈 ATH: {{ cryptoData.ath.toLocaleString() }} USD 
          <span class="date">(Дата: {{ formatDate(cryptoData.ath_date) }})</span>
        </p>
        <p class="atl">
          📉 ATL: {{ cryptoData.atl.toLocaleString() }} USD 
          <span class="date">(Дата: {{ formatDate(cryptoData.atl_date) }})</span>
        </p>

        <p class="change" :class="{ positive: cryptoData.price_change_percentage_24h > 0, negative: cryptoData.price_change_percentage_24h < 0 }">
          Изменение за 24ч: {{ cryptoData.price_change_percentage_24h.toFixed(2) }}%
        </p>

        <p class="supply">
          🔄 В обороте: {{ cryptoData.circulating_supply.toLocaleString() }} / {{ cryptoData.total_supply?.toLocaleString() || '∞' }}
        </p>
        <p class="volume">📢 Объем торгов: {{ cryptoData.total_volume.toLocaleString() }} USD</p>

        <p class="updated">⏳ Обновлено: {{ formatDate(cryptoData.last_updated) }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.crypto-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  min-height: 100vh;
  color: #f8fafc;

  h2 {
    font-size: 36px;
    margin-bottom: 20px;
  }

  .loading {
    font-size: 22px;
    color: #94a3b8;
  }

  .crypto-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #1e293b;
    padding: 40px;
    border-radius: 16px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    width: 80%;
    max-width: 800px;
    text-align: center;

    .crypto-image {
      width: 120px;
      height: 120px;
      margin-bottom: 20px;
    }

    .crypto-info {
      width: 100%;

      p {
        font-size: 20px;
        margin: 10px 0;
        color: #e2e8f0;

        &.price {
          font-size: 28px;
          font-weight: bold;
          color: #38bdf8;
        }

        &.market-cap, &.rank, &.ath, &.atl, &.supply, &.volume {
          font-size: 18px;
          color: #94a3b8;
        }

        &.change {
          font-size: 24px;
          font-weight: bold;

          &.positive {
            color: #22c55e;
          }

          &.negative {
            color: #ef4444;
          }
        }

        &.updated {
          font-size: 14px;
          color: #64748b;
        }
      }
    }
  }
}
</style>