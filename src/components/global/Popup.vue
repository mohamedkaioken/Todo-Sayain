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
              v-model="name"
              :counter="10"
              :rules="nameRules"
              label="Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>

            <v-select
              v-model="select"
              :items="items"
              :rules="[v => !!v || 'Item is required']"
              label="Item"
              required
            ></v-select>
            <v-checkbox
              v-model="checkbox"
              :error-messages="checkboxErrors"
              label="Do you agree?"
              required
              @change="$v.checkbox.$touch()"
              @blur="$v.checkbox.$touch()"
            ></v-checkbox>

            <v-btn class="mr-4" @click="validate">submit</v-btn>
            <v-btn @click="reset">clear</v-btn>
          </v-form>
        </v-card-text>
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
            v-model="date"
            @change="menu1 = false"
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-col cols="12" lg="6">
        <v-menu
          v-model="menu2"
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
            v-model="date"
            @change="menu2 = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
  </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
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
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
  },
  computed: {
     computedDateFormatted () {
        return this.formatDate(this.date)
      },
  },
};
</script>
