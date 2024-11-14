let key = '9f25b6bc805c4414af790e9056111e64'

async function ColetarDados(type, num, console_){
    let dados = await fetch(`https://api.rawg.io/api/platforms?key=${key}`).then(Response => Response.json())
    
    let objeto = dados.results[type].games[num]
    let nome = objeto.name

    console.log(dados)

    MudarNome(num, nome, console_)
    MudarImagem(num, nome, console_, dados.results[type].id)
}

function MudarNome(num, nome, console_){
    let nomeJogo = document.getElementById(`NomeJogo${console_}${num}`)

    nomeJogo.innerHTML = `${nome}`
}

async function MudarImagem(num, nome, console_, id){
    let dados = await fetch(`https://api.rawg.io/api/games?key=${key}&platforms=${id}`).then(Response => Response.json())

    for (let i in dados.results){

        let jogo = dados.results[i]

        if (jogo.name == nome){
            let image = jogo.background_image

            let imagemJogo = document.getElementById(`ImagemJogo${console_}${num}`)

            imagemJogo.src = `${image}`

            let divJogo = document.getElementById(`Jogo${console_}${num}`)

            divJogo.addEventListener('click', () => {
                ExibirSaibaMaisJogo(nome, jogo)
        
            });
        }
    }
}


for (let i = 0; i<=5; i++){
    ColetarDados(0, i, 'Pc')
}

for (let i = 0; i<=5; i++){
    ColetarDados(1, i, 'Ps5')
}

let jogosPc = document.getElementById('ExplorarJogosPC')


console.log(jogosPc)

jogosPc.addEventListener('click', () => {
  sessionStorage.setItem('console', 4)
  window.location.href = "videogames.html";
  }); 
  
  
let jogosPs5 = document.getElementById('ExplorarJogosPS5')

jogosPs5.addEventListener('click', () => {

  sessionStorage.setItem('console', 187)

  window.location.href = "videogames.html";
  }); 
  
  

function ExibirSaibaMaisJogo(NomeConsole, jogo){

    let saibaMais = document.getElementById(`SaibaMaisJogo`)

    saibaMais.classList.remove('exibir')
    console.log(jogo)

    setTimeout(() => {
        saibaMais.classList.add('exibir')

        let datatexto = jogo.updated

        let textoLojaOficialPs = ""
        let textoLojaOficialNS = ""

        if (NomeConsole.search('PlayStation') >= 0) {

            textoLojaOficialPs = `
            <a href="https://www.playstation.com/pt-br/games/${jogo.slug}">

                <button class="LojaPS">
                    <img src="https://www.freepnglogos.com/uploads/playstation-png-logo/playstation-png-logo-0.png">
                    Loja Oficial!
                </button>
            
            </a>
            `
        }

        if (NomeConsole.search('Nintendo Switch') >= 0) {

            textoLojaOficialNS = `
            <a href="https://www.nintendo.com/pt-br/store/products/${jogo.slug}-switch/">

                <button class="LojaPS">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Nintendo_Switch_Logo.svg/1200px-Nintendo_Switch_Logo.svg.png">
                    Loja Oficial!
                </button>
            
            </a>
            `
        }
        
        saibaMais.innerHTML = 
        `
        <button onclick="FecharSaibaMais()">X | Fechar</button>

        <div class="Conteudo">

            <img src="${jogo.background_image}" alt="" onerror="this.onerror=null;this.src='https:/th.bing.com/th/id/OIP.2jS3dlhS3m8vk65BGF8ZrAHaEK?rs=1&pid=ImgDetMain';">

            <div class="Textos">
                <h3>${jogo.name}</h3>
                <p><b>Última atualização: </b>${datatexto.substr(8, 2)}/${datatexto.substr(5, 2)}/${datatexto.substr(0, 4)}</p>
                <p><b>Avaliação: </b>${jogo.rating}</p>
                <p><b>Categoria: </b>${jogo.genres[0].name}</p>
            </div>
            
        </div>

        <div class="lojasOficiais">
            ${textoLojaOficialPs}
            ${textoLojaOficialNS}
        </div>

        <h3>Plataformas compatíveis</h3>
        <div id="plataformas">

        </div>
        <h3>Capturas de imagem</h3>
        <div id="gameplay">
           

        </div>
        `

        let gameplay = document.getElementById('gameplay')

        for (let n in jogo.short_screenshots){
           
            let imagem = jogo.short_screenshots[n]

            let novaImagem = document.createElement('img')
            novaImagem.src = `${imagem.image}`

            gameplay.appendChild(novaImagem)
        }

        
        let plataformas = document.getElementById('plataformas')

        for (let n in jogo.platforms){
            let nomeConsole = jogo.platforms[n].platform.name

            let NovoNomeConsole = document.createElement('h4')
            NovoNomeConsole.innerHTML = ` • ${nomeConsole}`
            NovoNomeConsole.className = 'NomePlataforma'
            
            plataformas.appendChild(NovoNomeConsole)
        }

    }, 1000)
}

function FecharSaibaMais(){
    let saibaMais = document.getElementById(`SaibaMaisJogo`)

    saibaMais.classList.remove('exibir')
}
