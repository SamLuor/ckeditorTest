<template>
  <ckeditor
    ref="editorRef"
    v-model="editorData"
    :editor="editor"
    :config="editorConfig"
    @ready="receiveData"
  ></ckeditor>
  <button class="buttonTest" @click="clone">Clone Editor</button>
  <button class="buttonTest" @click="sendBackData">Send Data</button>
  <div ref="editorClone" class="ck-content"></div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-vue";
import { MyUploadAdapter } from "./upload-adapter/uploadAdapter.js";
import "../src/styles/style-ck-editor.css"
import axios from "axios";

export default {
  name: "App",
  components: {
    ckeditor: CKEditor.component,
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData: "",
      editorConfig: {
        protectedSource: [
          // eslint-disable-next-line no-useless-escape
          /<[\s\S]*?\>/g,  // Allows all HTML tags and their content
          /<div[\s\S]*?>[\s\S]*?<\/div>/g  // Allows <div> tags and their content
        ],
        htmlFilter: {
          isSecure: false
        },
        extraPlugins: [
          function (editor) {
            editor.plugins.get("FileRepository").createUploadAdapter = (
              loader
            ) => {
              return new MyUploadAdapter(loader);
            };
          },
        ],
      },
    };
  },
  methods: {
    clone() {
      this.$refs.editorClone.innerHTML = this.editorData;
    },
    async sendBackData() {
      const data = `<div class="ck-content">${this.editorData}</div>`

      console.log(data);

      const response = await axios.post('http://localhost:3000/content', {
        data: {
          editorContent: data
        }
      })

      console.log(response)
    },
    async receiveData() {
      const response = await axios.get('http://localhost:3000/data')

      this.editorData = response.data.data
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.buttonTest {
  margin: 1rem;
  padding: 1rem;
}
.ck-content .non-editable {
  cursor: not-allowed;
}
</style>
