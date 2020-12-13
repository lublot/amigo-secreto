<template>
  <welcome v-if="currentScene === scenes.WELCOME"/>
  <verification v-else-if="currentScene === scenes.MAIL" />
  <brinks v-else-if="currentScene === scenes.BRINKS" />
  <secret v-else-if="currentScene === scenes.SECRET" />
</template>

<script>
import Welcome from '@/components/sections/Welcome';
import Verification from '@/components/sections/Verification';
import { mapGetters } from 'vuex';
import Brinks from '@/components/sections/Brinks.vue';
import Secret from '@/components/sections/Secret.vue';

export default {
  components: {
    Welcome,
    Verification,
    Brinks,
    Secret
  },
  computed: {
    ...mapGetters({
      currentScene: 'currentScene',
      scenes: 'scenes'
    })
  }
}
</script>

<style scoped>

</style>
