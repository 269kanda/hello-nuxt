<template>
  <section class="container">
  <div>

    <div>
      <div>
        アイコン(現状は、ソーシャルログイン元から取得します)：
        <br>
        <input hidden v-model='photo_url'>
        <img :src='photo_url' class='user_icon'>
        <br>
      </div>
      
      <div>
        表示名称：<input v-model='display_name' placeholder='表示名称'>
      </div>
    </div>

    <br>
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
  data(){
    return {
      authUserData:null,
      user:null,
      displayName: '',
      photo_url: ''
    }
  },
  created : function() {
  },
  async mounted() {
    
    //user情報の取得
    this.authUserData = firebase.auth().currentUser;
    
    //usersに登録されているか調べる
    let user = await this.getUserData(this.authUserData.uid);
    
    if(user){
      //登録がある場合は、登録内容で表示
      this.display_name = user.display_name;
      this.photo_url = user.photo_url;
    } else {
      //登録がない場合は、firebaseの認証情報から取得
      this.display_name = this.authUserData.displayName;
      this.photo_url = this.authUserData.photoURL;
    }
    
  },
  methods: {
     
     //ユーザー情報の取得
     getUserData: async function(uid){
       //todo リファクタリングする Promiseを使えばもうちょっときれいに組める
       let user = await firebase.db.collection('users').doc(uid).get();
       return user.data();
     }
    ,userUpdate: function(){
      //ユーザー情報更新
      firebase.db.collection('users').doc(this.authUserData.uid).set({
        id: this.authUserData.uid,
        display_name: this.display_name,
        photo_url: this.userData.photoURL
      });
      
      alert('更新完了しました');
    }
  }
}



</script>

<style>

.user_icon {
  border-radius: 50%;
  width:  30px;
  height: 30px;
}


</style>

