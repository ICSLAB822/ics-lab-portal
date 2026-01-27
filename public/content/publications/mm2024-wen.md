---
title: "DepthCloak: Projecting Optical Camouflage Patches for Erroneous Monocular Depth Estimation of Vehicles"
authors: [Huixiang Wen, Shizong Yan, Shan Chang, Jie Xu, Hongzi Zhu, Yanting Zhang, Bo Li]
venue: "ACM International Conference on Multimedia (MM 2024)"
year: 2024
location: "Melbourne, VIC, Australia"
pages: "2739-2747"
track: Conference
topic: "Adversarial Attacks"
tags: [Monocular Depth Estimation, Projection Attack, Physical Attack]
imageUrl: mm2024-wen.png
imageCaption: "Figure 1: An example of our attack scenario."
pdfUrl: mm2024-wen.pdf
---

Adhesive adversarial patches have been common used in attacks against the computer vision task of monocular depth estimation (MDE). Compared to physical patches permanently attached to target objects, optical projection patches show great flexibility and have gained wide research attention. However, applying digital patches for direct projection may lead to partial blurring or omission of details in the captured patches, attributed to high information density, surface depth discrepancies, and non-uniform pixel distribution. To address these challenges, we introduce DepthCloak, an adversarial optical patch designed to interfere with the MDE of vehicles. To this end, we first simplify the patch to a gray pattern because the projected "black-and-white light" has strong robustness to ambient light. We propose a GAN-based approach to simulate projections and deduce a projectable list. Then, we employ neighborhood averaging to fill sparse depth values, compress all depth values into a reduced dynamic range via nonlinear mapping, and use these values to adjust the Gaussian blur radius as weight parameters, thereby simulating depth variation effects. Finally, by integrating Moire pattern and applying style transfer techniques, we customize adversarial patches featuring regularly arranged characteristics. We deploy DepthCloak in real driving scenarios, and extensive experiments demonstrate that DepthCloak can achieve an attack success rate of over 80% in the physical world.
