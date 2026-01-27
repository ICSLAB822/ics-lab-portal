---
title: "Closed-Box 3-D Face Reconstruction Attack on Face Recognition From a Single Image"
authors: [Shizong Yan, Huixiang Wen, Shan Chang, Hongzi Zhu, Luo Zhou]
venue: IEEE INTERNET OF THINGS JOURNAL (IoT-J)
year: 2025
volume: "12"
issue: "24"
pages: "52179-52193"
track: Journal
tags: [3-D face recognition, closed-box attack, RGB-depth (RGB-D) images, twin deep networks]
imageUrl: iot2025-yanshizong.png
imageCaption: "Fig. 1. Attack scenarios: 3-D face authentication versus identiﬁcation."
pdfUrl: iot2025-yanshizong.pdf
---

The 3-D face recognition systems are frequently susceptible to spoofing attacks, with 3-D face presentation attacks being particularly notorious. Attackers commonly exploit 3-D scanning and printing techniques to generate masks of target individuals, a method proven successful in various real-world scenarios. A defining characteristic of these attacks involves acquiring 3-D face models via 3-D scanning, a process that is notably more expensive and cumbersome compared to obtaining 2-D photographs. In this work, we introduce the depth recovery attack method (DREAM), a novel method for recovering 3-D face models from a single 2-D image. Specifically, our approach adopts a closed-box strategy, reconstructing sufficient depth information to compromise target recognition models-such as face identification and authentication systems-by merely accessing their output and the corresponding RGB photograph. Our key insight is that achieving successful attacks does not necessitate restoring the precise ground-truth depth values; instead, it only requires recovering the essential features that are salient to the target model's decision-making process. We evaluate DREAM's effectiveness using four public 3-D face datasets. Experimental results indicate that DREAM achieves a 94% success rate on face authentication models, even in cross-dataset testing. For face identification models, the success rate is 36%. Building upon DREAM, we further propose DREAM-3D, which leverages a 3-D GAN to reconstruct depth images for deceiving 3-D face recognition systems. In addition, we evaluate DREAM-3D's effectiveness on two datasets. Experimental results indicate that DREAM-3D achieves attack success rates (ASRs) exceeding 90% and approximately 50% against different models.
