---
title: "Cepe-FL: Communication-Efficient and Privacy-Enhanced Federated Learning Via Adaptive Compressive Sensing"
authors: [Ye Liu, Shan Chang and Yiqi Liu]
venue: "IEEE Transactions on Big Data (TBD), 11(5), pp. 2119-2134, 2024."
year: 2024
track: Journal
topic: "Federated Learning"
tags: ["Communication-efficient", "compressive sensing", "dictionary learning", "federated learning", "membership inference attacks"]
imageUrl: TBD2024-liuye.png
imageCaption: "Fig. 2. The procedure performed by the server and workers to update the global model."
pdfUrl: TBD2024-liuye.pdf
award: ""
doi: "10.1109/TBDATA.2024.3403393"
---

Model updates are exchanged between server(s) and participants in Federated Learning (FL), which can result in excessive delay, especially for large models. Existing communication-efficient FL approaches such as quantization and top-k sampling apply compression to gradients assuming that gradients are sparse and can tolerate small deviations. This can hardly be applied to down-link transmission. In this work, we employ compressive sensing on model parameters instead of gradients and propose a two-way adaptive compression scheme, Cepe-FL, which exploits dictionary learning to project non-sparse model parameters into sparse representations to ensure reconstruction accuracy. Cepe-FL supports joint model reconstruction with drastic reduction in computational complexity from O(n) to O(1). Cepe-FL adjusts the compression ratio adaptively according to the training loss, achieving the best trade-off between communication and model precision. Furthermore, it demonstrates efficacy in defending against membership inference attacks since only compressed models are exchanged. We conduct extensive experiments on three image classification tasks and compare with three communication-efficient approaches including FedPAQ, FedAvg and T-FedAvg. Cepe-FL presents the best performance in all tasks under IID and non-IID scenarios. We also implement white-box membership inference attacks, and the results show Cepe-FL can significantly suppress success ratio of inference in comparison with other approaches.
