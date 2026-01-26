---
title: "Prism: Mining Task-aware Domains in Non-i.i.d. IMU Data for Flexible User Perception"
authors: [Yunzhe Li, Facheng Hu, Hongzi Zhu, Quan Liu, Xiaoke Zhao, Jiangang Shen, Shan Chang, Minyi Guo]
venue: in Proceedings of IEEE INFOCOM 2025
year: 2025
location: "London, UK"
track: Conference
topic: Mobile Sensing
tags: [IMU, model inference, non-i.i.d., reliability]
imageUrl: infocom2025-prism.png
imageCaption: "Fig. 2. System architecture of Prism, where the IMU datasets are first detected whether they are non-i.i.d. and the non-i.i.d. IMU datasets is then partitioned for model training."
pdfUrl: infocom2025-prism.pdf
---

A wide range of user perception applications leverage inertial measurement unit (IMU) data for online prediction. However, restricted by the non-i.i.d. nature of IMU data collected from mobile devices, most systems work well only in a controlled setting (e.g., for a specific user in particular postures), limiting application scenarios. To achieve uncontrolled online prediction on mobile devices, referred to as the flexible user perception (FUP) problem, is attractive but hard. In this paper, we propose a novel scheme, called Prism, which can obtain high FUP accuracy on mobile devices. The core of Prism is to discover task-aware domains embedded in IMU dataset, and to train a domain-aware model on each identified domain. To this end, we design an expectation-maximization (EM) algorithm to estimate latent domains with respect to the specific downstream perception task. Finally, the best-fit model can be automatically selected for use by comparing the test sample and all identified domains in the feature space. We implement Prism on various mobile devices and conduct extensive experiments. Results demonstrate that Prism can achieve the best FUP performance with a low latency.
