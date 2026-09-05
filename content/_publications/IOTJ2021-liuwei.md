---
title: "Wi-PSG: Detecting Rhythmic Movement Disorder Using COTS WiFi"
authors: [Wei Liu, Shan Chang, Ye Liu and Hao Zhang]
venue: IEEE Internet of Things Journal (IOT-J), 8(6), pp. 4681-4696, 2021.
year: 2021
track: Journal
topic: "Wireless Sensing"
tags: ["Channel state information (CSI)", "commercial off-the-shelf (COTS) WiFi", "movement detection", "movement recognition", "rhythmic movement disorder (RMD)"]
imageUrl: IOTJ2021-liuwei.png
imageCaption: "Fig. 1. RMD related movements. (a) Head rolling. (b) Body rolling (turning from supine to side). (c) Body rolling (turning from side to prone). (d) Head banging."
pdfUrl: IOTJ2021-liuwei.pdf
doi: "10.1109/JIOT.2020.3029266"
---

Rhythmic movement disorder (RMD) is closely related to health problems like insomnia, daytime fatigue, anxiety disorder, and depression, or even causes severe injuries resulting from the movements. To obtain detailed information of RMD related abnormal movements for early diagnosis, there are generally three categories of solutions: 1) using camera to record image data; 2) wearing various smart devices; and 3) deploying dedicated hardware to capture sensor data. But none of such are widely accepted for different reasons due to privacy, inconvenience and excessive overhead. We believe one of the essential features in a feasible solution is nonintrusiveness, in which movement data collection should be carried out without the awareness of targets. In addition, it should be fairly accurate and low cost. In this work, we propose Wi-PSG, a contactless and nonintrusive sleep monitoring system, which exploits channel state information (CSI) from existing WiFi infrastructures to detect RMD related movements. Specifically, we introduce new set of sensitivity metrics and reconstruct the collected CSI into an ideal subcarrier sensitive to all target movements. With the estimated CSI background model derived from static propagation paths, nonmovement interference can be canceled from RMD movement detection. We then train the classifier for distinguishing different kinds of RMD movements using both time and frequency features extracted from CSI signals. We implement Wi-PSG with a pair of WiFi devices and wireless access point. We evaluate Wi-PSG with nine volunteers over a one-month period. The extensive experiments demonstrate that Wi-PSG can achieve a recognition accuracy of above 92%, even under challenging scenarios.
