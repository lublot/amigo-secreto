<template>
  <div class="grid grid-cols-1 md:grid-cols-12">
    <brinks-form />
    <brinks-illustration/>
  </div>
</template>

<script>
import BrinksForm from '@/components/forms/BrinksForm';
import BrinksIllustration from '@/components/illustration/BrinksIllustration';
export default {
  components: {
    BrinksForm,
    BrinksIllustration
  }
}
</script>
