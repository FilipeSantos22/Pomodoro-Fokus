const html              = document.querySelector('html');
const focoBt            = document.querySelector('.app__card-button--foco');
const curtoBt           = document.querySelector('.app__card-button--curto');
const longoBt           = document.querySelector('.app__card-button--longo');
const banner            = document.querySelector('.app__image');
const titulo            = document.querySelector('.app__title');
const botoes            = document.querySelectorAll('.app__card-button');
const startPauseBt      = document.querySelector('#start-pause');
const musicaFocoInput   = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iniciarPausarIcon = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela       = document.querySelector('#timer');
let descansarBt        = document.querySelector('#rest-pause');

const musica                = new Audio('./sons/luna-rise-part-one.mp3');
const audioPlay             = new Audio('./sons/play.wav');
const audioPausa            = new Audio('./sons/pause.mp3');
const audioTempoFinalizado  = new Audio('./sons/beep.mp3');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;
let descanso = false;

musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
    descansarBt.innerHTML = 'Descansar';

})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
    descansarBt.innerHTML = 'Focar';

})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
    descansarBt.innerHTML = 'Focar';
    descanso = true;

})

descansarBt.addEventListener('click', () => {
    if(descanso == false){
        descansarBtn('descanso-curto');
    } else {
        focarBtn('foco');
    }
   
})

function alterarContexto(contexto) {
    
    mostrarTempo();

    botoes.forEach(function (contexto){
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>`;
        default:
            break;
    }

}

function descansarBtn(contexto) {
    
    tempoDecorridoEmSegundos = 300;
    alterarContexto(contexto);
    curtoBt.classList.add('active');
    descansarBt.innerHTML = 'Focar';
    descanso = true;
}

function focarBtn(contexto) {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto(contexto);
    focoBt.classList.add('active');
    descansarBt.innerHTML = 'Descansar';
    descanso = false;
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        // audioTempoFinalizado.play();
        alert('Tempo finalizado!');
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {

    if(intervaloId){
        audioPausa.play();
        zerar();
        return;
    }
    audioPlay.play();

    //Método setInterval espera sempre dois valores: 1º qual método precisa ser executado. 2º em quanto tempo.
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = 'Pausar';
    iniciarPausarIcon.setAttribute('src', `./imagens/pause.png`);
}

function zerar() {
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = 'Começar';
    iniciarPausarIcon.setAttribute('src', `./imagens/play_arrow.png`);
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleString('pt-br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();