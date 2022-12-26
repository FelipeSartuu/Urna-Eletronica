let seuVotoPara = document.querySelector('.d1-1 span');
let cargo = document.querySelector('.d1-2 span');
let descricao = document.querySelector('.d1-4');
let aviso = document.querySelector('.d2');
let lateral = document.querySelector('.d1-right');
let numeros = document.querySelector('.d1-3');

let etapaAtual = 0
let numero = ""
let verify = 1
let votoBranco = false
let votos = []

function comecarEtapa() {
    let etapa = etapas[etapaAtual]
    let numeroHTML = ""
    numero = ""
    votoBranco = false

    for (let i=0; i<etapa.numeros; i++) {
        if (i==0) {
            numeroHTML += '<div class="numero pisca"></div>'
        } else {
        numeroHTML += '<div class="numero"></div>' }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHTML;
}



function atualizaInterface() {
    let etapa = etapas[etapaAtual]
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true
        } else {
            return false
        }
    })
    if (candidato.length > 0) {
        candidato = candidato[0]
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome} <br/>Partido: ${candidato.partido}`;

        let  fotosHTML = ""
        for(let i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                fotosHTML += `<div class="d1-right-image small"><img src="assets/images/${candidato.fotos[i].url}" alt="imagem do eleitor">${candidato.fotos[i].legenda} </div>`
            } else {
            fotosHTML += `<div class="d1-right-image"><img src="assets/images/${candidato.fotos[i].url}" alt="imagem do eleitor">${candidato.fotos[i].legenda} </div>` }
        }
        lateral.innerHTML = fotosHTML
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso-grande pisca">VOTO NULO</div>'
    }
}





function clicou(n) {
    let elNumero = document.querySelector(".numero.pisca")
    if (elNumero !== null) {
        elNumero.innerHTML = n
        numero = `${numero}${n}`
        
        elNumero.classList.remove("pisca")
        if (elNumero.nextElementSibling !== null) {
        elNumero.nextElementSibling.classList.add("pisca")
        
        } else {
            verify = verify + 1
            atualizaInterface()
        }
    }
}

function branco() {
        numero = ""
        votoBranco = true
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso-grande pisca">Voto em Branco</div>'
        lateral.innerHTML = ""
        numeros.innerHTML = ""
    
}

function corrige() {
    comecarEtapa()
}

function confirma() {
    let etapa = etapas[etapaAtual]
    let votoConfirmado = false


    if(votoBranco === true) {
        votoConfirmado = true
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: "branco"

        })

    } else if (numero.length === etapa.numeros) {
        votoConfirmado = true
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero

        })
  
    }

    if (votoConfirmado) {
        etapaAtual++
        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa()
        } else {
            document.querySelector(".tela").innerHTML = `<div class="aviso-gigante pisca">FIM</div>`
            console.log(votos)
        }
    }

}


document.querySelector(".teclado-botao.botao-corrige").addEventListener("click", corrige)
document.querySelector(".teclado-botao.botao-branco").addEventListener("click", branco)
document.querySelector(".teclado-botao.botao-confirmar").addEventListener("click", confirma)


comecarEtapa()