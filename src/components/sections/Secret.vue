<template>
  <div class="grid grid-cols-1 md:grid-cols-12">
    <secret-form />
    <secret-illustration/>
  </div>
</template>

<script>
import SecretForm from '@/components/forms/SecretForm';
import SecretIllustration from '@/components/illustration/SecretIllustration';
export default {
  components: {
    SecretForm,
    SecretIllustration
  }
}
</script>
