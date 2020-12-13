<template>
  <div class="grid grid-cols-1 md:grid-cols-12">
    <welcome-form />
    <welcome-illustration/>
  </div>
</template>

<script>
import WelcomeForm from '@/components/forms/WelcomeForm';
import WelcomeIllustration from '@/components/illustration/WelcomeIllustration';
export default {
  components: {
    WelcomeForm,
    WelcomeIllustration
  }
}
</script>