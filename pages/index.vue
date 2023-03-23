<template>
  <div>
    <v-row v-if="!overlay">
      <div v-if="imageUrl">
        <v-img :src="imageUrl" max-height="500" max-width="500"> </v-img>
      </div>
      <div>
      </div>
      <v-col
        v-for="item in imgNoBuffer"
        :key="item"
        class="d-flex child-flex"
        cols="4"
      >
        <v-img
          :src="item"
          alt="image"
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
      <v-bottom-navigation height="80" v-model="value" fixed>
            <h1 v-if="sync">SYNC CON TAG EXISTENTE</h1>
            <v-dialog
              v-model="dialog"
              persistent
              max-width="600px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  height="100%"
                  value="recent"
                  v-bind="attrs"
                  v-on="on">
                  <v-icon x-large >mdi-camera-plus</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">Subi una nueva imagen</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <form @submit.prevent="submitImage">
                      <v-row>
                        <v-col cols="12">
                          <input type="file" @change="handleImageChange" ref="imageInput">
                        </v-col>
                        <v-col cols="12" class="justify-end">
                          <v-btn @click="dialog = false">Cerrar</v-btn>
                          <v-btn type="submit" @click="dialog = false">Subir</v-btn>
                        </v-col>
                      </v-row>
                    </form>
                  </v-container>
                  <small>*indicates required field</small>
                </v-card-text>
              </v-card>
            </v-dialog>
      </v-bottom-navigation>
    </v-row>
    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      imgBackend: null,
      imgNoBuffer: null,
      overlay: null,
      image: null,
      form: {
        title: '',
        body: '',
        userId: 1,
      },
      imageUrl: '',
      dialog: false,
    }
  },
  created() {
    this.getImg()
  },
  methods:{
    // chat
    handleImageChange(event) {
      this.image = event.target.files[0]
    },
    submitImage() {
      this.$postImage(this.image)
      // .then (
      //   this.getImg()
      // )
    },
    async getImg(){
      this.overlay = true;
      this.$getImage()
      .then((result) => {
        this.imgNoBuffer = result
        this.overlay = false;
      })
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
    },
  }
}
</script>
