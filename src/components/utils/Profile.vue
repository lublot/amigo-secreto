<template>
  <div>
    <h4 class="font-bold text-lg">Sobre {{ nickname }}</h4>
    <br />
    <p>
      {{ description }}
    </p>
  </div>
</template>
<script>
export default {
  props: {
    nickname: { type: String },
    description: { type: String },
  },
};
</script>