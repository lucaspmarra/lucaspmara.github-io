<script setup lang="ts">
import Header from "~/components/Header.vue";
import {onMounted, onUnmounted, ref} from 'vue';

const {$gsap: gsap} = useNuxtApp();
const main = ref();
const ctx = ref();
const store = useHeroStore();
let animation: any = null;

onMounted(async () => {
  await nextTick(); // Garantir que o DOM esteja totalmente carregado


  ctx.value = gsap.context((self) => {
    nextTick(); // Garantir que o DOM esteja totalmente carregado

    animation = gsap.fromTo('img', {
      scale: 1,
      transformOrigin: 'center center',
      ease: 'power1.inOut'
    }, {
      scale: 100,
      duration: 2,
      ease: "power1.inOut",
      paused: true,
      onComplete: () => {
        store.setRemoveImg(true);
        const img = document.querySelector('img');
        if (img) {
          img.remove();
        }
      }
    });
  }, main.value);

  setTimeout(() => {
    console.log('starting...');
    if (store.isLoaded) {
      animation.play();
    }
  });
});

onUnmounted(() => {
  ctx.value.revert(); // <- Easy Cleanup!
});
</script>

<template>
  <div class="wrapper">
    <div class="section hero">
      <Header/>
      <div class="md:grid md:grid-cols-2 md:gap-4">
        <div>
        </div>
        <div>
          <slot/>
        </div>
      </div>
    </div>
    <div v-if="!store.canRemoveImg" class="image-container">
      <img
          src="~/assets/img/opening-cat.png"
          alt="image">
    </div>
  </div>
</template>

<style scoped>

</style>
