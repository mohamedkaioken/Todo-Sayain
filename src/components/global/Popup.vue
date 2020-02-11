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
            <v-container>
              <v-row>
                <v-col cols="12" lg="6">
                  <v-menu
                    v-model="menu1"
                    :close-on-content-click="false"
                    max-width="290"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        :value="computedDateFormatted"
                        clearable
                        label="mm/dd/yy"
                        readonly
                        v-on="on"
                        @click:clear="date = null"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="due"
                      disabled
                      readonly
                      @change="menu1 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-container>
            <v-btn class="mr-4" @click="validate" :loading="loading">submit</v-btn>
            <v-btn @click="reset">clear</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import db from "@/fb";
import format from "dateformat";
export default {
  name: "Popup",
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
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
    loading:false,
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
          this.loading = true;
        const project = {
          title: this.title,
          content: this.content,
          due: format(this.due, "DD MM YYYY"),
          person: this.person,
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
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    }
  }
};
</script>
