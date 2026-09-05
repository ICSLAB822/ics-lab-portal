---
title: "DiVE: Differential Video Encoding for Online Edge-assisted Video Analytics on Mobile Agents"
authors: [Jiangang Shen, Hongzi Zhu, Liang Zhang, Yunzhe Li, Shan Chang, Jie Wu and Minyi Guo]
venue: in Proceedings of IEEE ICDCS 2025
year: 2025
location: "Glasgow, UK"
track: Conference
topic: Mobile Sensing
tags: [mobile agents, motion vector, video streaming, video analytics, deep learning]
imageUrl: icdcs2025-dive.png
imageCaption: "Fig. 5: Architecture of DiVE."
pdfUrl: icdcs2025-dive.pdf
---

Ensuring stable and high-quality real-time video analytics for computationally constrained mobile agents is essential. However, limited computing resources and network bandwidth present significant challenges in meeting the objective of low response time and high inference accuracy. In this paper, we present DiVE, an edge-assisted video analytics system that utilizes motion vectors calculated by video codec to extract foregrounds and differentially encode frames. DiVE removes rotational components from motion vectors by solving overdetermined linear equations and filters noisy motion vectors based on the observation that motion vectors of static objects point to the same point when the ego agent purely translates. To distinguish foregrounds from backgrounds, DiVE estimates the ground based on observations that all foregrounds stand on the ground and motion vectors on static objects at the same height have the same normalized magnitude. DiVE then uses region-growing-based clustering to identify foreground objects. An adaptive bitrate allocation method is applied to optimize accuracy under estimated bandwidth. We conduct extensive experiments to evaluate the performance of DiVE. The results demonstrate that DiVE can improve detection accuracy by up to 39.1% and reduce response time by up to 19.1% compared with other video analytics schemes on nuScenes and RobotCar datasets.
