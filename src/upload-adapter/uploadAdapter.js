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
          const toBase64 = (file) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => resolve(reader.result);
              reader.onerror = (error) => reject(error);
            });

          return toBase64(file).then((cFile) => {
            return axios
              .post("http://localhost:3000/upload-imagem", {
                imageBinary: cFile,
              })
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
