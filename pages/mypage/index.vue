<template>
  <section class="container">
  <div>
    <h1>mypage</h1>
    
    <input v-model='displayName' placeholder='表示名称'>
    
    <button @click='userUpdate'>登録</button>
    
  </div>
  </section>
</template>

<script>
import firebase from '@/plugins/firebase'

export default {
  components: {
    firebase
  },
  methods: {
    userUpdate: function(){
      //ユーザー情報更新
      firebase.db.collection('users').doc(this.userData.uid).set({
        id: this.userData.uid,
        name: this.displayName
      });
      
      alert('更新完了しました');
    }
  },
  asyncData (context) {
    // コンポーネントをロードする前に毎回呼び出されます
    return { isLogin:false, userData:null}
  },
  created : function() {
    //user情報の取得
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isLogin = true;
        this.userData = user;
      } else {
        this.isLogin = false;
        this.userData = null;
      };
    });
  }
}



</script>

<style>



</style>

