---
title: A Diretiva Struc no NASM
date: 2025-08-15T12:13:55Z
lang: pt
duration: 3min
type: note
---

[[toc]]

Recentemente, eu comecei a estudar [NASM] através desta [série de tutoriais] — e tantos outros... assim, como quem não quer nada.
Entretanto, acabei por me interessar de maneira profunda e sistemática.

Eventualmente, me deparei com uma necessidade organizacional semelhante às estruturas em C, os <code>[structs]</code>. Em minhas pesquisas em documentações e outros repositórios, encontrei o uso da diretiva `struc`.

## Definição

Assim como em qualquer outro lugar, devemos explicitar os seus campos para usos posteriores:

```asm
; Definição de estrutura
struc EstruturaExemplo
    .campo1 resd 1  ; reserva 4 bytes - 32 bits
    .campo2 resw 1  ; reserva 2 bytes - 16 bits
    .campo3 resb 1  ; reserva 1 byte  - 8 bits
endstruc
```

> [!NOTE]
> Nota-se que `struc` é usado sem a letra 't'.

Como leitor astuto, você já identificou que cada campo possui o rótulo prefixado com um ponto, seguido pelo tamanho em bytes.

Os tamanhos são especificados usando as diretivas de reserva de dados do NASM: `resb`, `resw`, `resd` e `resq`.

| Diretiva | Nome                       | Tamanho por unidade | Exemplo de uso     |
| -------: | -------------------------- | ------------------: | ------------------ |
|   `resb` | **res**erve **b**yte       |              1 byte | `resb 1` → 1 byte  |
|   `resw` | **res**erve **w**ord       |             2 bytes | `resw 1` → 2 bytes |
|   `resd` | **res**erve **d**oubleword |             4 bytes | `resd 1` → 4 bytes |
|   `resq` | **res**erve **q**uadword   |             8 bytes | `resq 1` → 8 bytes |

> [!TIP]
> Você pode reservar múltiplas unidades. Por exemplo, `resb 4` reserva 4 bytes no total.
>
> Em geral, o total reservado é igual a **diretiva × número** (por exemplo, `resw 3` reserva $3 \times 2 = 6$ bytes).

## Instanciando

Depois de definir a estrutura, precisamos criar instâncias usando as diretivas `istruc` e `iend` na `section .data`:

```asm
labels                   instruction   operands
---------------------------------------------------------------
                         section       .data

player_transform:        istruc        Transform
                         at            .x, dd  1.0
                         at            .y, dd  2.0
                         at            .z, dd  3.0
                         iend
```

Neste exemplo simplório, estamos criando uma instância de `Transform` e atribuindo o rótulo `player_transform`.

> [!Note]
> A diretiva `at` serve para especificar qual campo da estrutura está sendo inicializado.

## Acessando os campos

Acessar ou modificar os campos é bem tranquilo. Basta usar o nome/rótulo da estrutura e o deslocamento do campo:

```asm
label                    instruction     operand
---------------------------------------------------------------
                         section         .text
                         global          _start

_start:                  ; Carregar valor de X do player_transform em EAX
                         mov             eax, [player_transform + Transform.x]

                         ; Carregar valor de Y em EBX
                         mov             ebx, [player_transform + Transform.y]

                         ; Alterar valor de Z para 10.0
                         mov             dword [player_transform + Transform.z], __float32__(10.0)

                         ; ...
```

[//]: # 'Links'
[NASM]: https://www.nasm.us
[série de tutoriais]: https://www.youtube.com/watch?v=yBO-EJoVDo0&list=PL2EF13wm-hWCoj6tUBGUmrkJmH1972dBB&pp=0gcJCWUEOCosWNin
[structs]: https://www.inf.pucrs.br/~pinho/LaproI/Structs/Structs.htm
[//]: # 'EOF'
