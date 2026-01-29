---
title: "HyperSight: Boosting Distant 3D Vision on a Single Dual-camera Smartphone"
authors: [Zifan Liu, Hongzi Zhu, Junchi Chen, Shan Chang and Lili Qiu]
venue: in Proceedings of ACM SenSys 2019
year: 2019
track: Conference
topic: "Mobile Sensing"
location: "New York, NY, USA"
tags: ["dual cameras", "smartphone", "depth estimation", "near-far diversity"]
imageUrl: SenSys2019(New York, NY, USA)-liuzifan.png
imageCaption: "Figure 1: Illustration of e￿ective 3D vision regions with native dual cameras and with HyperSight, respectively."
pdfUrl: SenSys2019(New York, NY, USA)-liuzifan.pdf

---

Smartphones with dual cameras are increasingly popular due to the need of supporting 3D vision. The depth information is critical for 3D vision. However, the two cameras on a smartphone are too close to accurately estimate the depth information especially for objects beyond two meters. In this paper, we propose an innovative system, called HyperSight, to estimate the depth information of objects using a dual camera smartphone. HyperSight realizes a virtual long-baseline stereo vision rig by having a user to move the phone in the air. The phone movement is continuously tracked and estimated using the short-baseline dual camera seeing nearby objects. We implement HyperSight as software on a Commercial-Off-The-Shelf (COTS) smartphone and conduct real-world experiments. The results show that when measuring feature-rich objects at a distance of five meters, HyperSight achieves a mean depth error of 6cm, which is up to 10x and 18x improvement in the accuracy compared with the stereo vision system using the native dual cameras and the Measure app based on ARKit 1 on mobile devices, respectively.
