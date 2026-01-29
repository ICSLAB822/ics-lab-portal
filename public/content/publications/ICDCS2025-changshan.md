---
title: "PRISAM: Efficient Personalization via BN Masks in Heterogeneous Decentralized Federated Learning"
authors: [Shan Chang, Xianbo Wang, Hao Yu, Denghui Li, Guanghao Liang, Hongzi Zhu and Bo Li]
venue: "in Proceedings of IEEE ICDCS 2025"
location: "Glasgow, UK"
year: 2025
track: Conference
topic: "Federated Learning"
tags: ["decentralized federated learning", "BN mask", "structural pruning", "personalization", "heterogeneity"]
imageUrl: ICDCS2025-changshan.png
imageCaption: "Fig. 2: an example of BN-based pruning and binary BN mask constructing."
pdfUrl: ICDCS2025-changshan.pdf
award: ""
doi: "10.1109/ICDCS63083.2025.00083"
---

Decentralized Federated Learning (DFL) removes the central server in traditional Centralized FL, eliminating performance and security bottlenecks while improving scalability for large-scale cross-device federated scenarios. In these scenarios, devices are heterogeneous in computation, storage, and data distribution, requiring personalized models. A common strategy for personalized DFL is for each device to collaborate with others having similar data distributions to train a federated model and then perform local pruning. However, in the absence of a central server, along with privacy concerns and the limited inference capabilities of low-end devices, challenges emerge in terms of communication, computation, and model convergence. This paper presents an efficient personalized DFL method, named PRISAM, based on BN (Batch Normalization) masks. Each device adaptively adjusts its BN mask, enabling effective structured pruning with minimal performance loss. By exchanging BN masks, communication overhead for similarity comparison is reduced by a factor of 100,000, comparing to exchanging an entire model, while computational costs are also significantly lowered. Extensive experiments show that PRISAM significantly improves personalized model performance on three datasets across two models, outperforming state-of-the-art methods, while greatly reducing computational and communication overhead.
