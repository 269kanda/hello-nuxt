<template>
<div>
    <button @click="googleLogout">logout</button>
</div>
</template>

<script>
import firebase from '@/plugins/firebase'

import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions([
      'logout'
    ]),
    googleLogout: function() {
      this.logout()
        .then(() => {
          this.$router.push('/login')
        })
        .catch((err) => console.log(err));
    }
  }
}

</script>

<style>



  
</style>