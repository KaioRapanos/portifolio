// URL base para a pasta "assets" onde vou colocar os videos
const baseUrl = 'assets/videos';

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

//Chamar a função para adicionar os videos ao carregar a pagina
window.onload = adicionarVideos;