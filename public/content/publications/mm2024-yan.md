---
title: "Fooling 3D Face Recognition with One Single 2D Image"
authors: [Shizong Yan, Huixiang Wen, Shan Chang, Hongzi Zhu and Luo Zhou]
venue: "ACM International Conference on Multimedia (MM 2024)"
year: 2024
location: "Melbourne VIC, Australia"
track: Conference
topic: "IoT Security"
tags: [3D Face Recognition, Twin Deep Networks, RGB-D Images, Black-box Attack]
imageUrl: mm2024-yan.png
imageCaption: "Figure 2: Overview of DREAM."
pdfUrl: mm2024-yan.pdf
---

3D face recognition is subject to frequent spoofing attacks, in which 3D face presentation attack is one of the most notorious attacks. The attacker takes advantages of 3D scanning and printing techniques to generate masks of targets, which has found success in numerous real-life examples. The salient feature in such attacks is to obtain 3D face models through 3D scanning, though relatively more expensive and inconvenient when comparing with 2D photos. In this work, we propose a new method, DREAM, to recover 3D face models from single 2D image. Specifically, we adopt a black-box approach, which recovers "sufficient" depths to defeat target recognition models (e.g., face identification and face authentication models) by accessing its output and the corresponding RGB photo. The key observation is that it is not necessary to restore the true value of depths, but only need to recover the essential features relevant to the target model. We used four public 3D face datasets to verify the effectiveness of DREAM. The experimental results show that DREAM can achieve a success rate of 94% on face authentication model, even in cross-dataset testing, and a success rate of 36% on face identification model.
