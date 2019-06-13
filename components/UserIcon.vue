<template>
<div>
  <img :src='photo_url' class='user_icon' >
</div>
</template>
  
<script>

import user_icon_none from '~/assets/user_icon_none.png'

export default {
  props: ['props_photo_url'],
  data(){
    return{ photo_url : '' }
  },
  mounted() {
    if(this.props_photo_url == '' || typeof this.props_photo_url == 'undefined' ){
      this.photo_url = user_icon_none;
    } else {
      this.photo_url = this.props_photo_url;
    }
  },
  watch: {
    //親側で、アイコンurlが変更されたら連動して変わるように対応する。
    props_photo_url() {
      this.photo_url = this.props_photo_url;
    }
  }
}

</script>

<style>

.user_icon {
  border-radius: 50%;
  width:  30px;
  height: 30px;
}

</style>