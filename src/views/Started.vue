<template>
  <div class="started">
    <Navbar
      :data-url="dataUrl"
      :current-steps="currentSteps"
      :canvas="canvas"
    />
    <section class="page-wrapper">
      <div class="container">
        <div class="row">
          <div class="col-12 col-sm-12 col-md-12 col-lg-12">
            <div class="main-content">
              <div class="main-panel">
                <div class="signature-block">
                  <ul class="menu-list">
                    <li>
                      <h3 class="title">
                        <font-awesome-icon icon="fa-solid fa-pen-nib" />
                        我的簽名
                      </h3>
                      <div class="sign-display">
                        <div
                          v-for="(item, index) in dataUrl"
                          :key="index"
                          class="sign-item"
                          :class="{ show: dataUrl.length !== [] }"
                        >
                          <img
                            ref="sign"
                            class="sign"
                            :src="item.url"
                            @click="sign(item)"
                          >
                          <el-tooltip
                            class="item"
                            effect="dark"
                            content="移除"
                            placement="right"
                            :disabled="tooltipDisabled"
                          >
                            <span
                              class="remove"
                              :class="{disabled: currentSteps >= 2}"
                              @click="removeSign(index)"
                            >
                              <font-awesome-icon icon="fa-solid fa-trash-can" />
                            </span>
                          </el-tooltip>
                        </div>
                        <button
                          class="create-sign"
                          @click="createSign"
                        >
                          <font-awesome-icon icon="fa-regular fa-square-plus" />
                          建立簽名檔
                        </button>
                      </div>
                    </li>
                  </ul>
                  <el-dialog
                    :visible.sync="dialogCreateSign"
                    center
                  >
                    <div class="canvas-panel">
                      <div class="color-options">
                        <img
                          src="~@/assets/images/hand-sign.png"
                          alt="person"
                          class="hand-sign"
                        >
                        <div class="option-container">
                          <button
                            class="option grey"
                            :class="{ active: strokeColor === '#323338' }"
                            @click="strokeColor = '#323338'"
                          />
                          <button
                            class="option green"
                            :class="{ active: strokeColor === '#139e35' }"
                            @click="strokeColor = '#139e35'"
                          />
                          <button
                            class="option blue"
                            :class="{ active: strokeColor === '#0073EA' }"
                            @click="strokeColor = '#0073EA'"
                          />
                          <button
                            class="option red"
                            :class="{ active: strokeColor === '#D83A52' }"
                            @click="strokeColor = '#D83A52'"
                          />
                        </div>
                      </div>
                      <canvas
                        id="canvas-draw"
                        ref="canvasDraw"
                        :width="canvasWidth"
                        :height="canvasHeight"
                        @mousedown.prevent="startPosition"
                        @mouseup="finishedPosition"
                        @mouseleave="finishedPosition"
                        @mousemove.prevent="draw"
                        @touchstart.prevent="startPosition"
                        @touchend="finishedPosition"
                        @touchcancel="finishedPosition"
                        @touchmove.prevent="draw"
                      />
                      <div
                        class="cursor-pointer"
                        :style="dynamicCursor"
                      />
                    </div>
                    <span
                      slot="footer"
                      class="dialog-footer"
                    >
                      <button
                        class="btn btn-clear"
                        @click="reset"
                      >重寫</button>
                      <button
                        class="btn btn-confirm"
                        @click="saveImg()"
                      >
                        建立簽名檔
                      </button>
                    </span>
                  </el-dialog>
                  <el-dialog
                    :visible.sync="dialogLimitAlert"
                    width="370px"
                    center
                  >
                    <div class="dialog-content">
                      <img
                        src="~@/assets/images/hand-three.png"
                        alt="sign"
                      >
                      <div class="text">
                        <p>最多可建立<span class="quantity">3</span>組簽名檔!</p>
                      </div>
                    </div>
                    <span
                      slot="footer"
                      class="dialog-footer"
                    >
                      <button
                        class="btn btn-confirm"
                        @click="dialogLimitAlert = false"
                      >
                        確認
                      </button>
                    </span>
                  </el-dialog>
                </div>
                <div
                  v-if="fileName === null && !fileNotMatch || !nowUploading "
                  class="upload-block"
                >
                  <div class="upload-body">
                    <div class="input-container">
                      <div
                        v-if="dataUrl.length === 0"
                        class="notice"
                      >
                        <div class="text">
                          <font-awesome-icon icon="fa-solid fa-circle-exclamation" />
                          <p>請先建立簽名檔!</p>
                        </div>
                      </div>
                      <div
                        v-else
                        class="info"
                      >
                        <font-awesome-icon icon="fa-solid fa-arrow-up-from-bracket" />
                        <div class="text">
                          <p>請選擇遇上傳的檔案或將檔案拖曳至此</p>
                          <p>僅支援 PDF 檔案格式</p>
                        </div>
                      </div>
                      <input
                        v-show="dataUrl.length >= 1"
                        id="file"
                        type="file"
                        accept="application/pdf"
                        name="upload"
                        class="upload"
                        @change="uploadFile"
                      >
                      <label
                        v-show="dataUrl.length >= 1"
                        for="file"
                        class="file-trigger"
                        tabindex="0"
                      >
                        <loading :active.sync="nowUploading">
                          <Uploading />
                        </loading>
                        選擇檔案
                      </label>
                      <span
                        class="file-name"
                        :class="{ show: fileName !== null }"
                      />
                    </div>
                    <img
                      v-show="dataUrl.length === 0"
                      class="sign-person"
                      src="@/assets/images/sign-person.png"
                      alt="person"
                    >
                    <img
                      v-show="dataUrl.length > 0"
                      class="file-person"
                      src="@/assets/images/file-person.png"
                      alt="person"
                    >
                  </div>
                </div>
                <div
                  v-show="fileNotMatch !== null && nowUploading"
                  class="canvas-content"
                >
                  <div class="canvas-options">
                    <div class="option zoom">
                      <div
                        class="btn zoom-in"
                        @click="zoomIn"
                      >
                        <font-awesome-icon icon="fa-solid fa-plus" />
                      </div>
                      <p class="zoom-size">
                        {{ width }}%
                      </p>
                      <div
                        class="btn zoom-out"
                        @click="zoomOut"
                      >
                        <font-awesome-icon icon="fa-solid fa-minus" />
                      </div>
                    </div>
                    <div
                      class="option reset"
                      @click="zoomReset"
                    >
                      <div class="btn">
                        <font-awesome-icon icon="fa-solid fa-expand" />
                        <span>重設大小</span>
                      </div>
                    </div>
                    <div
                      class="option date"
                      @click="addDate"
                    >
                      <div class="btn">
                        <font-awesome-icon icon="fa-solid fa-calendar-days" />
                        <span>加入日期</span>
                      </div>
                    </div>
                  </div>
                  <div
                    ref="canvasWrapper"
                    class="canvas-wrapper"
                  >
                    <canvas
                      id="canvas"
                      :style="`width: ${width}% !important`"
                    />
                  </div>
                </div>
                <el-dialog
                  :visible.sync="dialogFile"
                  width="370px"
                  center
                >
                  <div class="dialog-content">
                    <img
                      src="~@/assets/images/hand-file.png"
                      alt="file"
                    >
                    <div class="text">
                      <p v-if="fileSize > 10">
                        檔案大小超過<span>10MB</span>!
                      </p>
                      <p v-else>
                        檔案<span>格式</span>有誤!
                      </p>
                    </div>
                  </div>
                  <span
                    slot="footer"
                    class="dialog-footer"
                  >
                    <button
                      class="btn btn-confirm"
                      @click="clearUploadInfo"
                    >
                      確認
                    </button>
                  </span>
                </el-dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar'
import Uploading from '@/components/Uploading'
import Footer from '@/components/Footer'
import * as moment from 'moment'
import { fabric } from 'fabric'
import * as PDFJS from 'pdfjs-dist/build/pdf.js'
PDFJS.GlobalWorkerOptions.workerSrc =
  '//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.5.207/pdf.worker.min.js'

export default {
  name: 'Started',
  components: {
    Navbar,
    Uploading,
    Footer
  },
  data() {
    return {
      dialogCreateSign: false,
      dialogLimitAlert: false,
      currentSteps: 1,
      isToggle: false,
      canvasDraw: null,
      canvas: null,
      ctx: null,
      canvasWidth: 700,
      canvasHeight: 340,
      screenWidth: null,
      screenHeight: null,
      isPainting: false,
      lineWidth: 4,
      strokeWidth: 16,
      strokeColor: '#323338',
      lineCap: 'round',
      dataUrl: JSON.parse(localStorage.getItem('signData')) || [],
      dynamicCursor: {
        top: '0px',
        left: '0px',
        backgroundColor: '#000000',
        width: '16px',
        height: '16px'
      },
      dialogFile: false,
      nextSteps: false,
      fileType: null,
      fileName: null,
      fileNotMatch: null,
      fileSize: null,
      Base64Prefix: 'data:application/pdf;base64,',
      isUploaded: false,
      nowUploading: false,
      width: 100,
      today: moment().format('YYYY/MM/DD'),
      tooltipDisabled: false
    }
  },
  watch: {
    dataUrl() {
      localStorage.setItem('signData', JSON.stringify(this.dataUrl))
    },
    strokeColor() {
      this.ctx.strokeStyle = this.strokeColor
    },
    dialogCreateSign() {
      if (this.dialogCreateSign) {
        this.$nextTick(() => {
          this.canvasDraw = this.$refs.canvasDraw
          this.canvasDrawInit()
        })
      }
    },
    fileType(newVal, oldVal) {
      this.fileType = newVal
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.screenResize)
  },
  mounted() {
    window.addEventListener('resize', this.screenResize)
    this.screenResize()
    this.canvas = new fabric.Canvas('canvas')
  },
  methods: {
    addDate() {
      const vm = this
      const date = new fabric.Text(this.today, image => {
        image.top = 10
        image.left = 10
        image.scaleX = 0.5
        image.scaleY = 0.5
      })
      vm.canvas.add(date)
      this.$refs.canvasWrapper.scrollTop = 0
    },
    zoomIn() {
      if (this.width < 150) {
        this.width += 10
      }
    },
    zoomOut() {
      if (this.width > 50) {
        this.width -= 10
      }
    },
    zoomReset() {
      this.width = 100
    },
    screenResize() {
      this.screenWidth = window.innerWidth
      this.screenHeight = window.innerHeight
      if (this.screenWidth >= 992 && this.screenWidth <= 1199) {
        this.canvasWidth = 700
      } else if (this.screenWidth >= 768 && this.screenWidth <= 991) {
        this.canvasWidth = 650
        this.tooltipDisabled = true
      } else if (this.screenWidth >= 576 && this.screenWidth <= 767) {
        this.canvasWidth = 450
        this.tooltipDisabled = true
      } else if (this.screenWidth >= 321 && this.screenWidth <= 575) {
        this.canvasWidth = 300
        this.tooltipDisabled = true
      } else if (this.screenWidth <= 320) {
        this.canvasWidth = 260
        this.tooltipDisabled = true
      } else {
        this.canvasWidth = 700
      }
    },
    removeSign(index) {
      this.dataUrl.splice(index, 1)
      localStorage.setItem('signData', JSON.stringify(this.dataUrl))
    },
    canvasDrawInit() {
      this.ctx = this.canvasDraw.getContext('2d')
      this.ctx.lineCap = 'round'
      this.ctx.lineWidth = 4
    },
    getPaintPosition(e) {
      const canvasSize = this.canvasDraw.getBoundingClientRect()
      if (e.type === 'mousemove') {
        return {
          x: e.clientX - canvasSize.left,
          y: e.clientY - canvasSize.top
        }
      } else {
        return {
          x: e.touches[0].clientX - canvasSize.left,
          y: e.touches[0].clientY - canvasSize.top
        }
      }
    },
    startPosition(e) {
      e.preventDefault()
      this.isPainting = true
    },
    finishedPosition() {
      this.isPainting = false
      this.ctx.beginPath()
    },
    draw(e) {
      if (!this.isPainting) return
      const paintPosition = this.getPaintPosition(e)
      this.ctx.lineTo(paintPosition.x, paintPosition.y)
      this.ctx.stroke()
    },
    reset() {
      this.ctx.clearRect(0, 0, this.canvasDraw.width, this.canvasDraw.height)
    },
    saveImg() {
      this.newImg = this.canvasDraw.toDataURL('image/png')
      this.dialogCreateSign = false
      this.reset()
      const signList = {
        url: this.newImg
      }
      if (this.dataUrl.length < 3) {
        this.dataUrl.push(signList)
        return
      }
      localStorage.setItem('signData', JSON.stringify(this.dataUrl))
    },
    createSign() {
      if (this.dataUrl.length >= 3) {
        this.dialogLimitAlert = true
      } else {
        this.dialogCreateSign = true
      }
    },
    async printPDF(pdfData) {
      pdfData = await this.readBlob(pdfData)
      const data = window.atob(pdfData.substring(this.Base64Prefix.length))
      const cMapUrl = 'https://unpkg.com/pdfjs-dist@2.5.207/cmaps/'
      const pdfDoc = await PDFJS.getDocument({
        data: data,
        cMapUrl: cMapUrl,
        cMapPacked: true
      }).promise
      const pdfPage = await pdfDoc.getPage(1)
      const viewport = pdfPage.getViewport({ scale: window.devicePixelRatio })
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      canvas.height = viewport.height
      canvas.width = viewport.width
      const renderContext = {
        canvasContext: context,
        viewport
      }
      const renderTask = pdfPage.render(renderContext)
      return renderTask.promise.then(() => canvas)
    },
    async pdfToImage(pdfData) {
      const scale = 1 / window.devicePixelRatio
      return new fabric.Image(pdfData, {
        scaleX: scale,
        scaleY: scale
      })
    },
    async uploadFile(event) {
      this.nowUploading = true
      this.fileSize = event.target.files[0].size / 1024 / 1024
      this.fileName = event.target.files[0].name
      this.fileType = event.target.files[0].type
      if (this.fileType === 'application/pdf') {
        if (this.fileSize < 10) {
          this.fileNotMatch = false
          this.nextSteps = true
          this.canvas.requestRenderAll()
          const pdfData = await this.printPDF(event.target.files[0])
          const pdfImage = await this.pdfToImage(pdfData)
          this.canvas.setWidth(pdfImage.width / window.devicePixelRatio)
          this.canvas.setHeight(pdfImage.height / window.devicePixelRatio)
          this.canvas.setBackgroundImage(
            pdfImage,
            this.canvas.renderAll.bind(this.canvas)
          )
          this.currentSteps = 2
          setTimeout(() => {
            this.nowUploading = true
          }, 3000)
        } else {
          this.nowUploading = false
          this.dialogFile = true
          event.target.value = ''
        }
      } else {
        this.fileNotMatch = true
        this.nextSteps = false
        this.dialogFile = true
        this.nowUploading = false
        event.target.value = ''
      }
    },
    readBlob(blob) {
      return new Promise((resolve, reject) => {
        this.isUploaded = true
        const reader = new FileReader()
        reader.addEventListener('load', () => resolve(reader.result))
        reader.addEventListener('error', reject)
        reader.readAsDataURL(blob)
      })
    },
    sign(item) {
      if (this.fileNotMatch === false) {
        console.log('執行')
        const vm = this
        fabric.Image.fromURL(item.url, function (image) {
          image.top = 0
          image.scaleX = 0.25
          image.scaleY = 0.25
          vm.canvas.add(image)
        })
        this.currentSteps = 3
        this.$refs.canvasWrapper.scrollTop = 0
      }
    },
    clearUploadInfo() {
      this.fileType = null
      this.fileName = null
      this.fileNotMatch = null
      this.dialogFile = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/page/_started.scss';
</style>
