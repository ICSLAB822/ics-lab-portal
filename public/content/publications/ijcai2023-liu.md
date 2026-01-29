---
title: "APR: Online Distant Point Cloud Registration through Aggregated Point Cloud Reconstruction"
authors: [Quan Liu, Yunsong Zhou, Hongzi Zhu, Shan Chang and Minyi Guo]
venue: in Proceedings of IJCAI 2023
year: 2023
track: Conference
topic: "Mobile Sensing"
tags: []
imageUrl: ijcai2023-liu.png
imageCaption: "Figure 2: The training and inference pipelines of APR. The offline training pipeline consists of three components, i.e., APG, KFE and NPR. APG generates the current aggregated point cloud (APC) based on nearby non-key frames of a vehicle in a non-trainable manner. KFE and NPR constitute an autoencoder, where the encoder extracts per-point features and the decoder takes such features to reconstruct the current APC. The Chamfer Distance between these two point clouds is used as a complementary loss against the metric learning loss to train the extractor (i.e., FCGF and Predator). During the online inference, only the current key frames of a pair of vehicles are exchanged and used to perform feature-based registration with the encoder at each vehicle."
pdfUrl: ijcai2023-liu.pdf
codeUrl: https://github.com/liuQuan98/APR
---

For many driving safety applications, it is of great importance to accurately register LiDAR point clouds generated on distant moving vehicles. However, such point clouds have extremely different point density and sensor perspective on the same object, making registration on such point clouds very hard. In this paper, we propose a novel feature extraction framework, called APR, for online distant point cloud registration. Specifically, APR leverages an autoencoder design, where the autoencoder reconstructs a denser aggregated point cloud with several frames instead of the original single input point cloud. Our design forces the encoder to extract features with rich local geometry information based on one single input point cloud. Such features are then used for online distant point cloud registration. We conduct extensive experiments against state-of-the-art (SOTA) feature extractors on KITTI and nuScenes datasets. Results show that APR outperforms all other extractors by a large margin, increasing average registration recall of SOTA extractors by 7.1% on LoKITTI and 4.6% on LoNuScenes.
