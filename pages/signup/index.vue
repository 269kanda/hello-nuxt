<template>
  <section class="container">
  <div>
    <h1>ユーザー情報登録</h1>
    <AppUserEdit></AppUserEdit>
  </div>
  </section>
</template>

<script>

import AppUserEdit from '@/components/AppUserEdit.vue';

export default {
    layout: 'login',
    components: {
        AppUserEdit,
    }
};

</script>
