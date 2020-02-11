<template>
  <nav>
    <v-toolbar app flat color="yellow darken-4">
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        class="black--text"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase white--text">
        <span>Sayains</span>
        <span class="font-weight-bold">Transformation</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn  dark v-on="on">
            <span>Menu</span>
            <v-icon right>expand_more</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="link in links" :key="link.text" :to="link.route">
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn flat dark right>
        <span>Reset</span>
        <v-icon right>restore</v-icon>
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer app v-model="drawer" temporary class="lighten-2 green">
      <v-col class="mt-5">
        <v-row justify="center">
          <v-avatar size="100">
            <img
              src="https://i1.sndcdn.com/avatars-000372699869-0xty53-t500x500.jpg"
              alt="Kakaroto"
            />
          </v-avatar>
        </v-row>
        <p class="white--text subheading mt-1 text-center">
          Kakaroto
        </p>
        <v-divider class="white"></v-divider>
          <v-flex class="mt-4 mb-3">
          <Popup/>
        </v-flex>
      </v-col>
      <v-list>
        <v-list-item v-for="link in links" :key="link.text" :to="link.route">
          <v-list-item-action>
            <v-icon class="white--text " right>{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class=" white--text title">
              {{ link.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import Popup from './Popup'
export default {
    
  name: "Navbar",
  components:{
      Popup
  },
  data() {
    return {
      drawer: false,
      links: [
        { icon: "filter_1", text: "Dashboard", route: "/" },
        { icon: "filter_2", text: "Projects", route: "/projects" },
        { icon: "filter_3", text: "Teams", route: "/teams" }
      ]
    };
  }
};
</script>
