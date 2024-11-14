let key = '9f25b6bc805c4414af790e9056111e64'

async function ColetarDados(){
    let dados = await fetch(`https://api.rawg.io/api/platforms?key=${key}`).then(Response => Response.json())

    let objeto = dados.results

    AdicionarConsole(objeto)
}


let empresas = {
    empresa1: {
        nome: "Sony",
        videogames: {
            console1: "PlayStation",
            console2: "PSP",
            console3: "PS Vita"
        }
    },
    empresa2: {
        nome: "Microsoft",
        videogames: {
            console1: "Xbox"
        }
    },
    empresa3: {
        nome: "Nintendo",
        videogames: {
            console1: "Nintendo",
            console2: "Game Boy",
            console3: "GameCube",
            console4: "SNES",
            console5: "NES",
            console6: "Wii"
        }
    },
    empresa4: {
        nome: "Sega",
        videogames: {
            console1: "SEGA",
            console2: "Dreamcast",
            console3: "Genesis",
            console4: "Game Gear"
        }
    },
    empresa5: {
        nome: "Atari",
        videogames: {
            console1: "Atari",
            console2: "Jaguar"
        }
    }
}

function AdicionarConsoleNaDevidaEmpresa(nome, consoles, novaDiv){

    let verificado = false
    for (let i in empresas){
        let nomeEmpresa = document.getElementById(`ConsolesEmpresa${empresas[i].nome}`)

        for (let x in empresas[i].videogames){
            let position =  nome.search(empresas[i].videogames[x])

            if (position >= 0){
                nomeEmpresa.appendChild(novaDiv)
                verificado = true
                break
            }
        }

        if(verificado == false){
            consoles.appendChild(novaDiv)
        }
        
    }
}

let ano = new Date()
ano = ano.getFullYear()

async function ReceberJogos(jogos, NomeConsole){

    while (ano >= 1990){
        let id = sessionStorage.getItem('console')
        let dados = await fetch(`https://api.rawg.io/api/games?key=${key}&dates=${ano}-01-01,${ano}-12-30&platforms=${id}`).then(Response => Response.json())

        let TodosOsJogos = dados.results
    
        if (TodosOsJogos.length > 0){
            let AnoTexto = document.createElement('h4')
            AnoTexto.innerHTML = `Ano: ${ano}`
            jogos.appendChild(AnoTexto)
        }
        
    
        for (let i in TodosOsJogos){
            let NovoJogo = document.createElement('div')
    
            NovoJogo.className = "jogo"
            NovoJogo.id = `Jogo${id}${ano}`
    
            NovoJogo.innerHTML = 
            `
                <img id="ImagemJogo${id}${i}" src="${TodosOsJogos[i].background_image}" alt="" onerror="this.onerror=null;this.src='https:/th.bing.com/th/id/OIP.2jS3dlhS3m8vk65BGF8ZrAHaEK?rs=1&pid=ImgDetMain';">
                <h3 id="NomeJogo${id}${i}">${TodosOsJogos[i].name}</h3>
                <button>Saiba mais</button>
            ` 
    
            jogos.appendChild(NovoJogo)

            NovoJogo.addEventListener('click', () => {
                ExibirSaibaMaisJogo(NomeConsole ,TodosOsJogos[i])
            }); 
        }
    
        ano--
    }
    

}

async function ExibirInformacoes(DivConsole, informacoesConsole){
    let valor = sessionStorage.getItem('console')
    console.log(valor)

    let info = document.getElementById('InformacoesConsole')
        
    info.classList.remove('Exibir')

    let local = document.getElementById('TopoDasInformacoes')

    let jogos = document.getElementById('JogosDasInformacoes')

    setTimeout(() => {
        info.classList.add('Exibir')

        local.innerHTML = 
        `
            <h3>${informacoesConsole.name}</h3>
            <p><b>Quantidade de jogos: </b>${informacoesConsole.games_count}</p>
        `

        jogos.innerHTML = ""
        ano = new Date()
        ano = ano.getFullYear()

        sessionStorage.setItem('console', informacoesConsole.id)
        ReceberJogos(jogos, informacoesConsole.name)
        

    }, 1000)
    
}
let botaoAnteriorID = -1

function AdicionarConsole(objeto){
    const consoles = document.getElementById('TodosOsConsoles')

    for (let i in objeto){
        let nome = objeto[i].name

        const novaDiv = document.createElement('div');
        novaDiv.className = "console"
        novaDiv.id = `console${nome}`
        
        let valor = sessionStorage.getItem('console')
        
        if (valor == objeto[i].id){
          novaDiv.style.backgroundColor = "#fb7c0584"

          novaDiv.style.borderRadius = "20px"

          botaoAnteriorID = `console${nome}`
          ExibirInformacoes(novaDiv, objeto[i])
        }

        novaDiv.addEventListener('click', () => {
            
            sessionStorage.setItem('console', objeto[i].id)

            if (botaoAnteriorID != -1){
                let botaoAnterior = document.getElementById(botaoAnteriorID)

                botaoAnterior.style.backgroundColor = "#FFFFFF"
                botaoAnterior.style.borderRadius = "0"

            }
            
            novaDiv.style.backgroundColor = "#fb7c0584"
            novaDiv.style.borderRadius = "20px"
            botaoAnteriorID = `console${nome}`
            ExibirInformacoes(novaDiv, objeto[i])
        }); 

        AdicionarConsoleNaDevidaEmpresa(nome, consoles, novaDiv)

        const novaImagem = document.createElement('img');
        novaImagem.src = `${objeto[i].image_background}`

        novaDiv.appendChild(novaImagem)

        const novoTexto = document.createElement('p');
        novoTexto.innerHTML = `${objeto[i].name}`

        novaDiv.appendChild(novoTexto)

        
    }
}

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

ColetarDados()




