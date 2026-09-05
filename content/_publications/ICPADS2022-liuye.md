---
title: "FedCS: Communication-Efficient Federated Learning with Compressive Sensing"
authors: [Ye Liu, Shan Chang and Yiqi Liu]
venue: "in Proceedings of IEEE ICPADS 2022"
location: "Nanjing, China"
year: 2022
track: Conference
topic: "Federated Learning"
tags: ["federated learning", "communication-efficient", "compressive sensing", "dictionary learning"]
imageUrl: ICPADS2022-liuye.png
imageCaption: "Fig. 1: The procedures performed by the server and workers to update the global model."
pdfUrl: ICPADS2022-liuye.pdf
award: ""
doi: "10.1109/ICPADS56603.2022.00011"
---

In Federated Learning (FL), two-way model exchanges are required between the server and the workers every training round. Due to the large size of machine learning models, communications between them lead to high training delay and economic cost. At present, communication-efficient FL methods, for examples, top-k sparsification and quantization, taking advantages of the sparseness of model gradients and the fact that gradient-based model updating can tolerance small deviations, effectively reduce the communication cost of single training round. However, these gradient-based communication-efficient schemes cannot be applied to downlink communication. In addition, they cannot be used in conjunction with those communication-frequency-suppressed methods, e.g., FedAvg, which hinders them from further improving training efficiency. In this paper, we propose FedCS, a compressive sensing based FL method, which can effectively compress and accurately reconstruct non-sparse model (both local and global) parameters (weights), and can reduce the overall communication cost up to 10× as compared to FedAvg without decreasing test accuracy. We introduce 1) a dictionary learning scheme with a quasi-validation set, which helps to project non-sparse parameters onto a sparse domain; 2) a joint reconstruction scheme, by using which the server recovers global model parameters by executing the reconstruction algorithm only once a round, regardless of the number of compressed local models; 3) a compression ratio adjustment strategy, which balances the trade-off between total communication cost and model accuracy. We perform FedCS on three image classification tasks, and compare it with FedAvg, FedPAQ and T-FedAvg (two improvements of FedAvg). Experimental results demonstrate that FedCS outperforms comparison methods in all tasks, and always maintains a comparable test accuracy to FedAvg, even using a small quasi-validation set and on Non-IId data.
