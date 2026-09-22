(() => {
    "use strict";

    const imagem = document.getElementById("slide");
    const erro = document.getElementById("erro");
    const mensagemErro = document.getElementById("mensagemErro");
    const statusWakeLock = document.getElementById("statusWakeLock");

    let indiceAtual = 0;
    let slideTimer = null;
    let refreshTimer = null;
    let wakeLock = null;

    function log(...mensagem) {
        if (CONFIG.debug) {
            console.log("[PAINEL]", ...mensagem);
        }
    }

    function obterUrlSlide(nomeArquivo) {
        const separador = nomeArquivo.includes("?") ? "&" : "?";
        return CONFIG.evitarCache
            ? `${CONFIG.pastaSlides}${nomeArquivo}${separador}v=${Date.now()}`
            : `${CONFIG.pastaSlides}${nomeArquivo}`;
    }

    function carregarSlide() {
        if (!CONFIG.slides.length) {
            mostrarErro("Nenhum slide foi configurado em js/config.js.");
            return;
        }

        const slideAtual = CONFIG.slides[indiceAtual];

        log(`Carregando ${indiceAtual + 1}/${CONFIG.slides.length}: ${slideAtual}`);
        imagem.src = obterUrlSlide(slideAtual);
    }

    function mostrarErro(mensagem) {
        imagem.style.display = "none";
        erro.style.display = "flex";
        mensagemErro.textContent = mensagem;
    }

    function proximoSlide() {
        indiceAtual = (indiceAtual + 1) % CONFIG.slides.length;
        carregarSlide();
    }

    imagem.addEventListener("load", () => {
        imagem.style.display = "block";
        erro.style.display = "none";
        log("Slide carregado.");
    });

    imagem.addEventListener("error", () => {
        const slideAtual = CONFIG.slides[indiceAtual];
        log("Erro ao carregar:", slideAtual);
        mostrarErro(`Não foi possível carregar: ${slideAtual}`);
    });

    async function ativarWakeLock() {
        if (!CONFIG.manterTelaAtiva) return;

        if (!("wakeLock" in navigator)) {
            log("Wake Lock não suportado neste navegador.");
            statusWakeLock.textContent = "Wake Lock indisponível";
            return;
        }

        try {
            if (wakeLock && !wakeLock.released) return;

            wakeLock = await navigator.wakeLock.request("screen");
            statusWakeLock.textContent = "Tela ativa";
            log("Wake Lock ativado.");

            wakeLock.addEventListener("release", () => {
                log("Wake Lock liberado.");
                statusWakeLock.textContent = "Tela ativa - aguardando";
            });
        } catch (e) {
            statusWakeLock.textContent = "Wake Lock bloqueado";
            console.warn("[PAINEL] Wake Lock:", e);
        }
    }

    document.addEventListener("visibilitychange", async () => {
        if (document.visibilityState === "visible") {
            await ativarWakeLock();
        }
    });

    function iniciarSlides() {
        if (!CONFIG.slides.length) {
            mostrarErro("Nenhum slide foi configurado.");
            return;
        }

        carregarSlide();

        clearInterval(slideTimer);
        slideTimer = setInterval(proximoSlide, CONFIG.tempoSlide);
    }

    function iniciarAtualizacaoAutomatica() {
        if (!CONFIG.atualizacaoAutomatica) return;

        clearInterval(refreshTimer);
        refreshTimer = setInterval(() => {
            log("Atualização automática da página.");
            window.location.reload();
        }, CONFIG.tempoAtualizacao);
    }

    async function iniciarPainel() {
        log(`${CONFIG.painel.nome} - versão ${CONFIG.painel.versao}`);
        iniciarSlides();
        iniciarAtualizacaoAutomatica();
        await ativarWakeLock();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciarPainel);
    } else {
        iniciarPainel();
    }
})();
