<script setup lang="ts">
import {gql} from 'nuxt-graphql-request/utils';

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
</script>

<template>
  <UContainer v-if="experiences">
    <UCard class="mt-10 home"
           :ui="{ background: 'bg-transparent dark:bg-transparent', ring: 'ring-transparent dark:ring-transparent' }">
      <template v-for="(item, index) in experiences.items" :key="index">
        <h1 class="home__title">{{ item.title }}</h1>
        <p class="home__company_name">{{ item.companyName }}</p>
        <p class="mb-20 home__body" v-html="item.body.json.content[0].content[0].value"></p>
      </template>

      <!--      <template v-for="(p, index) in hero.body.json.content" :key="index">
              <p class="my-20 home__body" v-html="p.content[0].value"></p>
            </template>-->
    </UCard>
  </UContainer>
</template>

<style scoped lang="scss">
.home {
  overflow-y: scroll;
  box-sizing: content-box;
  height: 750px;

  &__title {
    text-transform: uppercase;
    font-weight: 700;
    font-size: 24px;
    line-height: 52px;
    color: #E8E8E8;
    text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    flex: none;
    order: 1;
    flex-grow: 0;
  }

  &__company_name {
    text-transform: uppercase;
  }
}

</style>
