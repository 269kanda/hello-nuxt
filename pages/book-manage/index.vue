<template>
  <section class="container">
    <div>
      <nuxt-link to="/">home</nuxt-link><br>
      
      <h1>本情報を登録するページ</h1>
      
      <div>
          <div>
            ISBN(-抜き): <input v-model='isbnCode' placeholder='ISBNコード'>
            <button @click='get_book_info'>ISBNを元に本情報を取得</button>
            <br>この後、「-」抜きを自動でするように変更、存在しないISBNコード時のcatch処理(今はエラー落ち)を追加する必要あり
          </div>
          
          <div>
            タイトル: <input hidden v-model='title' placeholder='タイトル'>
            {{ title }}
          </div>
          <div>
            書影：
            <input hidden v-model='thumbnail_url' placeholder='書影img_url'>
            <img :src="thumbnail_url">
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
      thumbnail_url:''
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
    },
    get_book_info: async function(event) {
      //Google BookのAPIを使用してISBNコードを元に本情報を取得
      let baseUrl = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';
      let googleSerchUrl;
      googleSerchUrl = baseUrl + this.isbnCode;
      
      const response = await axios.get(googleSerchUrl);
      const data = response.data.items[0].volumeInfo;
      
      //取得した情報を入力フォームへ
      this.title = data.title;
      this.authors = data.authors;
      this.release_date = data.publishedDate;
      this.description = response.data.items[0].searchInfo.textSnippet;
      this.thumbnail_url = data.imageLinks.smallThumbnail;
      
      alert('データ取得完了');
    },
    
    add: function(event) {
      //本情報登録
      
      let data = {
        isbn_code     : this.isbnCode     ,
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

