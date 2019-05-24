<template>
  <section class="container">
  
    <div class="c_box">
      test1
    </div>
    <div class="c_box">
      test2
    </div>
    <div class="c_box">
      test3
    </div>
    <div class="c_box">
      test4
    </div>
    <div class="c_box">
      test5
    </div>
    <div class="c_box">
      test6
    </div>
    <div class="c_box">
      test7
    </div>
    <div class="c_box">
      test8
    </div>
    <div class="c_box">
      test9
    </div>
    
    <!--
    <div>
      <app-logo/>
      <h2 class="subtitle">
        Nuxt.js project
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green">Documentation</a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey">GitHub</a>
      </div>
    </div>
    -->
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'

export default {
  components: {
    AppLogo
  }
}
</script>

<style>

.container {
  min-height: 100vh;
  /*
  display: flex;
  flex-wrap:wrap;
  
  justify-content: center;
  align-items: center;
  
  z-index: 2;
  */
}

.c_box{
  height: 15vh;
  width: 65vh;
  
  padding: 1vh;
  margin: 1vh;
  background-color: #f8f8f8;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

