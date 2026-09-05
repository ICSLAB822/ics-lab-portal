---
title: "Sieve: Lightweight Robust Regression on Private Sensory Data"
authors: [Shan Chang, Hang Chen, Chao Li, Hongzi Zhu and Ting Lu]
venue: "in Proceedings of IEEE WCNC 2019"
location: "Marrakech, Morocco"
year: 2019
track: Conference
topic: "Mobile Crowd Sensing"
tags: ["private sensory data", "robust regression", "adaptive model updating", "outlier"]
imageUrl: WCNC2019-changshan.png
imageCaption: "Fig. 1. Illustration of Sieve used in mobile crowd sensing applications."
pdfUrl: WCNC2019=changshan.pdf
award: ""
doi: "10.1109/WCNC.2019.8885651"
---

Mobile crowd sensing (MCS) data have unique features, i.e., private, error-prone, non-stationary and opportunistically generated, and collected by resource-constrained mobile devices, which bring the regression task new challenges. First, it is of great difficulty to derive an accurate model without acquiring raw data. Second, adaptive model updating mechanism is urgently needed. Last, regression schemes should be lightweight. In this paper, we propose a blind regression scheme, called Sieve, in MCS settings. The core idea is first to let the server help in coordinating the selection of a small 'clean' subset of observations locally stored over all volunteers. Based on the 'clean' subset, an initial model can be established among volunteers in a distributed fashion. With observations constantly coming, instead of model re-estimating from the scratch, newly selected 'clean' observations are used to update the established model. Sieve preserves data privacy by only exchanging aggregated information. With the incremental model updating strategy, it also minimizes the communication and computation overhead of mobile devices. Extensive trace-driven simulations are conducted and the results demonstrate the efficacy of the Sieve design.
