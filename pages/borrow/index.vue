<template>
  <section class="container">
  <div>
      <div>
        この本を貸出登録しているユーザー
      </div>
      <ul>
        <li v-for="user in lend_users" :key="user.id">
          <div>
            {{ user }}
          </div>
        </li>
      </ul>
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
    get_lend_user: async function(isbn_code){
      //本を貸してくれるユーザーの名称を取得
      
      //該当本に貸出登録しているユーザーIDを取得→ユーザー名取得
      await this.get_lend_user_id(isbn_code)
        .then(users => {
          if(typeof users === 'undefined') {
            this.lend_users.push('貸出登録者がいません');
          } else if(Object.keys(users).length === 0) {
            this.lend_users.push('貸出登録者がいません');
          } else {
            users.forEach(user_id => {
              //ユーザー名取得
              this.get_user_info(user_id)
                .then(user => {
                  try{
                    this.lend_users.push(user.name)
                  }
                  catch(e){
                    this.lend_users.push('ユーザー名称が登録されていないユーザー')
                  }
                })
            })
          }
        });
    },
    get_lend_user_id: async function(isbn_code){
      //本を貸してくれるユーザーを取得して返却
      let res = await firebase.db.collection('books').doc(isbn_code).get();
      return res.data().lend_users;
    },
    get_user_info: async function(user_id){
      //ユーザーIDを元にユーザー情報を取得
      let res = await firebase.db.collection('users').doc(user_id).get();
      return res.data();
    }
  },
  data(){
    return {
      lend_users: []
    }
  },
  asyncData(context) {
    return {
      isbn_code: context.query['isbn_code']
    }
  },
  mounted(){
    //本の貸出者を表示
    this.get_lend_user(this.isbn_code);
  }
  
}


</script>

<style>

.container {
  min-height: 100vh;

}


.links {
  padding-top: 15px;
}
</style>

