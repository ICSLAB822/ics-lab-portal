---
title: "Bad-Tuning: Backdooring Vision Transformer Parameter-Efficient Fine-Tuning"
authors: [Denghui Li, Shan Chang, Hongzi Zhu, Jie Xu and Minghui Dai]
venue: "in Proceedings of IEEE GLOBECOM 2024"
location: "Cape Town, South Africa"
year: 2024
track: Conference
topic: "AI Security"
tags: ["Backdoor Attack", "Vision Transformer", "PEFT"]
imageUrl: GLOBECOM2024-lidenghui.png
imageCaption: "Fig. 2: Overview of Bad-Tuning."
pdfUrl: GLOBECOM2024-lidenghui.pdf
award: ""
doi: "10.1109/GLOBECOM52923.2024.10901530"
---

Parameter-efficient fine-tuning (PEFT) on pre-trained models is a new paradigm for model training, where the majority parameters of a pre-trained model are frozen, left only a small number of unfrozen (or additional) parameters to be tuned. PEFT demonstrates its effectiveness in fitting the downstream tasks, while introducing a new surface for backdoor attacks. In this paper, we design a novel backdoor attack towards the Vision Transformer (ViT) PEFT, called Bad-Tuning. To mislead the target pre-trained model, Bad-Tuning first purposefully tailors the trigger for the frozen portion of the model, and then backdoors the unfrozen part by injecting the trigger into fine-tuning samples of PEFT. The main challenges are two-fold. First, backdooring PEFT should be highly efficient with a few backdoored samples. Second, the trigger should be hardly noticed by human beings as well as backdoor scanners. To deal with the challenges, Bad-Tuning optimizes the trigger by learning CLS sequences which represent rich deep semantics of samples, and introduces color loss to evaluate the invisibility of triggers. Extensive experiments on different datasets demonstrate the effectiveness, efficiency and invisibility of Bad-Tuning under both white-box and gray-box scenarios. Bad-Tuning achieves an average attack success rate (ASR) of over 99.9% even only 0.1% backdoored samples are injected. Moreover, Bad-Tuning outperforms the SOTA backdoor attacks on both ASR and invisibility (SSIM).
