---
title: "DeepAoA+: Online Cross-Domain Vehicular Relative Direction Estimation via Deep Learning"
authors: [Facheng Hu, Yunxiang Cai, Hongzi Zhu, Shan Chang, Xudong Wang, Minyi Guo]
venue: IEEE TRANSACTIONS ON VEHICULAR TECHNOLOGY (TVT)
year: 2024
volume: "73"
issue: "12"
pages: "19216-19228"
track: Journal
topic: "Mobile Sensing"
tags: [AoA, CSI, vehicular network, cross-domain, deep learning]
imageUrl: tvt2024-hufacheng.png
imageCaption: "Fig. 1. The transmitter vehicle with an Arada LocoMate OBU and a LiDAR and the receiver vehicle with four synchronized USRPs and an antenna array. (a) Tx vehicle. (b) Rx vehicle."
pdfUrl: tvt2024-hufacheng.pdf
---

Relative direction estimation among neighboring vehicles in urban environments is essential to a wide variety of driving safety applications. To obtain accurate direction information solely from vehicle-to-vehicle (V2V) communications is desirable but very challenging due to enormous multipath effects. In this paper, we propose an online cross-domain vehicular relative direction estimation method, called DeepAoA+, based on a domain adaptive deep learning method. More specifically, the channel state information (CSI) is estimated from a set of synchronized receiving radios at a receiver vehicle. By taking the CSI phase difference between a pair of such radios, CSI phase errors in the baseband can be effectively eliminated, which makes a compelling feature to represent the direction of incident radio frequency (RF) signals and the dynamic channel characteristics. Moreover, to conquer the non-i.i.d (independent and identically distributed) problem caused by dynamic environments, DeepAoA+ discovers latent domains in the CSI phase difference dataset. For each identified domain, a domain-specific model is trained to estimate the Angle-of-Arrival (AoA) of incoming signals. To this end, a framework based on an expectation-maximization (EM) algorithm is proposed to obtain domain partitions considering downstream AoA estimation tasks. Furthermore, a pre-training technique is used to enhance the robustness of AoA estimation with misclassified test samples. We implement a prototype of DeepAoA+, using four synchronized Universal Software Radio Peripherals (USRPs) from various scenarios, and conduct extensive real-world experiments. The results demonstrate that DeepAoA+ can achieve the best AoA estimation with low latency.