<script setup lang="ts">
import {gql} from 'nuxt-graphql-request/utils';
import {watch} from 'vue';
import {useHeroStore} from "~/stores/heroStore";

const {$graphql} = useNuxtApp();
const store = useHeroStore();
const query = gql`
  query hero {
  heroSection(id: "4WhpbBBwrGJDGpfeaEU62m"){
    title
    body{
      json
    }
  }
}
`;

const {data: hero} = await useAsyncData('hero', async () => {
  const data = await $graphql.default.request(query);
  return data.heroSection;
});

watch(() => hero.value, (value) => {
  console.log('hero...', value);
  if (value) {
    store.setLoaded(true);
  }
});

onBeforeMount(()=>{
  if (hero.value){
    store.setLoaded(true);
  }
})
</script>

<template>
  <UContainer>
    <UCard v-if="hero" class="home"
           :ui="{ background: 'bg-transparent dark:bg-transparent', ring: 'ring-transparent dark:ring-transparent' }">
      <h1 class="home__title">{{ hero.title }}</h1>
      <div class="home__body-wrapper">
      <template v-for="(p, index) in hero.body.json.content" :key="index">
        <p class="home__body" v-html="p.content[0].value"></p>
      </template>
      </div>
    </UCard>
  </UContainer>
</template>
