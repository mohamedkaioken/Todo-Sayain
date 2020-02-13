<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn color="green lighten-2" dark v-on="on">
          Add New Project
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Add New Project
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="title"
              :counter="10"
              :rules="nameRules"
              label="Title"
              required
            ></v-text-field>

            <v-text-field
              v-model="content"
              label="Content"
              required
            ></v-text-field>
            <v-text-field
              v-model="person"
              :rules="nameRules"
              label="Author"
              required
            ></v-text-field>
            <v-col class="d-flex" cols="12" sm="6">
              <v-select
                v-model="status"
                :items="items"
                label="Outlined style"
                outlined
              ></v-select>
            </v-col>
            <v-btn class="mr-4" @click="validate" :loading="loading"
              >submit</v-btn
            >
            <v-btn @click="reset">clear</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script src="/__/firebase/7.8.0/firebase-app.js"></script>
<script src="/__/firebase/7.8.0/firebase-firestore.js"></script>
<script>
import db from "@/fb";
import format from "date-fns/format";
import firebase from 'firebase/app'
import 'firebase/firestore'
export default {
  name: "Popup",
  data: () => ({
    // date: new Date(timestamp.seconds * 1000),
    // timestamp = { seconds: 1549843200, nanoseconds: 0 },
    due:null,
    menu1: false,
    menu2: false,
    dialog: false,
    valid: true,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    select: null,
    items: ["ongoing", "complete", "overdue"],
    checkbox: false,
    loading: false
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        let date = new firebase.firestore.Timestamp.now;
        const project = {
          title: this.title,
          content: this.content,
          person: this.person,
          due: date ,
          status: this.status
        };
        db.collection("projects")
          .add(project)
          .then(() => {
            this.loading = false;
            this.reset();
          });

      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  },
  
};
</script>
