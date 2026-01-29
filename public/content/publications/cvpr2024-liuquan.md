---
title: "Extend Your Own Correspondences: Unsupervised Distant Point Cloud Registration by Progressive Distance Extension"
authors: [Quan Liu, Hongzi Zhu, Zhenxi Wang, Yunsong Zhou, Shan Chang and Minyi Guo]
venue: in Proceedings of IEEE/CVF CVPR 2024
year: 2024
location: "Seattle, USA"
track: Conference
tags: [Mobile Sensing]
imageUrl: cvpr2024-liuquan.png
imageCaption: "Figure 2. Overview of Extend Your Own Correspondences (EYOC). It exhibits a two-branch student-labeler structure with periodic synchronization, where the labeler generates correspondences for the student. Point cloud pairs are selected at random frame interval, whose range extends with time. Labeler dirty correspondences are filtered before the speculative registration which outputs an estimated pose. Finally, correspondence rediscovery with NN-search on re-aligned input point clouds recovers clean correspondence labels."
pdfUrl: cvpr2024-liuquan.pdf
---

Registration of point clouds collected from a pair of distant vehicles provides a comprehensive and accurate 3D view of the driving scenario, which is vital for driving safety related applications, yet existing literature suffers from the expensive pose label acquisition and the deficiency to generalize to new data distributions. In this paper, we propose EYOC, an unsupervised distant point cloud registration method that adapts to new point cloud distributions on the fly, requiring no global pose labels. The core idea of EYOC is to train a feature extractor in a progressive fashion, where in each round, the feature extractor, trained with near point cloud pairs, can label slightly farther point cloud pairs, enabling self-supervision on such far point cloud pairs. This process continues until the derived extractor can be used to register distant point clouds. Particularly, to enable high-fidelity correspondence label generation, we devise an effective spatial filtering scheme to select the most representative correspondences to register a point cloud pair, and then utilize the aligned point clouds to discover more correct correspondences. Experiments show that EYOC can achieve comparable performance with state-of-the-art supervised methods at a lower training cost. Moreover, it outwits supervised methods regarding generalization performance on new data distributions.
