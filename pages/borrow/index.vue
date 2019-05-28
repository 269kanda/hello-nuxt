<template>
  <section class="container">
    <nuxt-link to="/">Home page</nuxt-link>
    <div>
      <app-logo/>
    </div>
    本を借りる為のページ<br/>
    とりあえずは、初期はメールアドレスのリンクをつけるだけから入りたい

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

  display: flex;
  flex-wrap:wrap;
  /*
  justify-content: center;
  align-items: center;
  
  z-index: 2;
  */
}

.c_box{
  display: flex;
  flex-wrap: wrap;
  
  height: 25vh;
  width: 90vh;
  
  padding: 0.2vh;
  margin: 1vh;
  background-color: #fff;
  
  border-radius: 4px;
  border: 0.1px solid #f5f5ff;
}

.c_box-title {
  width:100%;
  height: 20%;
  background-color: #f8ffff;
}

.c_box-link-box {
  width: 40%;
  height: 65%;
  border: 0.1px solid #f5f5ff;
}

.c_box-main {
  width: 60%;
  height: 65%;
  border: 0.1px solid #f5f5ff;
}

.c_box_futter {
  width:100%;
  height: 15%;
 
  border: 0.1px solid #f8ffff;
  background-color: #f8ffff;
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

