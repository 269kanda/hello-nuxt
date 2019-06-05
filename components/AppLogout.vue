<template>
<div>
    <button @click="googleLogout">google logout</button>
</div>
</template>

<script>
import firebase from '@/plugins/firebase'

export default {
  methods: {
    googleLogout: function() {
      firebase.auth().signOut();
    }
  }
}

</script>

<style>



  
</style>