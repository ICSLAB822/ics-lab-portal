---
title: "Exploiting Ground Depth Estimation for Mobile Monocular 3D Object Detection"
authors: [Yunsong Zhou, Quan Liu, Hongzi Zhu, Yunzhe Li, Shan Chang, Minyi Guo]
venue: IEEE TRANSACTIONS ON PATTERN ANALYSIS AND MACHINE INTELLIGENCE (TPAMI)
year: 2025
volume: "47"
issue: "4"
pages: "3079-3093"
track: Journal
topic: 3D Vision
tags: [Monocular 3D object detection, ground depth estimation, vision transformer, autonomous driving]
imageUrl: tpami2025-yunsong.png
imageCaption: "Fig. 4. MoGDE consists of three main components, i.e., ground depth estimation (GDE), ground depth fusion (GDF) and monocular 3D detection (M3D). In GDE, the pose network predicts the ground plane as well as the vanishing point."
pdfUrl: tpami2025-yunsong.pdf
---

Detecting 3D objects from a monocular camera in mobile applications, such as on a vehicle, drone, or robot, is a crucial but challenging task. The monocular vision’s near-far disparity and the camera’s constantly changing position make it difficult to achieve high accuracy, especially for distant objects. In this paper, we propose a new Mono3D framework named MoGDE, which takes inspiration from the observation that an object’s depth can be inferred from the ground’s depth underneath it. MoGDE estimates the corresponding ground depth of an image and utilizes this information to guide Mono3D. We use a pose detection network to estimate the camera’s orientation and construct a feature map that represents pixel-level ground depth based on the 3D-to-2D perspective geometry. To further improve Mono3D with the estimated ground depth, we design an RGB-D feature fusion network based on transformer architecture. The long-range self-attention mechanism is utilized to identify ground-contacting points and pin the corresponding ground depth to the image feature map. We evaluate MoGDE on the KITTI dataset, and the results show that it significantly improves the accuracy and robustness of Mono3D for both near and far objects. MoGDE outperforms state-of-the-art methods and ranks first among the pure image-based methods on the KITTI 3D benchmark.
