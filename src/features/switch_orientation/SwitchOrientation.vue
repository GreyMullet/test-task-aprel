<script setup lang="ts">
import { ref } from 'vue'
  
const viewMode=ref('grid')
  
const toggleViewMode=()=>{
    viewMode.value=viewMode.value==='grid' ? 'list' : 'grid'
}

defineExpose({
    viewMode
})
</script>

<template>
    <div class="view-toggle">
      <button @click="toggleViewMode">
        {{ viewMode==='grid' ? 'Switch to List View' : 'Switch to Grid View' }}
      </button>
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
</style>  