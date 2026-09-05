---
title: "TempNet: Online Semantic Segmentation on Large-scale Point Cloud Series"
authors: [Yunsong Zhou, Hongzi Zhu, Chunqin Li, Tiankai Cui, Shan Chang and Minyi Guo]
venue: in Proceedings of IEEE/CVF ICCV 2021
year: 2021
track: Conference
topic: "Mobile Sensing"
location: "Virtual Conference"
tags: []
imageUrl: ICCV2021(Virtual Conference)-zhouyunsong.png
imageCaption: "Figure 1. Segmentation examples of using SequeezeSegV2, a SOTA single-frame segmentation method, on two sequences of three consecutive point cloud frames. It can be seen that applying such schemes to point cloud series leads to unstable and inaccurate results, e.g., errors denoted by circles suddenly appear."
pdfUrl: ICCV2021(Virtual Conference)-zhouyunsong.pdf
---

Online semantic segmentation on a time series of point cloud frames is an essential task in autonomous driving. Existing models focus on single-frame segmentation, which cannot achieve satisfactory segmentation accuracy and offer unstable flicker among frames. In this paper, we propose a light-weight semantic segmentation framework for large-scale point cloud series, called TempNet, which can improve both the accuracy and the stability of existing semantic segmentation models by combining a novel frame aggregation scheme. To be computational cost-efficient, feature extraction and aggregation are only conducted on a small portion of key frames via a temporal feature aggregation (TFA) network using an attentional pooling mechanism, and such enhanced features are propagated to the intermediate non-key frames. To avoid information loss from non-key frames, a partial feature update (PFU) network is designed to partially update the propagated features with the local features extracted on a non-key frame if a large disparity between the two is quickly assessed. As a result, consistent and information-rich features can be obtained for each frame. We implement TempNet on five state-of-the-art (SOTA) point cloud segmentation models and conduct extensive experiments on the SemanticKITTI dataset. Results demonstrate that TempNet outperforms SOTA competitors by wide margins with little extra computational cost.
