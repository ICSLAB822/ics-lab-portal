---
title: "Enabling Long Range Point Cloud Registration in Vehicular Networks via Muti-Hop Relays"
authors: [Zhenxi Wang, Hongzi Zhu, Yunxiang Cai, Quan Liu, Shan Chang, Liang Zhang and Minyi Guo]
venue: IEEE TRANSACTIONS ON MOBILE COMPUTING (TMC), 23(12), pp. 14821-14833, 2024.
year: 2024
track: Journal
tags: [Point cloud registration, cooperative sensing, multi-hop relay, VANETs]
imageUrl: tmc2024-wangzhenxi.png
imageCaption: "Fig. 1. Motivation of long-range PCR. (a) The resolution of a point cloud decreases with the distance to the LiDAR sensor. (b) The perception ﬁeld of LiDAR is blocked by obstacles. (c) Point clouds collected on two vehicles with different viewpoints can be registered (aligned), enhancing the perception capability of both vehicles."
pdfUrl: tmc2024-wangzhenxi.pdf
---

Point cloud registration (PCR) can significantly extend the visual field and enhance the point density on distant objects, thereby improving driving safety. However, it is very challenging for vehicles to perform online registration between long-range point clouds. In this paper, we propose an online long-range PCR scheme in VANETs, called LoRaPCR, where vehicles achieve long range registration through multi-hop short-range highly-accurate registrations. Given the NP-hardness of the problem, a heuristic algorithm is developed to determine best registration paths while leveraging the reuse of registration results to reduce computation costs. Moreover, we utilize an optimized dynamic programming algorithm to determine the transmission routes while minimizing the communication overhead. To the best of our knowledge, LoRaPCR is the first solution to achieve multi-vehicle point cloud long-range registration. Results of extensive experiments demonstrate that LoRaPCR can achieve high PCR accuracy with low relative translation and rotation errors of 0.55 meters and 1.43 degrees, respectively, at a distance of over 100 meters, and reduce the computation overhead by more than 50% compared to the state-of-the-art method.
