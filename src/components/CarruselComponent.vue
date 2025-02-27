<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="6000"
      :controls="true"
      background="#ababab"
      style="text-shadow: 1px 1px 2px #333; width: 100%; height: auto"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <!--<b-carousel-slide :img-src="url_env + '/backassets/carrusel/rect22.png'">
        <video
          id="ocScreencapVideo"
          class="video-fluid embed-responsive embed-responsive-16by9"
          controls
          muted
          autoplay
          loop
        >
          <source
            :src="url_env + '/backassets/carrusel/rethinking.mp4'"
            type="video/mp4"
          />
        </video>
      </b-carousel-slide>
      <b-carousel-slide
        :img-src="url_env + '/backassets/carrusel/rethinking_calendario1.png'"
      >
        <h4>
          <a
            style="color: white"
            href="https://www.facebook.com/EducacionAguascalientes/"
            >Clic aquí para transmisión en vivo</a
          >
        </h4>
        <h6>
          <a
            style="color: white"
            href="https://drive.google.com/file/d/10-KYySKVf5On49WXfIUakswt0zQ_nBzm/view?usp=sharing"
            target="__blank"
            >Revisa el perfil de las y los conferencistas aquí</a
          >
        </h6>
      </b-carousel-slide>-->
      <b-carousel-slide>
        <img
          slot="img"
          class="d-block img-fluid w-100"
          :src="url_env + '/backassets/carrusel/banner_conv2022.jpg'"
          alt="image slot"
          v-on:click="redirectTaller"
        />
      </b-carousel-slide>-->
      <!--<b-carousel-slide
        :img-src="url_env + '/backassets/carrusel/nadieSeVaya.jpeg'"
      ></b-carousel-slide>-->
      <!--<b-carousel-slide
              :img-src="url_env + '/backassets/carrusel/bannerdgfc.jpeg'"
      ></b-carousel-slide>"-->

      <!--<b-carousel-slide
        :img-src="url_env + '/backassets/carrusel/tus_manos.png'"
      ></b-carousel-slide>-->
    </b-carousel>
  </div>
</template>

<script>
export default {
  name: "CarruselComponent",
  data() {
    return {
      slide: 0,
      sliding: null,
      url_env: "",
    };
  },
  mounted() {
    this.url_env = process.env.VUE_APP_URL;
  },
  methods: {
    redirectTaller() {
      window.location.href = 'https://sifc.iea.edu.mx'
    },
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
  },
};
</script>

<style>
video {
  min-width: 100%;
  min-height: 100%;
  top: 30px;
  width: auto;
  height: auto;
  transform: translate(0%, 0%);
}
.view {
}
</style>