---
title: "Fed-CAD: Federated Learning with Correlation-aware Adaptive Local Differential Privacy"
authors: [Bingzhu Zhu, Shan Chang, Guanghao Liang, Hongzi Zhu and Jie Xu]
venue: "in Proceedings of IEEE/ACM IWQoS 2024"
location: "Guangzhou, China"
year: 2024
track: Conference
topic: "Federated Learning"
tags: ["federated learning", "adaptive local differential privacy", "Gaussian mechanism", "correlation-aware"]
imageUrl: IWQOS2024-zhubinzhu.png
imageCaption: "Fig. 1: The average and range of L_2 norm vs. iteration."
pdfUrl: IWQOS2024-zhubinzhu.pdf
award: "Best Student Paper Award"
doi: "10.1109/IWQoS61813.2024.10682944"
---

Federated Learning (FL) enables multiple participants to collaboratively train a globally shared model without the need of explicit data sharing. However, prior research indicates that local model updates released during the federated training may also jeopardize privacy of participants. To address this issue, local differential privacy (LDP) mechanism has been applied to FL systems. LDP provides privacy protection with rigorous mathematical proof by introducing random perturbations, e.g., Gaussian noise, to the released updates, however excessive noise compromises the utility of the updates. In this paper, we propose a novel Correlation-aware Adaptive LDP mechanism, Fed-CAD, for FL, which reduces the required scale of noise by leveraging the temporal correlation between consecutive local model updates belonging to the same participant, without increasing the privacy budgets (risks). We theoretically prove that Fed-CAD satisfies (ε, δ)-LDP as long as the difference between local models is smaller than the differential bound, and analyze the noise variance, a metric of utility. We implement Fed-CAD on image classification FL tasks. Experimental results demonstrate that Fed-CAD significantly outperforms the one-shot LDP baseline.
