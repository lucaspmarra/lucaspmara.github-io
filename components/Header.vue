<script setup lang="ts">
import {ref} from 'vue'

const route = useRoute()
const isOpen = ref(false)
const links = [
  [{
    label: 'Inicio',
    icon: 'i-heroicons-home',
    to: '/',
  }, {
    label: 'Experiências',
    icon: 'i-heroicons-chart-bar',
    to: '/experiences'
  }]
]
watch(() => route.fullPath, () => {
  isOpen.value = false;
});
</script>
<template>
  <div>
    <USlideover v-model="isOpen">
      <UCard
          class="flex flex-col flex-1"
          :ui="{
      wrapper: 'border-s border-gray-200 dark:border-gray-800 space-y-2',
      base: 'group block border-s -ms-px leading-6 before:hidden',
      padding: 'p-0 ps-4',
      rounded: '',
      font: '',
      ring: '',
      active: 'text-primary-500 dark:text-primary-400 border-current font-semibold',
      inactive: 'border-transparent hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300'
    }"
      >
        <template #header>
          <UButton
              color="gray"
              variant="ghost"
              size="sm"
              icon="i-heroicons-x-mark-20-solid"
              class="flex sm:hidden absolute end-5 top-1 z-10"
              square
              padded
              @click="isOpen = false"
          />
        </template>
        <UVerticalNavigation :links="links" :exact="true"/>

      </UCard>
    </USlideover>
    <UButton class="flex md:hidden" label="Menu" @click="isOpen = true"/>

    <UCard class="m-1 hidden lg:block"
           :ui="{ background: 'bg-transparent dark:bg-transparent', ring: 'ring-transparent dark:ring-transparent' }">
      <div class="flex justify-stretch content-center items-center">
        <div class="flex-1"></div>

        <div class="flex gap-56">
          <ULink
              to="/"
              exact
              active-class="text-purple-600"
              inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            Inicio
          </ULink>
          <ULink
              exact
              active-class="text-purple-600"
              inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            Sobre
          </ULink>
          <ULink
              exact
              to="/experiences"
              active-class="text-purple-600"
              inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            Experiências
          </ULink>
          <ULink
              exact
              active-class="text-purple-600"
              inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            Contato
          </ULink>
        </div>
      </div>
    </UCard>
  </div>
</template>


<style scoped>

</style>
