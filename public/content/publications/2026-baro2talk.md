---
title: "Baro2Talk: Reconstructing Spectrograms from Ear Canal Pressure for Voice-free Communication"
authors: [Luo Zhou, Shan Chang, Han Wang, Xianbo Wang, Hongzi Zhu]
venue: in Proceedings of IEEE INFOCOM 2026
year: 2026
location: Tokyo, Japan
track: Conference
topic: Mobile Sensing
tags: [Mobile Sensing, Human-Computer Interaction, Silent Speech Interface]
imageUrl: illustration-baro2talk.png
pdfUrl: Baro2Talk__INFOCOM2026_final.pdf
imageCaption: "Fig. 1: Conceptual illustration of Baro2Talk."
codeUrl: #
---

The increasing demand for private and noise resilient speech interaction has motivated the development of Silent Speech Interfaces (SSIs) that infer user intent without vocalization. Existing SSI solutions face limitations such as intrusiveness, privacy leakage, environmental sensitivity, deployment complexity, and motion vulnerability. In this work, we present Baro2Talk, a wearable SSI system that reconstructs speech content from TMJ-dominated Pressure Variation Sequences (TPVSs) captured by miniature barometers embedded in standard earbuds. Baro2Talk is inspired by two key observations. First, silent articulation induces consistent ear canal deformation via temporomandibular joint (TMJ) movements, producing pressure fluctuations that reflect articulatory patterns associated with speech. Second, TPVSs exhibit repeatable temporal and articulatory structures within phrases, offering structured signals to support semantic modeling without acoustic input. We develop a lightweight in-ear pressure sensing prototype and propose a set of modules that first perform articulatory event detection and generalization enhancement, followed by a three-stage reconstruction pipeline: Semantic Encoding, Coarse Mel-spectrogram Construction, and Phonetic Enhancement. The resulting spectrograms are decoded into text using a pre-trained automatic speech recognition (ASR) model (e.g., Whisper). Baro2Talk achieves a 6.5% CER, 9.9% WER, and a 0.081 spectral convergence score, demonstrating robust performance in silent, mobile, and noisy environments.