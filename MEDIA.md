# Mídia do site — imagens e vídeo

Todas as imagens são mapeadas em **um único arquivo: [`src/config/media.ts`](src/config/media.ts)**.
Para trocar uma foto, substitua o arquivo em `src/assets/media/` **mantendo o nome** (ou aponte o import para um arquivo novo). O Astro gera AVIF/WebP em vários tamanhos no build — envie o JPG em boa resolução (ideal: 1920px de largura).

As mídias atuais vieram do **Wikimedia Commons**, com licenças que permitem uso comercial (domínio público, CC BY e CC BY-SA). Licenças CC exigem crédito ao autor: os créditos ficam em [`src/data/media-credits.json`](src/data/media-credits.json) e são exibidos na página **/creditos/** (link no rodapé). Ao trocar uma imagem por foto própria da EARTH, remova a entrada correspondente desse JSON.

> 💡 O ideal é substituir aos poucos por **fotos reais da equipe em campo** — elas transmitem mais confiança que bancos de imagem.

## Vídeo do hero

| Arquivo | Onde aparece | Formato | Atual |
| --- | --- | --- | --- |
| `public/media/hero.webm` + `public/media/hero.mp4` | Fundo do topo da home (só desktop/tablet, sem `prefers-reduced-motion` e sem economia de dados) | 16:9, 1280×720, 12 s, sem áudio, < 3 MB cada | Drone sobre floresta — "Drone flyover video of Myoko-Togakushi Renzan National Park" (Benlisquare, CC BY-SA 4.0) |
| `src/assets/media/hero-poster.jpg` | Imagem do topo (LCP, sempre carregada; é a única exibida no celular) | 16:9, 1920×1080 — **primeiro quadro do vídeo** | Quadro do mesmo vídeo |

Para gerar um vídeo novo a partir de um arquivo seu (`entrada.mp4`), com [ffmpeg](https://ffmpeg.org):

```bash
ffmpeg -ss 0 -i entrada.mp4 -t 12 -an -vf "scale=1280:720,fps=25" -c:v libvpx-vp9 -b:v 0 -crf 44 -row-mt 1 public/media/hero.webm
ffmpeg -ss 0 -i entrada.mp4 -t 12 -an -vf "scale=1280:720,fps=25" -c:v libx264 -preset slow -crf 30 -pix_fmt yuv420p -movflags +faststart public/media/hero.mp4
ffmpeg -ss 0 -i entrada.mp4 -frames:v 1 -q:v 2 src/assets/media/hero-poster.jpg
```

Sugestões de busca (licença livre para uso comercial): Pexels / Pixabay / Mixkit — *"drone forest aerial"*, *"aerial river rainforest"*, *"drone canopy top down"*.

## Fotos

| Arquivo (`src/assets/media/`) | Onde aparece | Proporção ideal | Atual | Busca sugerida (Pexels/Unsplash/Pixabay) |
| --- | --- | --- | --- | --- |
| `servico-licenciamento-ambiental.jpg` | Card + topo de /servicos/licenciamento-ambiental/ | 16:9 (recorte 3:4 no card) | Área industrial à beira de rio (CC BY 3.0) | *environmental engineer inspection industry*, *factory green aerial* |
| `servico-outorga-de-uso-de-agua.jpg` | Card + topo de /servicos/outorga-de-uso-de-agua/ | 16:9 | Rio com ilhas verdes (CC BY-SA 2.0) | *river aerial forest*, *water well pump*, *artesian well* |
| `servico-pgrs-pgrcc.jpg` | Card + topo de /servicos/pgrs-pgrcc/ | 16:9 | Fardos de PET prensados (domínio público) | *recycling sorting*, *waste management facility* |
| `servico-pgr-engenharia-seguranca-do-trabalho.jpg` | Card + topo de /servicos/pgr-engenharia-seguranca-do-trabalho/ | 16:9 | Equipe com EPI em obra (domínio público) | *safety engineer helmet inspection*, *construction safety* |
| `servico-gerenciamento-de-areas-contaminadas.jpg` | Card + topo de /servicos/gerenciamento-de-areas-contaminadas/ | 16:9 | Coleta de solo em campo (CC BY 3.0) | *soil sampling*, *groundwater monitoring well*, *environmental drilling* |
| `servico-cursos-nr-33-e-nr-35.jpg` | Card + topo de /servicos/cursos-nr-33-e-nr-35/ | 16:9 | Trabalho em altura com cinto (domínio público) | *work at height harness*, *confined space rescue training* |
| `servico-palestras-ambientais-e-seguranca-do-trabalho.jpg` | Card + topo de /servicos/palestras-ambientais-e-seguranca-do-trabalho/ | 16:9 | Público em palestra (domínio público) | *workplace safety training presentation*, *corporate seminar* |
| `servico-supressao-de-arvores.jpg` | Card + topo de /servicos/supressao-de-arvores/ | 16:9 | Toras cortadas (domínio público) | *arborist tree removal*, *forest inventory measuring tree* |
| `natureza-mata-atlantica.jpg` | Home (Sobre resumido) + topo de /sobre/ | 4:3 a 16:9 | Mata Atlântica (CC BY-SA 3.0) | *atlantic forest brazil*, *rainforest light* |
| `aerea-rio-floresta.jpg` | Home (Diferenciais/números) + topo de /servicos/ | 16:9 | Rio na floresta, vista aérea (CC BY-SA 2.0) | *aerial forest river drone* |
| `cta-corrego-mata-atlantica.jpg` | Fundo do CTA final (todas as páginas) | 16:9 | Córrego na Mata Atlântica (CC BY-SA 4.0) | *forest stream*, *green waterfall* |
| `sao-paulo-ibirapuera.jpg` | Topo de /contato/ + Sobre ("Quem somos") | 4:3 a 16:9 | Ibirapuera + Av. Paulista (CC BY 3.0) | *São Paulo Ibirapuera park skyline* |

**Texto alternativo (alt):** fica junto de cada imagem em `src/config/media.ts` — atualize ao trocar a foto.

**Não faça hotlink** de imagens externas: baixe o arquivo, coloque em `src/assets/media/` e deixe o Astro otimizar.
