import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

export default {
  install(app) {

    // Defina o cabeçalho e o rodapé como parte da configuração do CKEditor
    ClassicEditor.defaultConfig = {
      toolbar: {
        items: [
          'heading',
          '|',
          'bold',
          'italic',
          'bulletedList',
          'numberedList',
          '|',
          'insertHeader',
          'insertFooter',
        ],
      },
    };

    // Adicione o comando para inserir o cabeçalho
    ClassicEditor.defaultConfig = {
      ...ClassicEditor.defaultConfig,
      extraPlugins: [headerFooterPlugin],
    };

    // Defina a função para inserir o cabeçalho
    const headerFooterPlugin = (editor) => {
      editor.commands.add('insertHeader', {
        exec: (editor) => {
          editor.model.insertContent('<header>Meu cabeçalho</header>');
        },
      });
      editor.commands.add('insertFooter', {
        exec: (editor) => {
          editor.model.insertContent('<footer>Meu rodapé</footer>');
        },
      });
    };

    // Registre o CKEditor como um componente global no Vue
    app.use(CKEditor);
  },
};