---
title: "FedTrojan: Corrupting Federated Learning via Zero-Knowledge Federated Trojan Attacks"
authors: [Shan Chang, Ye Liu, Zhijian Lin, Hongzi Zhu, Bingzhu Zhu and Cong Wang]
venue: "in Proceedings of IEEE/ACM IWQoS 2024"
location: "Guangzhou, China"
year: 2024
track: Conference
topic: "Federated Learning"
tags: ["federated learning", "trojan attack", "quasi-trojan", "zero-knowledge", "semantic feature"]
imageUrl: IWQoS2024-changshan.png
imageCaption: "Fig. 1. To launching FedTrojan, attacker 1 and 2 select cat and dog as their local triggers, respectively. The common target label of them is bird. In addition, spot is chosen by both attackers as the catalytic feature. In each round of model updating, each attacker uses its own dataset which is composed of normal samples (e.g., cat), trojaned samples (e.g., mixed of cat and spot), and catalytic samples, i.e., instances of spot, to train its local model. Then two local models are aggregated on the server side to obtain the global model. Meanwhile, the global trigger, i.e., cat&dog, is injected into the global model successfully."
pdfUrl: IWQoS2024-changshan.pdf
award: ""
doi: "10.1109/IWQoS61813.2024.10682906"
---

Decentralized and open features of federated learning provides opportunities for malicious participants to inject stealthy trojan functionality into deep learning models collusively. A successful trojan attack is desired to be effective, precise and imperceptible, which generally requires priori knowledge such as aggregation rules, tight cooperation between attackers, e.g. sharing data distributions, and the use of inconspicuous triggers. However, in realistic, attackers are typically lack of the knowledge and hardly to fully cooperate (for privacy and efficiency reasons), and out of scope triggers are easy to be detected by scanners. We propose FedTrojan, a zero-knowledge federated trojan attack. Each attacker independently trains a quasi-trojaned local model with a self-select trigger. The model behaves normally on both regular and trojaned inputs. When local models are aggregated on the server side, the corresponding quasi-trojans will be assembled into a complete trojan which can be activated by the global trigger. We choose existing benign features rather than artificial patches as hidden local triggers to guarantee imperceptibility, and introduce catalytic features to eliminate the impact of local trojan triggers on behaviors of local/global models. Extensive experiments show that the performance of FedTrojan is significantly better than that of existing trojan attacks under both the classic FedAvg and Byzantine-robust aggregation rules.
