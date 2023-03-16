<template>
  <v-row>
    <v-col class="text-center">
      <v-btn @click="get()">petición get</v-btn>
      <h3>listado:</h3>
      <v-card
      max-width="400"
      max-height="200"
      style="overflow:auto!important"
      tile
      >
      <v-list-item v-for="item in this.datos" :key="item.id">{{ item.title }}</v-list-item>
    </v-card>
    </v-col>
    <v-col class="text-center mx-auto">
      <v-row>
        <v-col cols="12" >
          <v-form>
            <v-text-field
            v-model="form.title"
            :counter="10"
            label="Titulo"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.body"
            :counter="10"
            label="Body"
            required
          ></v-text-field>
          </v-form>
          <v-btn id="boton" @click="post()">petición post</v-btn>
        </v-col>
        <v-col cols="12" >
          <v-progress-circular
            v-if="post_loading"
            :size="50"
            color="pink"
            indeterminate
          ></v-progress-circular>
        </v-col>
        <v-col cols="12" >
          <p v-if="post_success">✅ peticion realizada {{ 'titulo:' + this.form.title + ' y body:' + this.form.body }} ✅</p>
          <p v-if="sync">Se activa función luego de post fallido 🥰 {{ post_pending }}</p>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      datos: [],
      form: {
        title: '',
        body: '',
        userId: 1,
      }
    }
  },
  methods:{
    async get(){
      this.datos = await this.$get()
    },
    async post(){
      this.$store.commit('SET_POST_LOADING', true);
      const data = JSON.stringify(this.form)
      localStorage.setItem('postPending', data);
      this.$post(this.form).then(() => {
        this.$store.commit('SET_POST_LOADING', false);
        setTimeout(() => {
          this.form = {
            title: '',
            body: '',
            userId: 1,
          }
        }, "4000");
      })
    }
  },
  computed:{
    post_success(){
      return this.$store.state.post_success
    },
    post_loading(){
      return this.$store.state.post_loading
    },
    sync(){
      return this.$store.state.sync
    },
    post_pending(){
      return this.$store.state.post_pending
    }
  }
}
</script>
