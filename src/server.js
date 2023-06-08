import { Server } from "miragejs";

export function makeServer(enviroment = "development") {
  return new Server({
    enviroment,

    routes() {
      this.namespace = "api";
      this.post("/upload-imagem", () => {
        // Simula o processamento do upload da imagem
        // Salve a imagem em um local desejado no servidor
        console.log("helo");
        // Retorna uma resposta falsa com a URL da imagem
        return new Response(
          {
            url: "http://localhost:8080/public/images/download.jpg",
          },
          {},
          {
            url: "http://localhost:8080/public/images/download.jpg",
          }
        );
      });
    },
  });
}
