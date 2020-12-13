<template>
  <div
    class="friend-container items-center bg-xmas-green justify-center"
  >
    <h2 class="text-white font-bold text-3xl text-center mb-5 animate__animated animate__slideInLeft animate__slow">
      Seu amigo secreto é...
    </h2>
    <user-card 
      v-if="picked"
      :animated="true" 
      :address="friend.address"
      :name="friend.name"
      :description="friend.description"
      :nickname="friend.nickname"
      :zodiac="friend.zodiac"
      :phrase="friend.phrase"
      :element="friend.element"
      :email="friend.email"
      :wishlist="friend.wishlist"
      :imgUrl="friend.imageUrl"
    />
  </div>
</template>

<script>
import UserCard from '@/components/cards/UserCard'
import { mapGetters } from 'vuex';
export default {
  components: {
    UserCard
  },
  data: function () {
    return {
      picked: false,
      friend: null
    }
  },
  computed: {
    ...mapGetters({
      guest: 'guestPerson'
    })
  },
  mounted () {
    const vm = this;
    fetch(`/api/getAFriend?email=${this.guest.email}&hashCode=${this.guest.hashCode}`)
      .then(async (result) => {
        vm.picked = true;
        const { data } = await result.json()
        vm.friend = data
      })
      .catch(() => {
        alert('Vixe, deu ruim kkkk')
      })
  }
}
</script>