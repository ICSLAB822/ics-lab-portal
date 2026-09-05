---
title: "Contactless Breathing Airflow Detection on Smartphone"
authors: [Wei Liu, Shan Chang, Feng Li, Yong Xu, Shizong Yan and Ye Liu]
venue: IEEE Internet of Things Journal (IOT-J), 10(4), pp. 3428-3439, 2023.
year: 2023
track: Journal
topic: "Mobile Sensing"
tags: ["Acoustic sensing", "breathing airflow detection", "contactless detection", "Doppler effect", "smartphone"]
imageUrl: IOTJ2022-liuwei.png
imageCaption: "Fig. 1. Practical deployment of Wi-Tracker."
pdfUrl: IOTJ2022-liuwei.pdf
---

Accurate and continuous breathing rate detection is crucial as it can help people to assess their physical health and provide early warning and diagnosis for potential human diseases. Traditional breathing detection approaches involving intrusive devices are uncomfortable for long-term continuous monitoring. While contactless detection approaches utilizing radio-frequency (RF) signals or acoustic signals mainly focus on sensing the changes of chest and abdomen displacements, which are not a good indicator recording breathing event due to existing false body movements. In this article, we present Wi-Tracker, a contactless breathing detection system based on commercial off-the-shelf (COTS) smartphones, which detects breathing event through capturing the Doppler effect caused by human exhaled airflow on the reflected acoustic wave. Specifically, Wi-Tracker uses the speaker on smartphone to transmit ultrasound signals and its microphone to receive the reflected acoustic signals recording breathing event. Then, we adopt a cumulative power spectral density (CPSD) method to extract fine-grained breathing pattern from the received signals. Finally, we design algorithms to accurately capture the breathing event from the extracted breathing pattern. We evaluate Wi-Tracker with six volunteers for a period of one month. Experimental results show that Wi-Tracker is able to achieve contactless breathing detection with a mean estimation error (MEE) of 0.17 bpm, which is even better as compared to RFID-based or WiFi-based approaches.
