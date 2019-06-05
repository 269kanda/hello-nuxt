<template>
  <section class="container">
    
    <div>
      <span>仮配置: ユーザー認証に使用(今は特に意味なし)</span>
      <AppLogin></AppLogin>
      <div>login状況{{ isLogin }}</div>
      <br>
      <nuxt-link to="/book-manage" no-prefetch>本情報の管理</nuxt-link>
      
      <br>
      CSS色々ミスっているので直す必要あり(借りるボタンの位置ずれ等)<br>
      <br>
      
      本の情報(書影等)は、GoogleBookより引用しています。
      <li v-for="book in books" :key="book.id">
        <div class="c_box">
          <div class="c_box-title">
            {{ book.title }}
          </div>
          <div class="c_box_thumbnail">
            <img :src='book.thumbnail_url'>
          </div>
          <div class="c_box-main">
              発売日：{{ book.release_date }}<br>
              著者：{{ book.authors }}<br>
              {{ book.description }} 
          </div>
          <div class="c_box-sub">
            <!--
              推薦してる人とコメント(実装優先度低)
            -->
          </div>
          <div class="c_box_futter">
            総数:hoge,貸出数:hoge,読了者数:hoge
          </div>
          
          <nuxt-link to="/borrow" class="c_box_button">借りる</nuxt-link>
          
        </div>
      </li>
      
     <li v-for="book in hogeT" :key="book.id">
        <div class="c_box">
          <div class="c_box-title">
            {{ book.title }}
          </div>
         </div>
      </li>
      
      
    </div>
    
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import firebase from '@/plugins/firebase'

import AppLogin from '@/components/AppLogin.vue';
import AppLogout from '@/components/AppLogout.vue';

export default {
  components: {
    AppLogo,
    AppLogin,
    AppLogout
  },
  data() {
    return {
      books: []
    }
  },
  methods: {
    getBooks : async function(){
      //
      let temp = await firebase.db.collection('books').get();
      temp.forEach(doc => {
        this.books.push(doc.data());
      });
    }
  },
  asyncData (context) {
    // コンポーネントをロードする前に毎回呼び出されます
    return { isLogin:false, userData:null}
  },
  created : function() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isLogin = true;
        this.userData = user;
      } else {
        this.isLogin = false;
        this.userData = null;
      };
    });
    
    this.getBooks();
   }
}
</script>

<style>

.container {
  min-height: 100vh;
  margin-left: 10vw;
}

.c_box{
  display: grid;
  grid-gap: 5px;
  
  padding: 0.2vh;
  margin: 0.1vh;
  background-color: #fff;
  
  max-width: 80vw;
  
  border-radius: 4px;
  border: 0.1px solid #f5f5ff;
  
}

.c_box-title {
  z-index: 2;
  
  grid-column: 1 / 6;
  grid-row: 1 / 2;
}

.c_box_thumbnail{
  z-index: 2;
  
  grid-column: 1 / 2;
  grid-row: 2 / 5;
}

.c_box-main {
  z-index: 2;
  
  grid-column: 2 / 6;
  grid-row: 2 / 3;
  
  max-width: 60vw;
  
}

.c_box-sub {
  z-index: 2;
  
  grid-column: 2 / 6;
  grid-row: 3 / 5;
  
}

.c_box_futter {
  z-index: 2;
  
  grid-column: 1 / 6;
  grid-row: 5 / 6;
 
  background-color: #f8ffff;
}

.c_box_button {
  z-index: 3;
  
  grid-column: 4 / 5;
  grid-row: 4 / 6;
  
  max-width: 16vw;
  min-width: 16vw;
  
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  background-color: #ffffff;
  
  padding: 10px 4vw;
}


.c_box_button:hover {
  color: #fff;
  background-color: #3b8070;
}

.links {
  padding-top: 15px;
}
</style>

