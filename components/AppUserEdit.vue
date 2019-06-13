<template>
  <div>
    <div>
      <div>
        アイコン(現状はソーシャルログイン元から取得のみ対応)：
        <br>
        <input hidden v-model='photo_url'>
        <UserIcon :props_photo_url='photo_url'></UserIcon>
        <br>
      </div>

      <div>
        表示名称：<input v-model='display_name' placeholder='表示名称'>
      </div>
    </div>
    <br>
    <button @click='userUpdate'>登録</button>
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'
import UserIcon from '@/components/UserIcon.vue'

import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  components: {
    firebase,
    UserIcon
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
    ...mapGetters([
      'getUserData'
    ]),
    userUpdate: async function(){
      //ユーザー情報更新
      firebase.db.collection('users').doc(this.authUserData.uid).set({
        id: this.authUserData.uid,
        display_name: this.display_name,
        photo_url: this.photo_url
      });
      
      //ユーザー情報の格納
      this.$store.commit('setUser', await this.getUserData(this.authUserData.uid));
      
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

