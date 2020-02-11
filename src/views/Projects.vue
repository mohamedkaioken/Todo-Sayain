<template>
  <div class="project">
    <h1 class="text-center mb-4">This is an projects page</h1>
    <v-row justify="center">
    <v-expansion-panels inset accordion>
      <v-expansion-panel v-for="project in projects" :key="project.title">
        <v-expansion-panel-header>{{ project.title }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <div slot="header" class="py-1">{{ project.title }}</div>
          <v-card>
            <v-card-text class="px-4 grey--text">
              <div class="font-weight-bold">Due by {{ project.due }}</div>
              <div>{{ project.content }}</div>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    </v-row>
  </div>
</template>
<script>
import db from '@/fb'

export default {
  name: "Project",
  data() {
    return {
      projects: [ ]
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
  },
};
</script>
