<template>
    <div class='navbar'>
        <button @click='sidebar_show'>open</button>
        
        <nuxt-link to="/">社内で本の貸し借りとかできたら嬉しい</nuxt-link>
        
        
        <transition name='sidebar-fade'>
          <div class='sidebar' v-show='sidebarFlg'>
            <button @click='sidebar_show'>close</button>
            <ul>
              <li>
                <nuxt-link to="/">マイページ(未実装)</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/book-manage" no-prefetch>本情報の管理</nuxt-link>
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
export default {
  data() {
    return {
      sidebarFlg: false
    }
  },
  methods: {
    sidebar_show: function(e){
      this.sidebarFlg = !(this.sidebarFlg);
    }
  }
}
</script>

<style>
.navbar {
  z-index: 100;
  position: fixed;
  display: block;
  height: 5.5vh;
  margin-bottom: 8vh;
  
  width: 100%;
  background-color: #464775;
  border-bottom: solid 0.1vh;
  
  color: #fff;
}

.navbar a {
  color: #fff;
}

.sidebar {
  z-index: 101;
  position: fixed;
  display: block;
  
  top: 0;
  height: 100vh;
  min-weight: 50vw;
  padding: 0 1vw;
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