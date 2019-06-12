<template>
  <section class="container">
    
    <div>
      <br>
      <span>先に氏名を登録してください↓</span><br>
      <nuxt-link to="/user-edit" >ユーザー情報登録</nuxt-link>
      <br><br>
      <nuxt-link to="/book-manage" >本の情報登録</nuxt-link>
      <br>
      
      本の情報(書影等)は、GoogleBookより引用しています。
      <li v-for="(book, index) in books" :key="book.isbn_code">
        <div class="c_box">
          <div class="c_box-title">
            {{ book.title }}
          </div>
          <div class="c_box_thumbnail">
            <img :src='book.thumbnail_url'>
            <span v-if="book.thumbnail_url === ''">
              <!-- 書影がない場合の表示 -->
              <img src="~/assets/thumbnail_none.jpg">
            </span>
          </div>
          <div class="c_box-main">
            発売日：{{ book.release_date }}<br>
            著者：
            <ul>
              <li v-for="author in book.authors" :key='author.id'>
                {{ author }}
              </li>
            </ul>
            
            <br>
            {{ book.description }} 
          </div>
          <div class="c_box-sub">
            <!--
              タグとか表示したい
            -->
          </div>
          <div class="c_box_futter">
            <!-- 貸出登録済み かでボタン切り替え -->
            <span v-if="book.lend_flg" class="c_box_button c_box_button_a_click c_box_button1" @click='ledBookCancel(book.isbn_code, index)'>貸</span>
            <span v-else               class="c_box_button c_box_button_b_click c_box_button1" @click='lendBook(book.isbn_code, index)'>貸</span>
            
            <span class="c_box_button c_box_button_b_click c_box_button2" @click='borrowBook(book.isbn_code)'>借</span>
          </div>
          
        </div>
      </li>
      
      
    </div>
    
  </section>
</template>

<script>
import firebase from '@/plugins/firebase'

export default {
  components: {
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
        //データ部分を取得
        let temp = doc.data();
        
        //貸出登録をしているか判断する。(貸出ボタンの切り替えに使用)
        let lend_flg = false;
        if(typeof temp.lend_users != 'undefined'){
          lend_flg = temp.lend_users.some(lend_user => lend_user == this.userData.uid);
        }
        temp.lend_flg = lend_flg;
        
        this.books.push(temp);
      });
    },
    lendBook : function(isbn_code,index){
      //貸出ボタンを選んだ「本」へ貸出ユーザーへの追記
      firebase.db.collection('books').doc(isbn_code).update({
        lend_users: firebase.firestore.FieldValue.arrayUnion(this.userData.uid)
      });
      //貸出登録へ切り替え
      this.books[index].lend_flg = true;
    },
    ledBookCancel : function(isbn_code,index){
      //@index: 該当要素のbooksの位置(lend_flgの切り替えに使用)
      
      //貸出キャンセル
      firebase.db.collection('books').doc(isbn_code).update({
        lend_users: firebase.firestore.FieldValue.arrayRemove(this.userData.uid)
      });
      //貸出前にへ切り替え
      this.books[index].lend_flg = false;
    },
    borrowBook : function(isbn_code){
      this.$router.push('borrow/?isbn_code='+isbn_code);
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
        this.userData = user;
      } else {
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
  
  display: flex;
  justify-content: flex-end;
}

.c_box_button {
  z-index: 3;
  
  max-width: 2vw;
  min-width: 2vw;
  
  border-radius: 4px;
  border: 1px solid #3b8070;
  
  padding: 10px 4vw;
  margin: 0 2vw;
  display: flex;
  justify-content: center;
}

.c_box_button_b_click, .c_box_button_a_click:active {
  color: #3b8070;
  background-color: #ffffff;
}

.c_box_button_b_click:active, .c_box_button_a_click{
  color: #fff;
  background-color: #3b8070;
}






.links {
  padding-top: 15px;
}
</style>

