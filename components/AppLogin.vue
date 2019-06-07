<template>
<div>
    <button v-if="isLogin" @click="googleLogout">google logout</button>
    <button v-else         @click="googleLogin">google login</button>
</div>
</template>

<script>
import firebase from '@/plugins/firebase'

import { mapActions } from 'vuex'

export default {
  data () {
    return {isLogin:false}
  },
  async mounted () {
    let user = await new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if(user){
          this.isLogin = true;
        } else{
          this.isLogin = false;
        }
        resolve(user)
      })
      
    })
    this.setUser(user) // setUser is mapped action from vuex
    if (user) {
      this.$router.push('/') // if non-null user given, go to root page.
    }
  },

  methods: {
    ...mapActions([
      'login',
      'logout',
      'setUser'
    ]),
    googleLogin: function() {
      this.login()
        .then(() => console.log('resloved'))
        .catch((err) => console.log(err));
    },
    googleLogout: function() {
      this.logout()
        .then(() => {
          this.$router.push('/login')
        })
        .catch((err) => console.log(err))
    }
  }
}

</script>

<style>



  
</style>