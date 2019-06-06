<template>
<div>
    <transition name='pagetop-fade'>
    <div class='pagetop' v-show="pagetopDisp" v-scroll="handleScroll">
      <a href='#'>^</a>
    </div>
    </transition>
    
</div>
</template>

<script>



export default {
  data() {
    return{
      pagetopDisp: true
    }
  },
  methods: {
    handleScroll: function(evt){
      if(window.pageYOffset > 90){
        this.pagetopDisp = true;
      } else {
        this.pagetopDisp = false;
      }
    }
  }
}

</script>

<style>

.pagetop {
  position: fixed;
  display: block;
  width: 50px;
  height: 50px;
  right: 10%;
  bottom: 8%;
  
  border: 1px solid #35495e;
  border-radius: 30px;
  background-color: #35495e;
  
  display: flex;
  justify-content: center;
  align-items: center;
  
  z-index: 999;
}

.pagetop-fade-enter-active, .pagetop-fade-leave-active {
  transition: opacity .5s;
}

.pagetop-fade-enter, .pagetop-fade-leave-to {
  opacity: 0;
}

.pagetop a {
  font-size: 30px;
  color: #fff;
  text-decoration: none;
  width: 100%;
  height: 100%;
  
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>