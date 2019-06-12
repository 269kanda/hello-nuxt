import firebase from '@/plugins/firebase'


const googleProvider = new firebase.auth.GoogleAuthProvider()

export const state = () => ({
  //ログイン済みかの判断に使用
  authInfo: {},
  //ユーザー登録が済んでいる判断とユーザー情報(uidと氏名)に使用
  user: {}
})

export const getters = {
  /* 認証済か判定 */
  isAuthenticated (state) {
    let result = Object.keys(state.authInfo).length?true:false;
    return result;
  }
}

export const mutations = {
  setAuthInfo (state, payload) {
    state.authInfo = payload
  },
  setUser (state, payload) {
    state.user = payload
  }
}

export const actions = {
  //ログイン処理 ※現状はGoogleログインのみ
  login () {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithRedirect(googleProvider)
        .then(() => resolve())
        .catch((err) => reject(err))
    })
  },
  //ログアウト処理 ※現状はGoogleログアウトのみ
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      firebase.auth().signOut()
        .then(() => {
          commit('setAuthInfo', {})
          resolve()
        })
    })
  }

}