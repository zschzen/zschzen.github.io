---
title: Jogo da vida de Conway
subtitle: Examplo de como a junção de regras simples determinam comportamentos complexos e completos.
date: 2025-02-09T00:40:00Z
lang: pt
duration: 3min
type: post
---

<!-- transpiled from blog.peres.dev/MATH/2025-01-29-jogo-da-vida.md -->

![Jogo da vida de Conway](/assets/img/posts/game-of-life/header.gif)

<GlslShaders />


## O que ser?

Imagine um universo onde a matemática dança com a simplicidade, onde o compasso de pequenos pontos vivos segue o ritmo efêmero do nascer e do morrer, em um balé sincronizado a cada geração. Não, não se trata de um poema sobre o cosmos, embora até pudesse ser. Falo aqui do [Jogo da Vida de Conway], uma das mais fascinantes interseções entre a lógica matemática e a beleza emergente da vida.

Em 1970, enquanto o mundo vivia suas revoluções culturais e tecnológicas, um matemático chamado [John Conway] (1937 - 2020) brincava com papel quadriculado em sua mesa. Dessa brincadeira aparentemente simples, nasceu algo extraordinário: um universo [Turing-completo] governado por apenas quatro regras matemáticas, tão simples que qualquer um poderia entendê-las, mas tão profundas que até hoje intrigam cientistas e entusiastas.

É bem provável que você já tenha se deparado com alguma forma de representação deste jogo de zero jogadores, o que significa que sua evolução é determinada por seu estado inicial, não necessitando de contribuição de jogadores humanos. De qualquer forma, contemple-o abaixo, implementado através de um fragment shader:


<div style="display: flex; justify-content: center;" class="mt-3">
  <span>
    <canvas class="canvas shadow rounded-10" data-fragment-url="/assets/shaders/gol/gol.frag" width="500" height="350"></canvas>
  </span>
</div>

<div class="text-center mb-3">
  <small class="text-muted">Clique e arraste para criar células e observe seus padrões evolutivos.</small>
</div>


## Regras

Neste sistema, cada célula opera como uma unidade individual dentro de um ambiente dinâmico, onde seu estado ($S$) no tempo $t+1$ é determinado por uma função $f$ que leva em conta os estados de seus vizinhos no tempo $t$.

$$ S_{t+1} = f(N_1, N_2, ..., N_8) $$

![Visualização Gráfico Velocidade Constante](/assets/img/posts/game-of-life/visualization.svg)
_Célula central $S_t$ e suas 8 vizinhas $N_1$–$N_8$ em uma grade 3×3._

As regras desta dança cósmica são simples:

1. **O Milagre do Nascimento**: Uma célula morta, rodeada por exatamente três células vivas, desperta para vida
   $\text{Se } \sum_{i=1}^{8} N_i = 3 \text{ então } S_{t+1} = 1$

2. **A Persistência da Vida**: Uma célula viva com dois ou três vizinhos persiste, como uma chama protegida do vento
   $\text{Se } S_t = 1 \text{ e } \sum_{i=1}^{8} N_i \in \{2,3\} \text{ então } S_{t+1} = 1$

3. **A Solidão**: Com menos de dois vizinhos, uma célula sucumbe à solidão
   $\text{Se } \sum_{i=1}^{8} N_i < 2 \text{ então } S_{t+1} = 0$

4. **A Superpopulação**: Com mais de três vizinhos, uma célula se despede do mundo
   $\text{Se } \sum_{i=1}^{8} N_i > 3 \text{ então } S_{t+1} = 0$

## Como definir

Na linguagem **C + C++**, a implementação seria de alguma forma parecida com o pseudo-código abaixo:


<iframe src="https://coliru.peres.dev/?gist=a360023e30b7cf4b190106472e829407" style="border: none; overflow: hidden; margin: 0 auto; display: block; background-color: #fff;" loading="lazy" title="Embedded content" width="100%" height="600px"></iframe>


> [!NOTE]
> O **double buffer**, neste caso, é ***fundamental*** devido à natureza da atualização simultânea das células. Se modificássemos o **grid diretamente**, *as células processadas primeiro influenciariam indevidamente as seguintes*. Para evitar isso, utilizamos dois **arrays**: um para o **estado atual** e outro para a **próxima geração** ($t+1$). Assim, todas as células são calculadas com base em um único **estado imutável**, *eliminando interferências entre os cálculos*. No final, os **buffers são trocados**.

---

[//]: (Externals)
[Jogo da Vida de Conway]: https://pt.wikipedia.org/wiki/Jogo_da_vida
[John Conway]: https://pt.wikipedia.org/wiki/John_Conway
[Turing-completo]: https://pt.wikipedia.org/wiki/Turing_completude

[//]: (EOF)
