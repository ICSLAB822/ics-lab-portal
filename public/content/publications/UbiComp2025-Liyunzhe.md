---
title: "BlinkBud: Detecting Hazards from Behind via Sampled Monocular 3D Detection on a Single Earbud"
authors: [Yunzhe Li, Jiajun Yan, Yuzhou Wei, Kechen Liu, Yize Zhao, Chong Zhang, Hongzi Zhu, Li Lu, Shan Chang and Minyi Guo]
venue: "Proceedings of ACM IMWUT (UbiComp'26), 9(4), pp. 1-26, 2025."
location: "Guangzhou, China"
year: 2025
track: Journal
topic: "Wearable Computing"
tags: ["Hazardous object detection", "monocular 3D object tracking", "wearable devices", "collision warning"]
imageUrl: UbiComp2025-Liyunzhe.png
imageCaption: "Fig. 5. The Prototype implementation of BlinkBud on an earbud (right) and an example of field study (left), where a volunteer wearing the earbud is walking along a road with motor traffic."
pdfUrl: UbiComp2025-Liyunzhe.pdf
award: ""
doi: "10.1145/3770707"
---

Failing to be aware of speeding vehicles approaching from behind poses a huge threat to the road safety of pedestrians and cyclists. In this paper, we propose BlinkBud, which utilizes a single earbud and a paired phone to online detect hazardous objects approaching from behind of a user. The core idea is to accurately track visually identified objects utilizing a small number of sampled camera images taken from the earbud. To minimize the power consumption of the earbud and the phone while guaranteeing the best tracking accuracy, a novel 3D object tracking algorithm is devised, integrating both a Kalman filter based trajectory estimation scheme and an optimal image sampling strategy based on reinforcement learning. Moreover, the impact of constant user head movements on the tracking accuracy is significantly eliminated by leveraging the estimated pitch and yaw angles to correct the object depth estimation and align the camera coordinate system to the user's body coordinate system, respectively. We implement a prototype BlinkBud system and conduct extensive real-world experiments. Results show that BlinkBud is lightweight with ultra-low mean power consumptions of 29.8 mW and 702.6 mW on the earbud and smartphone, respectively, and can accurately detect hazards with a low average false positive ratio (FPR) and false negative ratio (FNR) of 4.90% and 1.47%, respectively.
