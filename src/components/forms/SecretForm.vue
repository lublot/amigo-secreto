<template>
  <div class="secret-container justify-center items-center bg-xmas-white order-1">
    <h2 class="text-black font-bold text-3xl text-center mb-5">
      Aqui está você
    </h2>
    <user-card 
      :address="guest.address"
      :name="guest.name"
      :description="guest.description"
      :nickname="guest.nickname"
      :zodiac="guest.zodiac"
      :phrase="guest.phrase"
      :element="guest.element"
      :email="guest.email"
      :wishlist="guest.wishlist"
      :imgUrl="guest.imageUrl"
    />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import UserCard from "../cards/UserCard.vue";
export default {
  components: {
    UserCard,
  },
  computed: {
    ...mapGetters({
      guest: "guestPerson",
    }),
  },
  methods: {
    ...mapActions({
      nextScene: "nextScene",
    }),
  },
};
</script>