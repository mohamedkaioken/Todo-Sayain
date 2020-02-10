<template>
    <nav>
      <v-toolbar 
       app
       flat 
       color="warning"
      >
      <v-app-bar-nav-icon @click="drawer= !drawer" class="black--text"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase yellow--text">
          <span class="font-weight-light">Sayains</span>
          <span >Transformation</span>
      </v-toolbar-title> 
      <v-spacer></v-spacer>
      <v-btn flat dark right>
          <span>Reset</span>
          <v-icon right>restore</v-icon>
      </v-btn>
      </v-toolbar>
      <v-navigation-drawer app v-model="drawer" temporary class="lighten-3 green">
          <p>Test</p>
      </v-navigation-drawer>
    </nav>
</template>
<script>
export default {
  name: "Navbar",
  data () {
      return {
          drawer: false,
      }
  }
}
</script>
