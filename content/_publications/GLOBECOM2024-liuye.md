---
title: "M-Door: Joint Attack of Backdoor Injection and Membership Inference in Federated Learning"
authors: [Ye Liu, Shan Chang, Denghui Li and Minghui Dai]
venue: "in Proceedings of IEEE GLOBECOM 2024"
location: "Cape Town, South Africa"
year: 2024
track: Conference
topic: "Federated Learning"
tags: ["Federated learning", "backdoor attacks", "membership inference attacks"]
imageUrl: GLOBECOM2024-liuye.png
imageCaption: "Fig. 1. The Framework of M-Door."
pdfUrl: GLOBECOM2024-liuye.pdf
award: ""
doi: "10.1109/GLOBECOM52923.2024.10901593"
---

Federated learning (FL) collaboratively trains global models while preserving private data locally, making it an ideal privacy-preserving learning technique. However, recent studies have shown that FL poses risks of security attacks and privacy leaks during model parameter transfer. Existing research suggests that backdoor attacks cannot assist with membership inference attacks in machine learning. This paper proposes a joint attack of backdoor injection and membership inference in FL, M-Door, which can connect two independent work lines to ensure the security and privacy of FL. In M-Door, an attacker hidden within the client can not only perform backdoor attacks on the global model, but also perform membership inference attacks on the global model by analyzing the transmitted model parameters. This attack method can improve the success rate of backdoor attacks, and simultaneously increase the success rate of membership inference attacks. We conduct extensive experiments on three image classification tasks to evaluate the effectiveness of M-Door. Compared with the other two attack methods, the experimental results show that M-Door exhibits significant advantages in backdoor and membership inference attacks under both IID and Non-IID data settings.
