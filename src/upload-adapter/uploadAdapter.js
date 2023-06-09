import axios from "axios";

export class MyUploadAdapter {
  constructor(loader) {
    // The file loader instance to use during the upload.
    this.loader = loader;
  }

  // Starts the upload process.
  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          const fileHandler = (file) =>
            new Promise((resolve, reject) => {

              if((file.size / 1048576) <= 5) {
                const formData = new FormData();
                formData.append("image", file);

                resolve(formData);
              } else {
                reject(`Não foi possivel fazer upload, imagem maior que 5mb`);
              }
            });

          return fileHandler(file).then((image) => {
            return axios
              .post("http://localhost:3000/upload-imagem", image)
              .then((response) => {
                if (response.status) {
                  this.loader.uploaded = true;
                  resolve({
                    default: response.data.url,
                  });
                } else {
                  reject(`Couldn't upload file: ${file.name}.`);
                }
              });
          });
        })
    );
  }
}
