<template>
  <div style="overflow-wrap: anywhere">
    <h4 class="font-bold italic text-lg">"Querido Papai Noel, eu gostaria de ganhar..."</h4>
    <br />
    <ul 
      class="list-disc list-inside"
      v-for="(item, index) in wishlist" :key="index">
      <li class="italic text-lg">{{ item }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    nickname: { type: String },
    wishlist: { type: Array },
  },
};
</script>