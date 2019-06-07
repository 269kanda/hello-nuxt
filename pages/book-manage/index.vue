<template>
  <section class="container">
    <div>
      <nuxt-link to="/">home</nuxt-link><br>
      
      <h1>本情報を登録するページ</h1>
      
      <div>
          <div>
            ISBN: <input v-model='isbnCode' placeholder='ISBNコード'>
            <button @click='get_book_info'>ISBNを元に本情報を取得</button>
            <br>※ISBN10でも本情報は取得出来ます。登録はISBN13で行われます。
          </div>
          
          <div>
            タイトル: {{ title }}
             <input hidden v-model='title' placeholder='タイトル'>
          </div>
          <div>
            書影：<img :src="thumbnail_url">
            <input hidden v-model='thumbnail_url' placeholder='書影img_url'>
          </div>
          <div>
            発売日: 
            <input hidden v-model='release_date' placeholder='発売日'>
            {{ release_date }}
          </div>
          <div>
            著者: <input hidden v-model='authors' placeholder='著者'>
            {{ authors }}
          </div>
          <div>
            あらすじ: 
            <textarea hidden v-model='description' placeholder='あらすじ'></textarea>
            {{ description }}
          </div>
          <div>
            ISBN13コード: {{ icbn_code_13 }}
          </div>

          <button @click='add'>登録</button>
        
        
        <br>
        
      </div>
      
    </div>
  </section>
</template>

<script>

import axios from 'axios'
import firebase from '@/plugins/firebase'

export default {
  data() {
    return {
      isbnCode:'',
      title:'',
      authors:'',
      release_date:'',
      description:'',
      thumbnail_url:'',
      icbn_code_13: ''
    }
  },
  methods: {
    init: function(){
      //入力フォームの初期化
      this.isbnCode = '';
      this.title = '';
      this.authors = '';
      this.release_date = '';
      this.description = '';
      this.thumbnail_url = '';
      this.icbn_code_13 = '';
    },
    get_book_info: async function(event) {
      //最低限の空文字チェック
      if(!this.isbnCode){
        alert('ISBNコードを入力してください。');
        return;
      }
      
      //'-'を除去
      
      
      //Google BookのAPIを使用してISBNコードを元に本情報を取得
      let baseUrl = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';
      let googleSerchUrl;
      googleSerchUrl = baseUrl + this.isbnCode;
      
      let response = await axios.get(googleSerchUrl);
      try{
        const data = response.data.items[0].volumeInfo;
        
        //取得した情報を入力フォームへ
        this.title = data.title;
        this.authors = data.authors;
        this.release_date = data.publishedDate;
        this.description = response.data.items[0].searchInfo.textSnippet;
        
        this.icbn_code_13  = data.industryIdentifiers[1].identifier;
        
        //サムネイル画像(書影)は、存在していないときがある
        
        if(typeof data.imageLinks != 'undefined'){
          if(data.data.imageLinks.smallThumbnail){
            this.thumbnail_url = data.imageLinks.smallThumbnail;
          }
        }
      }
      catch(e){
        alert('データ取得できませんでした');
      }
    },
    
    add: function(event) {
      //本情報登録
      
      //ISBNコードは、入力欄ではなく取得済みの情報から取得する。
      
      let data = {
        isbn_code     : this.icbn_code_13 ,
        title         : this.title        ,
        authors       : this.authors      ,
        release_date  : this.release_date ,
        description   : this.description  ,
        thumbnail_url : this.thumbnail_url
      }
      firebase.db.collection('books').doc(this.isbnCode).set(data);
      
      //初期化
      this.init();
      
      alert('登録完了');
    }
  }
}


</script>

<style>

.container {
  min-height: 100vh;

  display: flex;
  flex-wrap:wrap;

}


</style>

