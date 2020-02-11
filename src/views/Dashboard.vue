<template>
  <div class="dash">
    <h1 class="text-center">Dashboard</h1>
    <v-container class="my-5">
      <v-row class="mb-3">
        <v-btn small text @click="sortBy('title')">
          <v-icon left small>
            folder
          </v-icon>
          <span class="caption text-lowercase">By project name</span>
        </v-btn>
        <v-btn small text @click="sortBy('person')">
          <v-icon left small>
            person
          </v-icon>
          <span class="caption text-lowercase">By Person name</span>
        </v-btn>
      </v-row>
      <v-fade-transition group>

   
      <v-row
      v-for="project in projects"
        :key="project.title"
      >


      <v-card
        flat
        class="pa-2"
        width="100%"
        
      >
        <v-row :class="`pa-3 project ${project.status}`">
          <v-flex xs12 md6>
            <div class="caption grey--text">Project Title</div>
            <div>{{ project.title }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Person</div>
            <div>{{ project.person }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Due by</div>
            <div>{{ project.due }}</div>
          </v-flex>
          <v-flex xs2 sm4 md2>
            <div class="right">
              <v-chip
                small
                :class="`${project.status} white--text my-2 caption`"
                >{{ project.status }}</v-chip
              >
            </div>
          </v-flex>
          <v-btn @click="removeItem(project)">clear</v-btn>
        </v-row>
        <v-divider></v-divider>
      </v-card>
            </v-row>
               </v-fade-transition>
    </v-container>
  </div>
</template>

<script>
import db from '@/fb'

export default {
  name: "Dash",
  data() {
    return {
      projects: []
    };
  },
    methods: {
    sortBy(prop) {
      this.projects.sort((a,b) => a[prop] < b[prop] ? -1 : 1)
    },
    removeItem(projects) {
      db.collection("projects").doc(projects.id).delete()
      this.projects = this.projects.filter(p => p.id != projects.id)
    }
  },
  created() {
    db.collection('projects').onSnapshot(res => {
      const changes = res.docChanges();
      changes.forEach(change => {
        if (change.type === 'added') {
          this.projects.push({
            ...change.doc.data(),
            id: change.doc.id
          })
        }  
      })
    })
    console.log(this.projects)
  },
  
}
</script>
<style>
.project.complete {
  border-left: 4px solid #3cd1c2;
}
.project.ongoing {
  border-left: 4px solid orange;
}
.project.overdue {
  border-left: 4px solid tomato;
}
.v-chip.complete {
  background: #3cd1c2 !important;
}
.v-chip.ongoing {
  background: #ffaa2c !important;
}
.v-chip.overdue {
  background: #f83e70 !important;
}
</style>
