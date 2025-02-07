import { ref } from 'vue'
import axios from 'axios'
import type { Crypto } from '@shared/model'

export const CryptoApi=()=>{
  const items=ref<Crypto[] | null>(null)

  const fetchData=async ()=>{
    try{
      const res=await axios.get<Crypto[]>('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')
      items.value=res.data

      console.log(res.data)
    } catch (err){
      console.error('Ошибка загрузки данных:', err)
    }
  }

  return { items, fetchData }
}
