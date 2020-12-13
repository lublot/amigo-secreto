<template>
  <div class="form-container">
    <h2 class="text-3xl lg:text-4xl xl:text-5xl text-left xl:leading-tight lg:leading-tight">
      Olá <strong>amiguinho</strong>,<br />
      você é
      <strong
        class="animate__animated animate__fadeIn animate__slower animate__delay-2s"
        >tão secreto...</strong
      >
    </h2>
    <div class="flex flex-col row-gap-2 w-full">
      <label for="name" class="text-left font-bold text-lg lg:text-xl">Quem é você?</label>
      <input
        autocomplete="off"
        autofocus
        class="input"
        type="text"
        name="name"
        id="name"
        :value="name"
        @input="searchPeople"
      />
      <div
        class="border-2 border-gray-500 rounded-b border-t-0"
        v-if="queryChanged && queryResult.length > 0"
      >
        <ul
          class="list-none"
          v-for="(result, index) in queryResult"
          :key="index"
        >
          <li
            class="px-4 py-3 hover:bg-gray-300 cursor-pointer"
            @click="updateChoosed(result)"
          >
            {{ result.name }}
          </li>
        </ul>
      </div>
      <div
        class="border-2 border-gray-500 rounded-b border-t-0"
        v-else-if="queryChanged && queryResult.length == 0"
      >
        <ul
          class="list-none"
        >
          <li
            class="px-4 py-3 hover:bg-gray-300 cursor-wait"
          >
            Carregando... <br/>
            <strong>
              Clique em algum nome quando carregar.
            </strong>
          </li>
        </ul>
      </div>
    </div>
    <div
      class="w-full flex flex-row justify-end"
      v-if="!queryChanged && queryResult.length > 0"
    >
      <button class="button" @click="sendMail" :disabled="isLoading">
        {{ !isLoading ? 'Sim, sou eu!' : 'Pera ae...' }}
      </button>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import _ from 'lodash';
export default {
  data: function () {
    return {
      name: "",
      email: "",
      choosed: null,
      queryChanged: false,
      queryResult: [],
      isLoading: false
    };
  },
  created () {
    this.searchPeople = _.throttle(this.searchPeople, 1000);
  },
  methods: {
    async searchPeople(event) {
      try {
        const name = event.target.value;
        this.name = name;
        this.queryResult.splice(0, this.queryResult.length);
        if (name.trim().length <= 2) {
          this.queryChanged = false;
          return;
        }
        this.queryChanged = true;
        this.isLoading = true;
        const response = await fetch(`/api/getByName?name=${name}`);
        const { data } = await response.json();
        this.queryResult.splice(0, this.queryResult.length, ...data);
      } catch (error) {
        //
      } finally {
        this.isLoading = false;
      }
    },
    updateChoosed(person) {
      this.choosed = person;
      this.name = person.name;
      this.queryChanged = false;
    },
    async sendMail() {
      this.isLoading = true;
      if (this.choosed && this.name) {
        const response = await fetch(
          `/api/sendVerificationEmail?email=${this.choosed.email}&name=${this.choosed.name}`
        );
        if (response.ok) {
          this.setGuest({ guest: this.choosed });
          this.nextScene();
        }
      }
      this.isLoading = false;
    },
    ...mapActions({
      nextScene: "nextScene",
      setGuest: "setGuestPerson",
    }),
  },
};
</script>