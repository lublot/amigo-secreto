<template>
  <div class="grid grid-cols-1 md:grid-cols-12">
    <verification-form />
    <verification-illustration/>
  </div>
</template>

<script>
import VerificationForm from '@/components/forms/VerificationForm';
import VerificationIllustration from '@/components/illustration/VerificationIllustration';
export default {
  components: {
    VerificationForm,
    VerificationIllustration
  }
}
</script>