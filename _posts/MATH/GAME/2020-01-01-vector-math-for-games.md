---
title: Matemática vetorial em jogos
author: Leandro Peres
date: 2020-12-22 11:00:00 -0300
categories: [Tutorial]
tags: [WIP, Matemática, Games, Vetores]
#image: https://mathinsight.org/media/image/image/vector_opposite.png
math: true

#$$ \left(\begin{bmatrix} 1 \cr 3 \end{bmatrix} + \begin{bmatrix} 2 \cr 2 \end{bmatrix} \right) \cdot \begin{bmatrix} 4 \cr 4 \end{bmatrix} = 0 $$

---

# Conceitos

## Introdutórios

Na matemática, um vetor é uma contrução capaz de representar uma **direção** e **sentido**, além de possuir sua **intensidade** (módulo ou magnitude).[^footnote]
Um vetor $$ a $$ é representado gráficamente por qualquer seguimento de reta orientado, como exemplo o seguimento $$ \overline{AB} $$.

Genericamente, em jogos um vetor contém coordenadas espaciais e, não tão somente a isto, podem ser classificados em dimensões, bem como:
- 1D (contém x),
- 2D (contém x, y),
- 3D (contém x, y, z),
- 4D (contém x, y, z, w);

#### Representação

Vetor 2D:
$$ \vec{V} = \begin{bmatrix} x \cr y \end{bmatrix} $$

Vetor 3D:
$$ \vec{V} = \begin{bmatrix} x \cr y \cr z \end{bmatrix} $$

## Aplicabilidade em jogos digitais

Vetores são amplamente usados em jogos como descrição cardial da **posição**, **direção** e **velocidade** de um determinado objeto.

Exemplo:

Um jogador está localizado na posição (**3**, **2**) em relação à origem do mundo (**0**, **0**), e está direcionado em (**1**, **0**).

{% include vectorjs.html path="vector-interactive" %}

### Magnitude

Com base no exemplo anterior, podemos deduzir a <span style="color:blue">**distância**</span> do jogador em relação à origem do mundo.
Nota-se que o vetor em um sistema cardial se apresenta como um ***[Triângulo Retângulo]{:target="_blank"}***, e, assim, conseguimos deduzir (em unidades) o tamanho do vetor da posição por intermédio do ***[Teorema de Pitágoras]{:target="_blank"}***:

$$
\eqalign{
|\vec{V}| &= \sqrt[2]{x^2 + y^2} \\
   &= \sqrt{3^2 + 2^2} \\
   &= \sqrt{13} \\
   &\approx 3.61
}
$$

Para **vetores 3D ou 4D**, o processo é o mesmo. Porém, com a adição do eixo z ou w:

$$
\eqalign{
|\vec{V}| &= \sqrt[2]{x^2 + y^2 + z^2} \\
   &= \sqrt{3^2 + 2^2 + 1^2} \\
   &= \sqrt{14} \\
   &\approx 3.75
}
$$

>"Mas e os **vetores 1D**?", você se pergunta. Bom, eles já possuem a própria medida escalar, com a diferença de que se contabiliza a sua distância ao número zero. Deste modo, nunca serão negativos.
>
>De exemplo, peguemos um vetor *1D* de medida *(**-10**)*. Ele terá o valor **10** como magnitude.

# Operações Básicas

## Inverso

{% include vectorjs.html path="vector-invert-interactive" %}

## Básica

### Adição & Subtração
A soma entre vetores é usada para alterar as propriedades dos vetores, criando um vetor resultante.
Em suma, adiciona-se em cada propriedade (x, y, z, w) as outras propriedades correspondentes dos vetores a serem acumulados.

Grafia:
$$ \vec{V} = \begin{bmatrix} x1 \pm x2 \pm xn \cr y1 \pm y2 \pm yn \cr z1 \pm z2 \pm zn \end{bmatrix} $$

Para subtrair, devemos inverter o segundo vetor e, após tal operação, adiciona-se ao primeiro.

Exemplo:

{% include vectorjs.html path="vector-basic-interactive" %}

---

[//]: (Externals)

[^footnote]: NERCURY. <b>Practical use of Vector Math in Games</b>. 2013. Disponível em: <a href="https://www.gamedev.net/tutorials/programming/math-and-physics/practical-use-of-vector-math-in-games-r2968">https://www.gamedev.net/tutorials/programming/math-and-physics/practical-use-of-vector-math-in-games-r2968/</a>. Acesso em: 04 jan. 2021.
[Triângulo Retângulo]: https://pt.wikipedia.org/wiki/Tri%C3%A2ngulo_ret%C3%A2ngulo
[Teorema de Pitágoras]: https://pt.wikipedia.org/wiki/Teorema_de_Pit%C3%A1goras