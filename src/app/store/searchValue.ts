import { defineStore } from 'pinia'

export const useSearchValue=defineStore('searcher', {
  state: ()=>({
    searchVal: '',
    minPrice: '',
    maxPrice: '',
    minMarketCap: '',
    maxMarketCap: '',
    minChange: '',
    maxChange: '',
  }),
  actions: {
    updateSearchCriteria(criteria){
      this.searchVal=criteria.searchVal
      this.minPrice=criteria.minPrice
      this.maxPrice=criteria.maxPrice
      this.minMarketCap=criteria.minMarketCap
      this.maxMarketCap=criteria.maxMarketCap
      this.minChange=criteria.minChange
      this.maxChange=criteria.maxChange
    }
  }
})
