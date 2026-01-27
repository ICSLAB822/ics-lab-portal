---
title: "A Scene-Aware Model Adaptation Scheme for Cross-Scene Online Inference on Mobile Devices"
authors: [Yunzhe Li, Hongzi Zhu, Zhuohong Deng, Yunlong Cheng, Zimu Zheng, Liang Zhang, Shan Chang, Minyi Guo]
venue: IEEE TRANSACTIONS ON MOBILE COMPUTING (TMC)
year: 2025
volume: "24"
issue: "10"
pages: "11061-11075"
track: Journal
tags: [Model inference, online algorithms, mobile devices, cross-scene, out of distribution, reliability]
imageUrl: tmc2025-liyunzhe.png
imageCaption: "Fig. 4. System architecture of Anole, which consists of the ofﬂine scene proﬁling on cloud servers and the online model inference on mobile devices. Communication between both parts is carried out ofﬂine."
pdfUrl: tmc2025-liyunzhe.pdf
---

Emerging Artificial Intelligence of Things (AIoT) applications desire online prediction using deep neural network (DNN) models on mobile devices. However, due to the movement of devices, unfamiliar test samples constantly appear, significantly affecting the prediction accuracy of a pre-trained DNN. In addition, unstable network connection calls for local model inference. In this paper, we propose a light-weight scheme, called Anole, to cope with the local DNN model inference on mobile devices. The core idea of Anole is to first establish an army of compact DNN models, and then adaptively select the model fitting the current test sample best for online inference. The key is to automatically identify model-friendly scenes for training scene-specific DNN models. To this end, we design a weakly-supervised scene representation learning algorithm by combining both human heuristics and feature similarity in separating scenes. Moreover, we further train a model classifier to predict the best-fit scene-specific DNN model for each test sample. We implement Anole on different types of mobile devices and conduct extensive trace-driven and real-world experiments based on unmanned aerial vehicles (UAVs). The results demonstrate that Anole outwits the method of using a versatile large DNN in terms of prediction accuracy (4.5% higher), response time (33.1% faster) and power consumption (45.1% lower).
