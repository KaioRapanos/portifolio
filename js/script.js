// URL base para a pasta "assets" onde vou colocar os videos
const baseUrl = '/assets/videos/';

// Função para carregar as videos da pasta assets
async function carregarVideos(){
    try{
        //Fazer um solicitacao para obter a listas de arquivos da pasta assets
        const response = await fetch(baseUrl);
        const data = await response.text();

        //Extrair os nomes dos arquivos de video
        const parser = new DOMParser();
        const htmlDocument = parser.parseFromString(data, 'text/html');
        const links = htmlDocument.querySelectorAll('a');

        //Filtrar apenas links que terminan com .mp4
        const videoLinks = Array.from(links)
            .map(link => link.href)
            .filter(href => href.endsWith('.mp4'));
        //Retornar a lista de URLs dos videos
        return videoLinks.map(link => baseUrl + link.split('/').pop());
    } catch (error){
        console.error('Erro ao carregar videos: ', error);
        return [];
    }
}

// Carregar os videos e adicionar ao container quando estiverem prontos
async function adicionarVideos(){
    const container = document.getElementById('video-container');
    const videoUrls = await carregarVideos();

    videoUrls.forEach(url => {
        const videoElement = document.createElement('video');
        videoElement.src = url;
        videoElement.controls = true;
        container.appendChild(videoElement);
    })
}

// Seletor da lista
const listaProjetos = document.querySelector('.projetos');
        
// Seletor dos botões de navegação
const btnEsquerda = document.querySelector('.nav-btn.left');
const btnDireita = document.querySelector('.nav-btn.right');

// Função para rolar a lista para a esquerda
btnEsquerda.addEventListener('click', () => {
    listaProjetos.scrollBy({ left: -200, behavior: 'smooth' });
});

// Função para rolar a lista para a direita
btnDireita.addEventListener('click', () => {
    listaProjetos.scrollBy({ left: 200, behavior: 'smooth' });
});

const caminhoFlags = [
    "assets/flags/java.png",
    "assets/flags/C.png",
    "assets/flags/js.png",
    "assets/flags/kotlin.png",
    "assets/flags/python.png",
    "assets/flags/Angular.png",
    "assets/flags/type.png",
    "assets/flags/react.png",
    "assets/flags/spring.png",
    "assets/flags/mysql.png",
    "assets/flags/mongo.png",
    "assets/flags/git.png",
    "assets/flags/github.png"
]

async function adicionarFlags() {
    const divFlags = document.getElementById("flags");
    const promises = [];

    caminhoFlags.forEach(caminho => {
        const imagem = document.createElement("img");
        const promise = new Promise((resolve, reject) => {
            imagem.onload = resolve;
            imagem.onerror = reject;
        });

        imagem.src = caminho;
        divFlags.appendChild(imagem);
        promises.push(promise);
    });

    await Promise.all(promises);
    console.log("ok ok ok");
}
//Chamar a função para adicionar os videos ao carregar a pagina

function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
      window.onload = func;
    }
    else {
      window.onload = function() {
       if (oldonload) {
        oldonload();
       }
       func();
     }
    }
  }

  addLoadEvent(adicionarVideos);
  addLoadEvent(adicionarFlags);