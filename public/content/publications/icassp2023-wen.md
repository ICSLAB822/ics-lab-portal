---
title: "LIGHT PROJECTION-BASED PHYSICAL-WORLD VANISHING ATTACK AGAINST CAR DETECTION"
authors: [Huixiang Wen, Shan Chang, Luo Zhou]
venue: in Proceedings of IEEE ICASSP 2023
location: "Rhodes Island, Greece"
year: 2023
track: Conference
topic: "Adversarial Attacks"
tags: [Autonomous driving, Object detection, Physical adversarial attack, Projection attack]
imageUrl: icassp2023-wen.png
imageCaption: "Fig. 1. An example of light projection-based attack."
pdfUrl: icassp2023-wen.pdf
---

Physical adversarial attacks directly apply adversarial perturbations to real-world objects. Perturbations usually are printed as patches and pasted on target objects. This requires attackers in the vicinity of targets, which may not be feasible in practice. In this paper, we propose a stealthy physical adversarial attack by taking advantage of the transient of light projection. The attacker utilizes a drone with a portable projector to project the adversarial light pattern on the rear windshield of a vehicle to obstruct the object detector (OD) in autonomous driving systems. This can lead to serious safety vulnerability. We train digital perturbations by back propagation on the OD in an iterative manner. Unfortunately, they do not work well in the form of light patterns due to distortion, double imaging and partial reflectance when projected as light pattern. Hence, we model the mapping from digital to light projections, and use the inverse of the mapping to compensate the projection distortion in each iteration. We employ four state-of-the-art ODs to demonstrate the effectiveness and robustness of our proposed attack.
