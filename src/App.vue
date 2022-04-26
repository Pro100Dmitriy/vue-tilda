<template>
  <img alt="Vue logo" src="./assets/img/logo.png">
  <MainPage title="Hello Main Page"/>
</template>

<script>
import MainPage from '@/pages/MainPage'

import '@/assets/less/main.less'

export default {
  name: 'App',
  components: {
    MainPage
  }
}
</script>
