<script setup lang="ts">
import { reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

const userInfo = reactive({ username: "", password: "" });

const rules = {
  username: {
    required,
  },
  password: {
    required,
    minLength: minLength(10),
  },
};

const v$ = useVuelidate(rules, userInfo);

const onSubmit = async (event: Event) => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;

  const data = new FormData(event.target as HTMLFormElement);

  fetch("https://example.com/profile", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
</script>

<template>
  <section class="h-[100vh] flex justify-center items-center">
    <form
      id="login-form"
      @submit.prevent="onSubmit"
      class="border border-gray-300 shadow-md rounded-lg p-6 grid gap-6"
    >
      <div>
        <label for="username" class="label">Username</label>
        <input
          id="username"
          name="username"
          v-model="v$.username.$model"
          class="input"
          type="text"
        />
        <Transition>
          <div>
            <p
              class="mt-2 text-red-400 text-sm"
              v-for="error of v$.username.$errors"
              :key="error.$uid"
            >
              {{ error.$message }}
            </p>
          </div>
        </Transition>
      </div>

      <div>
        <label for="password" class="label">Password</label>
        <input
          id="password"
          name="password"
          v-model="v$.password.$model"
          class="input"
          type="password"
        />

        <Transition>
          <div>
            <p
              class="mt-2 text-red-400 text-sm"
              v-for="error of v$.password.$errors"
              :key="error.$uid"
            >
              {{ error.$message }}
            </p>
          </div>
        </Transition>
      </div>

      <button class="btn">Submit</button>
    </form>
  </section>
</template>

<style>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
