<script setup lang="ts">
</script>

<template>
  <div class="mockup-phone">
    <div class="mockup-phone-camera"></div>
    <div class="mockup-phone-display text-white flex flex-col">
      <div class=" flex items-center h-20 px-5">
        <div v-if="route.name!='app'">
          <svg class="h-6 w-6 fill-current md:h-8 md:w-8 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" width="24"
            height="24" viewBox="0 0 24 24">
            <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path>
          </svg>
        </div>
      </div>
      <div class="flex-1 flex flex-col">
        <RouterView />
      </div>
    </div>
  </div>
</template>
<script lang="tsx" setup>
import { useRoute } from "vue-router";
const route = useRoute();

</script>
