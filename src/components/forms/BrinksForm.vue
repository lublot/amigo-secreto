<template>
  <div class="form-container">
    <h2 class="text-3xl lg:text-4xl xl:text-4xl text-left xl:leading-tight lg:leading-tight">
      <strong class="animate__animated animate__fadeInLeft animate__slow">
        Oi {{ guest.nickname }}...<br/>
        era brinks, rs
      </strong>
    </h2>
    <div class="text-lg animate__animated animate__bounce animate__infinite animate__fast animate__delay-2s mt-3">
      <strong>Vamos lá em {{ seconds }}!</strong>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: function () {
    return {
      seconds: 7,
    }
  },
  computed: {
    ...mapGetters({
      guest: 'guestPerson'
    })
  },
  mounted() {
    let vm = this;
    var counter = setInterval(() => {
      vm.seconds -= 1;
      if (vm.seconds == 0) {
        this.nextScene()
        clearInterval(counter)
      }
    }, 1000)
  },
  methods: {
    ...mapActions({
      nextScene: "nextScene",
    }),
  },
};
</script>