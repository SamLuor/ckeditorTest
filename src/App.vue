<template>
  <ckeditor
    ref="editorRef"
    v-model="editorData"
    :editor="editor"
    :config="editorConfig"
    @ready="onEditorReady"
  ></ckeditor>
  <button class="buttonTest" @click="clone">Clone Editor</button>
  <button class="buttonTest" @click="setEditorData">setEditor</button>
  <div ref="editorClone"></div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-vue";
import { MyUploadAdapter } from "./upload-adapter/uploadAdapter.js";
import "./styles/style-ck-editor.css";

export default {
  name: "App",
  components: {
    ckeditor: CKEditor.component,
  },
  data() {
    return {
      editorInstance: null,
      editor: ClassicEditor,
      editorData: "",
      editorConfig: {
        removePlugins: ["MediaEmbed"],
        schema: "preserve",
        allowedContent: true,
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
    onEditorReady(event) {
      this.editorInstance = event;
    },
    setEditorData() {
      const newContent = '<div>Novo conteúdo do editor</div>';
      this.editorInstance.setData(newContent);
    },
    clone() {
      this.$refs.editorClone.innerHTML = this.editorData;
    },
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
