import { computed } from 'vue';
import { Crypto } from "@shared/api";
import { useSearchValue } from '@app/store';

export function useFilteredItems(items: Crypto[]){
  const searcher=useSearchValue()

  const filteredItems=computed(()=>{
    return items.filter(krypto=>{
      const matchesSearch=krypto.name.toLowerCase().includes(searcher.searchVal.toLowerCase()) ||
                            krypto.symbol.toLowerCase().includes(searcher.searchVal.toLowerCase());
      const matchesPrice=(searcher.minPrice==='' || krypto.current_price>=parseFloat(searcher.minPrice)) &&
                           (searcher.maxPrice==='' || krypto.current_price<=parseFloat(searcher.maxPrice));
      const matchesMarketCap=(searcher.minMarketCap==='' || krypto.market_cap>=parseFloat(searcher.minMarketCap)) &&
                               (searcher.maxMarketCap==='' || krypto.market_cap<=parseFloat(searcher.maxMarketCap));
      const matchesChange=(searcher.minChange==='' || krypto.price_change_percentage_24h>=parseFloat(searcher.minChange)) &&
                            (searcher.maxChange==='' || krypto.price_change_percentage_24h<=parseFloat(searcher.maxChange));
      return matchesSearch && matchesPrice && matchesMarketCap && matchesChange
    })
  })

  return{
    filteredItems
  }
}
