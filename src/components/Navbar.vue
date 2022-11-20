<template>
  <header class="header-wrapper">
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-6 col-md-3 col-lg-2">
          <div class="brand">
            <router-link
              to="/"
              class="navbar-brand"
            >
              <img
                class="logo"
                src="~@/assets/images/logo.svg"
                alt="logo"
              >
            </router-link>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-7 col-none">
          <ul class="progressbar">
            <li :class="{active : currentSteps === 1, completed: currentSteps > 1}">
              <font-awesome-icon
                v-if="dataUrl.length > 0"
                icon="fa-solid fa-check"
              />
              <span v-else>1</span>
              建立簽名
            </li>
            <li :class="{active : currentSteps === 2, completed: currentSteps > 2}">
              <font-awesome-icon
                v-if="currentSteps >= 2"
                icon="fa-solid fa-check"
              />
              <span v-else>2</span>
              上傳檔案
            </li>
            <li :class="{active : currentSteps === 3, completed: currentSteps > 3}">
              <font-awesome-icon
                v-if="currentSteps >= 3"
                icon="fa-solid fa-check"
              />
              <span v-else>3</span>
              進行簽署
            </li>
            <li :class="{active : currentSteps === 4, completed: currentSteps > 4}">
              <font-awesome-icon
                v-if="currentSteps >= 4"
                icon="fa-solid fa-check"
              />
              <span v-else>4</span>
              下載檔案
            </li>
          </ul>
        </div>
        <div class="col-12 col-sm-6 col-md-3 col-lg-3">
          <div class="download-file">
            <a
              href="javascript:;"
              class="btn-download"
              :class="{disabled : currentSteps <3}"
              @click="download"
            >下載簽署</a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { jsPDF } from 'jspdf'

export default {
  name: 'Navbar',
  props: {
    dataUrl: {
      type: Array,
      required: true
    },
    currentSteps: {
      type: Number,
      required: true
    },
    canvas: {
      type: Object,
      default: function () {
        return []
      }
    }
  },
  data() {
    return {
      pdf: null,
      finished: false
    }
  },
  watch: {
    finished() {
      if (this.finished) {
        this.$router.push('/finished')
      }
    }
  },
  mounted() {
    this.pdf = new jsPDF()
  },
  methods: {
    download() {
      this.newImg = this.canvas.toDataURL('image/png')
      const width = this.pdf.internal.pageSize.width
      const height = this.pdf.internal.pageSize.height
      this.pdf.addImage(this.newImg, 'png', 0, 0, width, height)
      this.pdf.save('download.pdf')
      this.finished = true
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/components/_navBar.scss';
</style>
