<template>
  <v-row>
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
    <v-bottom-navigation v-model="value" fixed>
        <form action="https://patio.dev.cintelink.com.ar/back/images" method="POST" enctype="multipart/form-data">
          <input type="file" name="image_data" id="asd">
          <button class="d-block" type="submit">enviar img</button>
        </form>
    </v-bottom-navigation>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      datos: [],
      imgBackend: null,
      imgNoBuffer: null,
      selectedImage: null,
      image_data: null,
      agus: '',
      form: {
        title: '',
        body: '',
        userId: 1,
      },
      imageUrl: ''
    }
  },
  created() {
    this.getImg()
  },
  methods:{
    postImg(img){
      this.$postImage(img)
    },
    async getImg(){
      this.$getImage()
      .then((result) => {
        this.imgBackend = result
        console.log(this.imgBackend)
        this.imgNoBuffer = this.imgBackend.map((item) => {
          const blob = new Blob([item.data], { type: item.type });
          return URL.createObjectURL(blob);
        })
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
