---
title: "mmV2V: Combating One-hop Multicasting in Millimeter-wave Vehicular Networks"
authors: [Jiangang Shen, Hongzi Zhu, Yunxiang Cai, Bangzhao Zhai, Xudong Wang, Shan Chang, Haibin Cai and Minyi Guo]
venue: in Proceedings of IEEE ICDCS 2022
year: 2022
track: Conference
topic: "Vehicular Networks"
location: "Bologna, Italy"
tags: ["mmWave communication", "one-hop multicasting", "vehicular networks", "beamforming", "neighbor discovery"]
imageUrl: ICDCS2022(Bologna, Italy)-shenjiangang.png
imageCaption: "Fig. 1: An illustration of mmWave vehicular network, where data transmission only happens when a Tx beam is aligned with a Rx beam. In the OHM problem, each vehicle (e.g., v1) needs to individually communicate with its one-hop neighbors (e.g., vehicles within the dotted disk area). Without centralized coordination, the network throughput may be sub-optimal as shown in (a) due to an inappropriate schedule."
pdfUrl: ICDCS2022(Bologna, Italy)-shenjiangang.pdf
---

One-hop multicasting (OHM) of high-volume sensor data is essential for cooperative autonomous driving applications. While millimeter-Wave (mmWave) bands can be utilized for high-bandwidth OHM data transmission, it is very challenging for individual vehicles to find and communicate with a proper neighbor in a fully distributed and highly dynamic scenario. In this paper, we propose a fully distributed OHM scheme in vehicular networks, called mmV2V, which consists of three highly integrated protocols. Specifically, synchronized vehicles first conduct a probabilistic neighbor discovery procedure, in which randomly divided transmitters (or receivers) clockwise scan (or listen to) the surroundings in pace with heterogeneous Tx (or Rx) beams. In this way, the vast majority of neighbors can be identified in a few repeated rounds. Furthermore, vehicles negotiate with each of their neighbors about the optimal communication schedule in evenly distributed slots. Finally, each agreed pair of neighboring vehicles start high data rate transmissions with refined beams. We conduct extensive simulations and the results demonstrate that mmV2V can achieve a high completion ratio in rigid OHM tasks under various traffic conditions.
