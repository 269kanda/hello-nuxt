<template>
  <section class="container">
  <div>
    <h1>login画面</h1>
    <AppLogin></AppLogin>
  </div>
  </section>
</template>

<script>
import firebase from '@/plugins/firebase'
import AppLogin from '@/components/AppLogin.vue';

export default {
  components: {
    firebase,
    AppLogin
  },
  methods: {
  },
  asyncData (context) {
  
  },
  created : function() {
  }
}



</script>

<style>



</style>

