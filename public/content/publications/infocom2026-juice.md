---
title: "Juice: Lightweight Foreground Prediction For On-Camera Surveillance Video Compression"
authors: [Jiajun Yan, Hongzi Zhu, Shan Chang, Li Li, Minyi Guo]
venue: in Proceedings of IEEE INFOCOM 2026
year: 2026
location: Tokyo, Japan
track: Conference
topic: Mobile Sensing
tags: [Video Compression, Edge Computing, Surveillance]
imageUrl: infocom2026-juice.png
imageCaption: "Fig. 2: The architecture of Juice, where foreground regions can be predicted based on CU division information and used to differentially compress the video on cameras."
# 如果你有本地文件，上传后改为文件名，例如: juice.pdf
pdfUrl: infocom2026-juice.pdf
codeUrl: #
---

Video surveillance plays a crucial role in modern society, fostering safer, smarter, and more efficient environments. However, it is of great challenge to transmit, store and analyze city-scale surveillance videos due to the massive amounts of data. In this work, we propose Juice, a lightweight surveillance video compression scheme that can be implemented on H.265- compliant cameras. The core idea of Juice is to effectively utilize the CU (Coding Unit) division information generated during the encoding process to predict tiles with foreground objects in each frame. Furthermore, redundant background tiles between frames are removed to minimize the compressed video size without compromising the downstream surveillance detection accuracy. We collect a real-world transportation traffic surveillance video datasets, consisting of 541 video clips recorded at 42 distinct locations in different light and weather conditions. We implement Juice and conduct extensive trace-driven simulations. The results demonstrate that Juice is lightweight and can process at least 32 FPS at a resolution of 1920×1080 on a single-core common CPU and can achieve an average 78.2% compression rate. Furthermore, Juice has little impact on downstream AI detection algorithms. Specifically, the object detection on compressed videos undergoes a minor 1% accuracy drop, compared to detection on uncompressed videos.