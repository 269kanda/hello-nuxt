<template>
  <section class="container">
    <div>
      
      <h1>本情報を登録するページ</h1>
      
      <div>
        <div>
          ISBN: <input v-model='isbnCode' placeholder='ISBNコード'>
          <button v-on:click='get_book_info'>ISBNを元に本情報を取得</button>
        </div>
        
        <div>
          タイトル: <input v-model='title' placeholder='タイトル'>
        </div>
        <div>
          著者: <input v-model='authors' placeholder='著者'>
        </div>
        <div>
          発売日: 
          <input v-model='release_date' placeholder='発売日'>
        </div>
        
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
      isbnCode:'9784798153346',
      title:'',
      authors:'',
      release_date:''
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
      
      this.title = data.title;
      this.authors = data.authors;
      this.release_date = data.publishedDate;
      
      
      alert('データ取得完了');
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

