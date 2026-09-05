---
title: "FLoomChecker: Repelling Free-riders in Federated Learning via Training Integrity Verification"
authors: [Guanghao Liang, Shan Chang, Minghui Dai and Hongzi Zhu]
venue: "in Proceedings of IEEE ICPADS 2024"
location: "Belgrade, Serbia"
year: 2024
track: Conference
topic: "Federated Learning"
tags: ["Federated Learning", "Free-rider attack", "TEE", "Bloom filter", "Training integrity verification"]
imageUrl: ICPADS2024-liangguanghao.png
imageCaption: "Fig. 2: Commitment Verification."
pdfUrl: ICPADS2024-liangguanghao.pdf
award: ""
doi: "10.1109/ICPADS63350.2024.00034"
---

Federated learning is a mechanism that allows participating clients to train locally with their own data in order to receive rewards, thus avoiding the transfer of data to a central server and protecting users' privacy. However, some "lazy" clients may adopt the strategy of fabricating false model local updates in an attempt to "free-riding" without actually contributing real data or consuming local computational resources. To address this issue, we propose FLoomChecker, an integrity detection scheme for federated learning training models. The scheme combines the techniques of trusted execution environments and Bloom filters to efficiently identify clients that do not train honestly by committing and proving. We conducted experimental evaluations of FLoomChecker, examining three main aspects: query time, build time, and memory footprint in trusted execution environment (TEE). The experimental results demonstrate the effectiveness of our scheme, and its performance improves as the number of local training rounds increases.
