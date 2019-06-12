<template>
<div>
    <span v-if='isLoading'>
      loading...
    </span>
    <span v-else>
      <h1>ログイン画面</h1>
      <div @click="googleLogin"><img src="~/assets/btn_google_signin_dark_normal_web.png"></div>
    </span>
</div>
</template>

<script>
import firebase from '@/plugins/firebase'

import { mapActions } from 'vuex'
import { mapMutations } from 'vuex'

export default {
  layout: 'login',
  data () {
    return {isLoading: true}
  },
  async mounted () {
    //ログイン情報の取得
    let user = await new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        //わざわざUserIdに絞って格納しているのは、
        //Storeの値に未定義?Objectを格納しようとするとエラーになるため
        //※現在の型から変更する場合にも起こりうるが、Object型だと↑事象が発生する。
        
        let result = user?{uid: user.uid}:{};
        resolve(result);
      })
    });
    
    //ログイン状態の格納
    this.$store.commit('setAuthInfo', user);
    
    //ログインしていたら、「/」へリダイレクト
    //Google認証から戻ってきた際のリダイレクト先は「/」
    //リダイレクト時は、まだStoreにUser情報を格納できていない為、middlewareの設定によってloginに戻される。
    //再度「/」に遷移させる
    //※ブラウザでreloadした場合、Storeの値が初期化される為、
    //reload先に遷移しようとする→middleware→login画面へ遷移→再度認証情報取得→「/」にリダイレクト
    if (this.$store.getters.isAuthenticated) {
      this.$router.push('/'); 
    } else {
      //リダイレクトしていないということは、ログイン前の為、ログイン画面を表示する。
      //elseに入れているのは、router.pushから遷移までの間に一瞬表示されてしまうのを防ぐため
      this.isLoading = false;
    }
    
  },

  methods: {
    ...mapActions([
      'login',
      'setAuthInfo'
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