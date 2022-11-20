<template>
  <div class="finished">
    <div class="page-content">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-12">
            <div class="info">
              <img
                class="finished-person"
                src="@/assets/images/finished-person.png"
                alt="person"
              >
              <div class="text">
                <h3>Thank You!</h3>
                <p>
                  簽署檔案
                  <span>
                    已下載完成
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
                </p>
                <router-link
                  to="/"
                  class="btn btn-home"
                >
                  回首頁
                </router-link>
              </div>
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
  name: 'Finished'
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/page/_finished.scss';
</style>
