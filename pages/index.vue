<template>
  <section class="container">
    
    <div>
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
            推薦してる人とコメント(実装優先度低)
          </div>
          <div class="c_box_futter">
            総数:3,貸出数:2 
          </div>
          
          <nuxt-link to="/borrow" class="c_box_button">借りる</nuxt-link>
          
        </div>
      </li>
      
    </div>
    
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'

export default {
  components: {
    AppLogo
  },
  data() {
    return {
      books: [
        {
          title: 'カイゼン・ジャーニー たった1人からはじめて、「越境」するチームをつくるまで',
          thumbnail_url: 'http://books.google.com/books/content?id=ROFLDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
          release_date: '2018-02-07',
          authors:'市谷聡啓,新井剛',
          description:'「日本の現場」に寄り添った、アジャイル開発の実践！ 現場のストーリーで、開発の神髄を学ぼう 【本書の特徴】 ...'
        },
        {
          title: 'リーダブルコード',
          thumbnail_url:'http://books.google.com/books/content?id=Wx1dLwEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
          release_date: '2012-06',
          authors:'Dustin Boswell,Trevor Foucher',
          description:'読んでわかるコードの重要性と方法について解説',
        }
      ],
      testFlg: false
    }
  },
  methods: {
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

