<template>
  <div
    class="shadow-lg rounded py-5 px-5 border bg-white w-11/12 md:3/4 lg:w-1/2"
    :class="
      animated ? 'animate__animated animate__zoomIn animate__delay-2s' : ''
    "
  >
    <div class="flex md:flex-row flex-col items-center gap-3">
      <img class="rounded-full md:w-1/6 w-1/3" :src="imgUrl" alt="" />
      <div class="mt-3 flex flex-col">
        <h2 class="font-semibold text-lg md:text-xl xl:text-3xl align-center">{{ name }}</h2>
        <h3 class="italic text-sm lg:text-base align-center text-black px-1">
          - "{{ phrase }}"
        </h3>
      </div>
    </div>
    <div class="flex flex-col mt-4">
      <profile
        v-if="activeTab == 0"
        :nickname="nickname"
        :description="description"
      />
      <div class="flex flex-col" v-else-if="activeTab == 1">
        <info
          :address="address"
          :element="element"
          :email="email"
          :zodiac="zodiac"
          :nickname="nickname"
        />
      </div>
      <div class="flex flex-col" v-else-if="activeTab == 2">
        <wish-list
          :wishlist="wishlist"
        />
      </div>
      <div class="flex flex-row gap-5 justify-center mt-4">
        <button
          v-for="(tab, index) in [0, 1, 2]"
          :key="index"
          class="rounded-full w-5 h-5 focus:outline-none"
          :class="tab == activeTab ? 'bg-black' : 'bg-blue-500'"
          @click="activeTab = tab"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Info from "../utils/Info.vue";
import Profile from "../utils/Profile.vue";
import WishList from '../utils/WishList.vue';
export default {
  props: {
    animated: {
      type: Boolean,
      default: false,
    },
    nickname: { type: String },
    email: { type: String },
    zodiac: { type: String },
    element: { type: String },
    description: { type: String },
    name: { type: String },
    address: { type: String },
    phrase: { type: String },
    wishlist: { type: Array },
    imgUrl: { type: String }
  },
  components: { Info, Profile, WishList },
  data: function () {
    return {
      activeTab: 0,
    };
  },
  computed: {
    ...mapGetters({
      guest: "guestPerson",
    }),
  },
};
</script>