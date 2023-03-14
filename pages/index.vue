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
    <v-col class="text-center">
      <v-btn id="boton" @click="post()">petición post</v-btn>
      <p v-if="post_success">✅ peticion realizada ✅</p>
      <p v-if="sync">Perdiste tu internet y ya volvio 😄</p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      datos: [],
    }
  },
  methods:{
    async get(){
      this.datos = await this.$get()
    },
    async post(){
      this.$post(
        {
          title: 'titulo',
          body: 'body',
          userId: 1,
        }
      ).then(() => {}
      )
    }
  },
  computed:{
    post_success(){
      return this.$store.state.post_success
    },
    sync(){
      return this.$store.state.sync
    }
  }
}
</script>
