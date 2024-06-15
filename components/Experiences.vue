<script setup lang="ts">
import {gql} from 'nuxt-graphql-request/utils';
import {watch} from "vue";
import {useHeroStore} from "~/stores/heroStore";

const {$graphql} = useNuxtApp();
const store = useHeroStore();
const query = gql`
query experiences {
  jobExperienceCollection(order: sys_firstPublishedAt_DESC) {
    total
    items {
      title
      companyName
      from
      to
      body {
        json
      }
    }
  }
}
`;

const {data: experiences} = await useAsyncData('experiences', async () => {
  const data = await $graphql.default.request(query);
  return data.jobExperienceCollection;
});

watch(() => experiences.value, (value) => {
  console.log('experiences...', value);
  if (value) {
    store.setLoaded(true);
  }
});

onBeforeMount(()=>{
  if (experiences.value){
    store.setLoaded(true);
  }
})
</script>

<template>
  <UContainer v-if="experiences">
    <UCard class="home"
           :ui="{ background: 'bg-transparent dark:bg-transparent', ring: 'ring-transparent dark:ring-transparent' }">
      <div class="home__body-wrapper">
        <template v-for="(item, index) in experiences.items" :key="index">
          <h1 class="home__title">{{ item.title }}</h1>
          <p class="home__company_name">{{ item.companyName }}</p>
          <p class="home__body" v-html="item.body.json.content[0].content[0].value"></p>
          <UDivider v-if="index < experiences.items.length - 1" icon="i-simple-icons-github" />
        </template>
      </div>
    </UCard>
  </UContainer>
</template>
