---
title: "A Distributed 3D UAV Placement Algorithm for Integrated Ground-Air Cellular Networks"
authors: [Xinwei Wang, Ye Liu and Shan Chang]
venue: "in Proceedings of IEEE BigCom 2022"
location: "Xiamen, China"
year: 2022
track: Conference
topic: "UAV Networks"
tags: ["Unmanned aerial vehicles", "Reinforcement learning", "3D UAV deployment"]
imageUrl: BigCom2022-wangxinwei.png
imageCaption: "Fig. 3: The flow chart of SDQ-H."
pdfUrl: BigCom2022-wangxinwei.pdf
award: ""
doi: "10.1109/BigCom57025.2022.00058"
---

The problem of deploying unmanned aerial vehicles (UAVs) to form a wireless cellular network has gained much attention. Most of the recent works either need to know the locations of users or to make decision in a centralized way. In this paper, we design a distributed learning-based 3D UAV placement approach, named SDQ-H. Given a set of UAVs, SDQ-H builds an integrated ground-air cellular network to maximize the number of ground users (GUs) covered, without requiring knowledge of geographic locations of GUs. SDQ-H decouples the 3D UAV placement problem into two sub-optimal optimization problems. First, we utilize a Q-learning algorithm to optimize UAV positions in 2D space, i.e., in longitude and latitude. UAVs are modeled as agents, each of which takes action independently according to its position and reward. Then, we finetune the position of UAVs in the third dimension, i.e., height. The above two optimization processes are carried out alternately until convergence. We conduct simulations on several different user distributions. Simulation results demonstrate the superiority of SDQ-H.
