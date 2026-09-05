---
title: "Density-invariant Features for Distant Point Cloud Registration"
authors: [Quan Liu, Hongzi Zhu, Yunsong Zhou, Hongyang Li, Shan Chang and Minyi Guo]
venue: in Proceedings of ICCV 2023
location: "Paris, France"
year: 2023
pages: "18215-18225"
track: Conference
tags: []
imageUrl: iccv2023-liu.png
imageCaption: "Figure 1: Motivation. (a) A schematic diagram of the density d of point clouds produced by two LiDARs La and Lb. Their densities diverge when two LiDARs drift from short-range to long-range scenario. (b) State-of-the-art method Predator [20] fails to register distant point clouds (middle) while our method succeeds (bottom). (c) Traditional Pair-wise Contrastive Learning takes a pair of positive samples (marked with the gray plane) from two point clouds, and pull positive features together, which suffer from negative density correlation given a fixed pair of distant point clouds. (d) Our Group-wise Contrastive Learning takes multiple positive samples (marked with the gray plane) from a point cloud series, and contract the feature distance between all positive examples."
pdfUrl: iccv2023-liu.pdf
---

Registration of distant outdoor LiDAR point clouds is crucial to extending the 3D vision of collaborative autonomous vehicles, and yet is challenging due to small overlapping area and a huge disparity between observed point densities. In this paper, we propose Group-wise Contrastive Learning (GCL) scheme to extract density-invariant geometric features to register distant outdoor LiDAR point clouds. We mark through theoretical analysis and experiments that, contrastive positives should be independent and identically distributed (i.i.d.), in order to train density-invariant feature extractors. We propose upon the conclusion a simple yet effective training scheme to force the feature of multiple point clouds in the same spatial location (referred to as positive groups) to be similar, which naturally avoids the sampling bias introduced by a pair of point clouds to conform with the i.i.d. principle. The resulting fully-convolutional feature extractor is more powerful and density-invariant than state-of-the-art methods, improving the registration recall of distant scenarios on KITTI and nuScenes benchmarks by 40.9% and 26.9%, respectively.
