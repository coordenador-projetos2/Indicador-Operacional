const CONFIG = {
    painel: {
        nome: "Painel Operacional",
        versao: "1.0.0"
    },

    // Coloque aqui apenas os nomes dos arquivos existentes em /slides
    slides: [
    "Slide1.jpeg",
    "Slide2.jpeg",
    "Slide3.jpeg",
    "Slide4.jpeg",
    "Slide5.jpeg",
    "Slide6.jpeg"
],

    pastaSlides: "./slides/",

    // 10000 = 10 segundos
    tempoSlide: 10000,

    // Recarrega a página após 30 minutos.
    atualizacaoAutomatica: true,
    tempoAtualizacao: 1800000,

    // Evita cache antigo das imagens.
    evitarCache: true,

    // Tenta impedir o bloqueio/escurecimento da tela.
    manterTelaAtiva: true,

    // Deixe false em produção se não quiser mensagens no console.
    debug: true
};
