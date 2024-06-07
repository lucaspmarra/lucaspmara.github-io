<script setup lang="ts">
import {gql} from 'nuxt-graphql-request/utils';
import {watchEffect} from 'vue';

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

watchEffect(() => {
  if (hero.value) {
    console.log('hero...', hero)
    store.setLoaded(true);
  }
});
</script>

<template>
    <UCard v-if="hero" class="mt-10 home"
           :ui="{ background: 'bg-transparent dark:bg-transparent', ring: 'ring-transparent dark:ring-transparent' }">
      <h1 class="home__title">{{ hero.title }}</h1>
      <template v-for="(p, index) in hero.body.json.content" :key="index">
        <p class="my-20 home__body" v-html="p.content[0].value"></p>
      </template>
    </UCard>
</template>


<style scoped lang="scss">
.home {

  &__title {
    font-weight: 700;
    font-size: 52px;
    line-height: 52px;
    color: #E8E8E8;
    text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    flex: none;
    order: 1;
    flex-grow: 0;
  }

}

</style>
