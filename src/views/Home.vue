<template>
  <div class="home">
    <div class="page-content">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-12 col-sm-12 col-md-12 col-lg-6">
            <div class="info">
              <div class="section-head">
                <div class="top-title">
                  <img
                    src="~@/assets/images/title-line.png"
                    alt="title line"
                  >
                  <h5>Quicker & Easier</h5>
                </div>
              </div>
              <div class="title">
                <div class="logo">
                  <img
                    src="~@/assets/images/logo-small.svg"
                    alt="logo"
                  >
                </div>
                <h1>
                  Choose The <br>
                  <span class="text-gradient">Quickly Sign</span>
                </h1>
              </div>
              <div class="sub-title">
                <h2>
                  快易簽。
                  <span>
                    更快更容易!
                    <img
                      src="~@/assets/images/subtitle-line.png"
                      alt="subtitle line"
                      class="subtitle-line"
                    >
                    <img
                      src="~@/assets/images/subtitle-pen.png"
                      alt="subtitle pen"
                      class="subtitle-pen"
                    >
                  </span>
                </h2>
                <p>最快速、效率的電子簽名服務，線上文件簽署即簽即傳，讓業務推展順暢無阻</p>
              </div>
              <router-link
                to="/started"
                class="btn-started"
              >
                <span>立即開始</span>
                <font-awesome-icon icon="fa-solid fa-arrow-right" />
              </router-link>
            </div>
          </div>
          <div class="col-12 col-sm-12 col-md-12 col-lg-6">
            <div class="img">
              <img
                src="~@/assets/images/kv-img.png"
                alt="key vision"
                class="key-vision"
              >
              <img
                src="~@/assets/images/kv-pen-rocket.png"
                alt="pen rocket"
                class="rocket"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home'
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/page/_home.scss';
</style>
