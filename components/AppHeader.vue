<template>
    <div class='navbar'>
        <span @click='sidebar_show' class='menu_icon'><img :src="menu_icon_img_src"></span>
        <nuxt-link to="/">社内で本の貸し借りとかできたら嬉しい</nuxt-link>
        <AppLogout></AppLogout>
        <nuxt-link to="/user-edit" >
          <UserIcon :props_photo_url=this.$store.state.user.photo_url></UserIcon>
        </nuxt-link>
        
        <transition name='sidebar-fade'>
          <div class='sidebar' v-show='sidebarFlg'>
            <ul>
              <li>
                <nuxt-link to="/">Home</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/mypage">マイページ</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/book-manage">本情報の管理</nuxt-link>
              </li>
              <li> 
                <a
                  href="https://github.com/kandaYusuke/hello-nuxt/tree/master"
                  target="_blank"
                  class="button--green">GitHub</a>
              </li>
            </ul>
          </div>
        </transition>
    </div>
    
</template>

<script>

import AppLogout from '@/components/AppLogout.vue';
import UserIcon from '@/components/UserIcon.vue';

import menuIconImg_white from '~/assets/outline_drag_indicator_white_18dp.png';
import menuIconImg_black from '~/assets/outline_drag_indicator_black_18dp.png';

export default {
  components: {
    AppLogout,
    UserIcon
  },
  data() {
    return {
      sidebarFlg: false,
      menu_icon_img_src: menuIconImg_white
    }
  },
  methods: {
    sidebar_show: function(e){
      this.sidebarFlg = !(this.sidebarFlg);
      //メニューを開いている時は、黒のアイコン、閉じている時は白のアイコンへ画像切り替え
      this.menu_icon_img_src = this.sidebarFlg? menuIconImg_black:menuIconImg_white;
    }
  }
}
</script>

<style>
.navbar {
  z-index: 100;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content:space-between;
  
  height: 7vh;
  margin-bottom: 8vh;
  
  width: 100%;
  background-color: #464775;
  border-bottom: solid 0.1vh;
  
  color: #fff;
}

.navbar a {
  color: #fff;
}

.menu_icon {
  z-index: 102;
  margin: 0 10vw 0vw 2vw;
}

.sidebar {
  z-index: 101;
  position: fixed;
  display: block;
  
  top: 0;
  height: 100vh;
  min-weight: 50vw;
  padding: 4.5vh 1vw;
  background-color: #fff;
}

.sidebar-fade-enter-active, .sidebar-fade-leave-active {
  transition: opacity .5s;
}

.sidebar-fade-enter, .sidebar-fade-leave-to {
  opacity: 0;
}

.sidebar a {
  color: #000;
}

.sidebar ul {
  padding-left: 0px;
}

.sidebar li {
  margin: 30px 0;
}


</style>