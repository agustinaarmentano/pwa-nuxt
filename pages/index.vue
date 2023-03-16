<template>
  <!-- <v-row>
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
  </v-row> -->
  <v-row>
    {{ photo }}
    <!-- <input type="file" accept="image/*" capture="camera" @change="handleFileUpload"> -->
    <div v-if="imageUrl">
      <img :src="imageUrl">
    </div>
    <v-col
      v-for="n in 9"
      :key="n"
      class="d-flex child-flex"
      cols="4"
    >
      <v-img
        :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
        :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
        aspect-ratio="1"
        max-height="300"
        class="grey lighten-2"
      >
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-col>
    <v-bottom-navigation v-model="value">
      <v-btn height="100%" >
        <v-file-input
          class="ml-2"
          hide-input
          truncate-length="1"
          prepend-icon="mdi-camera-plus"
          @change="handleFileUpload"
          :value="photo"
        ></v-file-input>
      </v-btn>
    </v-bottom-navigation>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      datos: [],
      selectedImage: null,
      photo: '',
      form: {
        title: '',
        body: '',
        userId: 1,
      },
      imageUrl: ''
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
    },
    handleFileUpload(event) {
      console.log(event)
      const file = event;
      this.imageUrl = URL.createObjectURL(file);
    },
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
