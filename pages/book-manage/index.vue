<template>
  <section class="container">
    <div>
      
      <h1>本情報を登録するページ</h1>
      
      <div>
          <div>
            ISBN: <input v-model='isbnCode' placeholder='ISBNコード'>
            <button @click='get_book_info'>ISBNを元に本情報を取得</button>
          </div>
          
          inputできるようにしているけどチェック処理の実装を省きたいので、入力不可に変更予定
          
          <div>
            タイトル: <input v-model='title' placeholder='タイトル'>
          </div>
          <div>
            書影(これは非表示項目、画像だけ表示させる)：
            <input v-model='thumbnail_url' placeholder='書影img_url'>
          </div>
          <div>
            <img :src="thumbnail_url">
          </div>
          <div>
            発売日: 
            <input v-model='release_date' placeholder='発売日'>
          </div>
          <div>
            著者: <input v-model='authors' placeholder='著者'>
          </div>
          <div>
            あらすじ: 
            <textarea v-model='description' placeholder='あらすじ'></textarea>
          </div>

          <button @click='add'>登録(まだハリボテ)</button>
        
        
        <br>
        
      </div>
      
    </div>
  </section>
</template>

<script>

import axios from 'axios'

export default {
  data() {
    return {
//TODO：ISBNコードは本来は''で渡す。開発時に不便なので仮で初期値を渡している
      isbnCode:'9784798153346',
      title:'',
      authors:'',
      release_date:'',
      description:'',
      thumbnail_url:''
    }
  },
  methods: {
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
      
      
      //初期化
      this.isbnCode = '';
      this.title = '';
      this.authors = '';
      this.release_date = '';
      this.description = '';
      this.thumbnail_url = '';
      
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

