<template>
  <div class="form-container">
    <h2
      class="text-3xl lg:text-4xl xl:text-4xl text-left xl:leading-tight lg:leading-tight"
    >
      <strong>{{ guest.nickname }}?!</strong> Duvido... <br />
    </h2>
    <div>
      Mandei um e-mail para <strong>{{ guest.email }}</strong> te contando um
      segredo...
    </div>
    <div class="flex flex-col row-gap-2 w-full">
      <label for="name" class="text-left font-bold text-lg lg:text-xl"
        >O que foi que eu te contei?</label
      >
      <input
        autocomplete="off"
        autofocus
        class="input"
        type="text"
        name="code"
        id="code"
        :value="code"
        @input="e => code = e.target.value"
      />
      <span
        class="text-red-600 animate__animated animate__headShake"
        v-if="!isCorrect && isSubmitted"
        >Tô falando pô, né tu não! O código tá errado...</span
      >
    </div>
    <div class="w-full flex flex-row justify-end" v-show="code.length >= 8">
      <button class="button" @click="validateCode" :disabled="isLoading">
        {{ !isLoading ? 'Sou eu mesmo, pô!' : 'Pera ae...' }}
      </button>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: function () {
    return {
      code: "",
      isCorrect: false,
      isSubmitted: false,
      isLoading: false
    };
  },
  computed: {
    ...mapGetters({
      guest: "guestPerson",
    }),
  },
  methods: {
    async validateCode() {
      try {
        if (this.code) {
          this.isLoading = true;
          const response = await fetch(
            `/api/checkCode?email=${this.guest.email}&hashCode=${this.code}`
          );
          const { isCorrect } = await response.json();
          if (isCorrect) {
            this.setHashCode(this.code)
            this.setLogged();
            if (this.guest.loggedIn) {
              this.nextScene();
            }
            this.isCorrect = true;
          } else {
            this.isCorrect = false;
          }
          this.isSubmitted = true;
        }
      } catch (error) {
        alert("Vixe, deu ruim kkkk")
      } finally {
        this.isLoading = false;
      }
    },
    ...mapActions({
      nextScene: "nextScene",
      setGuest: "setGuestPerson",
      setLogged: "setLogged",
      setHashCode: "setHashCode"
    }),
  },
};
</script>