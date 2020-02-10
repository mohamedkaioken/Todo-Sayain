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
          <v-list>
              <v-list-item v-for="link in links" :key="link.text"  :to="link.route">
                  <v-list-item-action>
                      <v-icon class="white--text " right large>{{link.icon}}</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                      <v-list-item-title class=" white--text title">
                      {{link.text}}
                  </v-list-item-title>
                  </v-list-item-content>
              </v-list-item>
          </v-list>
      </v-navigation-drawer>
    </nav>
</template>
<script>
export default {
  name: "Navbar",
  data () {
      return {
          drawer: false,
          links: [
              {icon:'filter_1', text: 'Dashboard', route:'/'},
              {icon:'filter_2', text: 'Projects', route:'/projects'},
              {icon:'filter_3', text: 'Teams', route:'/teams'},
          ]
      }
  }
}
</script>
