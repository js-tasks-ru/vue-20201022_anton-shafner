<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{'image-uploader__preview-loading': loading}"
      :style="bgStyles"
    >
      <span v-if="imageId">Удалить изображение</span>
      <span v-else-if="loading">Загрузка...</span>
      <span v-else>Загрузить изображение</span>
      <input
        type="file"
        accept="image/*"
        class="form-control-file"
        :value="value"
        @click="clickHandler"
        @change="changeHandler"
      />
    </label>
  </div>
</template>

<script>
import { ImageService } from '../image-service';

export default {
  name: 'ImageUploader',
  props: {
    imageId: {
      type: Number,
      default: null
    }
  },
  model: {
    prop: 'imageId',
    event: 'change',
  },
  data() {
    return {
      loading: false,
      value: ''
    }
  },
  methods: {
    async changeHandler(event) {
      const fileList = event.target.files;
      if (fileList.length) {
        this.loading = true;
        const img = await ImageService.uploadImage(fileList[0]);
        this.loading = false;
        this.$emit('change', img.id);
      }
    },
    clickHandler(event) {
      if (this.imageId) {
        event.preventDefault();
        this.value = '';
        this.$emit('change', null);
      }
    }
  },
  computed: {
    imageUrl() {
      return ImageService.getImageURL(this.imageId);
    },
    bgStyles() {
      if (this.imageId) {
        return `--bg-image: url('${this.imageUrl}')`;
      }
    }
  }
};
</script>

<style scoped>
.image-uploader .form-control-file {
  opacity: 0;
  height: 0;
}

.image-uploader .image-uploader__preview {
  --bg-image: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
    ),
    var(--bg-image);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader .image-uploader__preview > span {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader .image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader .image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
