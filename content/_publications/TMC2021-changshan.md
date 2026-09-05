---
title: "CoSafe: Securing Mobile Devices through Mutual Mobility Consistency Verification"
authors: [Shan Chang, Hang Chen, Hongzi Zhu, Xinggang Hu and Di Cao]
venue: IEEE Transactions on Mobile Computing (TMC), 20(5), pp. 1761-1772, 2021.
year: 2021
track: Journal
topic: "Privacy & Security"
tags: ["Device loss detection", "mobile device", "motion consistency", "SVM", "cross wavelet analysis"]
imageUrl: TMC2021-changshan.png
imageCaption: "Fig. 1. An illustration of a pickpocket stealing the smartphone of a victim."
pdfUrl: TMC2021-changshan.pdf
---

As mobile devices play increasingly important roles in our daily lives, it is of great significance to protect personal mobile devices from being lost. Noticing the trend that one person normally carries more than one mobile device, we propose an innovative scheme, called CoSafe, to detect device loss by verifying the motion consistency between a pair of devices. The rationale is that the vibrations perceived on devices carried by the same person should be tightly coupled whereas a lost device would show distinct mobility characteristics from others. Specifically, CoSafe compares the mobility consistency between a pair of devices on three levels, where coarse features (i.e., the mobility state and motion periodicity) are first compared to give fast response and more complex comparison on subtle feature (i.e., the relative phase) is conducted only when needed. In this way, CoSafe can instantly respond and introduce very low computation and communication costs. We implement CoSafe on a Commercial-Off-The-Shelf Android smartphone and a smartwatch, and conduct both trace-driven simulations and real-world experiments to evaluate the performance of CoSafe. The results show that CoSafe achieves a mean false negative ratio and false positive ratio of 1.46 and 3.12 percent, respectively, even under sophisticated stealing attacks.
