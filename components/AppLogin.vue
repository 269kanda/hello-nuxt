<template>
<div>
    <button @click="googleLogin">google login</button>
    <button @click="googleLogout">google logout</button>
</div>
</template>

<script>
import firebase from '@/plugins/firebase'

export default {
  methods: {
    googleLogin: function() {
      //Google Login
      firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    },
    googleLogout: function() {
      firebase.auth().signOut();
    }
  }
}

</script>

<style>



  
</style>