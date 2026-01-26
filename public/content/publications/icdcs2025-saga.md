---
title: "SAGA: Service-Level SLO-Aware GPU Scheduling and Memory Management in Serverless Computing"
authors: [Yunzhe Li, Facheng Hu, Hongzi Zhu, Shifan Zhang, Liang Zhang, Shan Chang, Minyi Guo]
venue: in Proceedings of IEEE ICDCS 2025
year: 2025
location: "Glasgow, UK"
track: Conference
topic: Distributed Systems
tags: [IMU data, Pre-training, IMU semantics]
imageUrl: icdcs2025-saga.png
imageCaption: "Fig. 2. Overview of Saga, where original IMU samples are masked at four levels and pre-trained with weighted loss. The weights of the losses are optimized by Bayesian Optimization."
pdfUrl: icdcs2025-saga.pdf
---

Serverless computing has become a popular paradigm for deploying various applications due to its high scalability and pay-as-you-go model. Recently, there has been a growing demand for deploying GPU-accelerated applications, such as AI model inference and video processing, on serverless platforms. However, current serverless platforms often fail to provide efficient GPU support, especially in ensuring Service Level Objectives (SLOs) for diverse applications. Specifically, existing GPU scheduling mechanisms either lack fine-grained resource isolation or suffer from significant performance interference, leading to SLO violations. Furthermore, the limited GPU memory often becomes a bottleneck when multiple serverless functions share the same GPU, causing frequent memory swaps and performance degradation. To address these challenges, we propose SAGA, a service-level SLO-aware GPU scheduling and memory management framework for serverless computing. SAGA aims to minimize SLO violations while maximizing GPU utilization. Specifically, SAGA introduces a two-tier scheduling mechanism: a global scheduler that performs SLO-aware function placement and a local scheduler that manages fine-grained GPU resource allocation. Furthermore, SAGA incorporates a proactive GPU memory management scheme that minimizes memory swap overhead by predicting memory demands and prefetching data. We implement SAGA on top of Kubernetes and evaluate its performance using various GPU-accelerated workloads. Experimental results show that SAGA can reduce SLO violations by up to 65% and improve GPU utilization by up to 42% compared to state-of-the-art GPU scheduling and memory management approaches.
