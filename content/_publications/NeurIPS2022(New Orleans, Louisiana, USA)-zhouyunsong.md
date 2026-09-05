---
title: "MoGDE: Boosting Mobile Monocular 3D Object Detection with Ground Depth Estimation"
authors: [Yunsong Zhou, Quan Liu, Hongzi Zhu, Yunzhe Li, Shan Chang and Minyi Guo]
venue: in Proceedings of NeurIPS 2022
year: 2022
track: Conference
topic: "Mobile Sensing"
location: "New Orleans, Louisiana, USA"
tags: ["Mobile Sensing"]
award: "Spotlight"
imageUrl: NeurIPS2022(New Orleans, Louisiana, USA)-zhouyunsong.png
imageCaption: "Figure 2: MoGDE consists of three main components, i.e., ground depth estimation (GDE), ground depth fusion (GDF) and monocular 3D detection (M3D). In GDE, the pose network predicts the ground plane as well as the vanishing point. The derived pose information is then used to construct a virtual scene and obtain a pose-speciﬁc ground depth feature map. In GDF, a transformer network is leveraged to fuse the image features with the ground depth feature map, resulting a ground-aware fused feature map. M3D employs a standard Mono3D detector as the underlying detection core."
pdfUrl: NeurIPS2022(New Orleans, Louisiana, USA)-zhouyunsong.pdf
---

Monocular 3D object detection (Mono3D) in mobile settings (e.g., on a vehicle, a drone, or a robot) is an important yet challenging task. Due to the near-far disparity phenomenon of monocular vision and the ever-changing camera pose, it is hard to acquire high detection accuracy, especially for far objects. Inspired by the insight that the depth of an object can be well determined according to the depth of the ground where it stands, in this paper, we propose a novel Mono3D framework, called MoGDE, which constantly estimates the corresponding ground depth of an image and then utilizes the estimated ground depth information to guide Mono3D. To this end, we utilize a pose detection network to estimate the pose of the camera and then construct a feature map portraying pixel-level ground depth according to the 3D-to-2D perspective geometry. Moreover, to improve Mono3D with the estimated ground depth, we design an RGB-D feature fusion network based on the transformer structure, where the long-range self-attention mechanism is utilized to effectively identify ground-contacting points and pin the corresponding ground depth to the image feature map. We conduct extensive experiments on the real-world KITTI dataset. The results demonstrate that MoGDE can effectively improve the Mono3D accuracy and robustness for both near and far objects. MoGDE yields the best performance compared with the state-of-the-art methods by a large margin and is ranked number one on the KITTI 3D benchmark.
