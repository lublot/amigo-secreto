<template>
  <div>
    <h4 class="font-bold text-lg">Zuck, olha isso! Dados de {{ nickname }}</h4>
    <span><strong>Email:</strong> {{ email }}</span>
    <br />
    <span><strong>Signo:</strong> {{ zodiac }}</span>
    <br />
    <span><strong>Dobra:</strong> {{ element }}</span>
    <br />
    <span><strong>Endereço:</strong> {{ address }}</span>
    <br />
  </div>
</template>
<script>
export default {
  props: {
    nickname: { type: String },
    email: { type: String },
    zodiac: { type: String },
    element: { type: String },
    address: { type: String }
  },
};
</script>