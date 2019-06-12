<template>
<div>
    <!-- 本ファイルは現在未使用。login.vueに直接書いている_リファクタリング後に削除予定 -->
    <div @click="googleLogin"><img src="~/assets/btn_google_signin_dark_normal_web.png"></div>
</div>
</template>

<script>
import firebase from '@/plugins/firebase'

import { mapActions } from 'vuex'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {}
  },
  async mounted () {
    //ログイン情報の取得
    let user = await new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        //わざわざUserIdに絞って格納しているのは、
        //Storeの値に未定義?Objectを格納しようとするとエラーになるため
        //※現在の型から変更する場合にも起こりうるが、Object型だと↑事象が発生する。
        const uidObject = {uid: user.uid};
        resolve(uidObject);
      })
    });
    
    //ログイン状態の格納
    this.$store.commit('setUser', user);
    
    //Google認証から戻ってきた際のリダイレクト先は「/」
    //リダイレクト時は、まだStoreにUser情報を格納できていない為、middlewareの設定によってloginに戻される。
    //再度「/」に遷移させる
    //※ブラウザでreloadした場合、Storeの値が初期化される為、
    //reload先に遷移しようとする→middleware→login画面へ遷移→再度認証情報取得→「/」にリダイレクト
    if (user) {
      this.$router.push('/'); 
    }
  },

  methods: {
    ...mapActions([
      'login',
      'setUser'
    ]),
    googleLogin: function() {
      this.login()
        .then(() => console.log('resloved'))
        .catch((err) => console.log(err));
    }
  }
}

</script>

<style>



  
</style>