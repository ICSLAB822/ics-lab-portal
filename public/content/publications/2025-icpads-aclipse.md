---
title: "Aclipse: Attention-based Cascaded Learning Enabling Privacy-preserving Speech Emotion Recognition"
authors: [Jiansong Luo, Shan Chang, Luo Zhou, Shizong Yan]
venue: in Proceedings of the 31st International Conference on Parallel and Distributed Computing Systems (ICPADS 2025)
year: 2025
location: Hefei, China
track: Conference
topic: Privacy-preserving Machine Learning
tags: [Speech Emotion Recognition, Privacy Protection, Deep Learning, Attention Mechanism]
imageUrl: icpads-aclipse.png
pdfUrl: icpads-aclipse.pdf
imageCaption: "Fig. 1: clipse adds adversarial perturbation to the original audio for protecting the privacy of the speech content while still effectively recognize emotion."
codeUrl: #
---

Speech Emotion Recognition (SER), as a core technology in intelligent human-computer interaction, has attracted increasing research attention. However, existing SER systems often suffer from poor performance in privacy-sensitive scenarios due to the challenge of extracting emotional information while simultaneously protecting sensitive personal data. To address this problem, we propose Aclipse, a privacy-preserving SER framework that combines attention mechanisms with cascaded learning. 

The key innovation of Aclipse lies in its two-stage approach. In the first stage, we employ attention-based mechanisms to identify and suppress the leakage of demographic characteristics from speech signals, ensuring a fundamental contradiction between the SER objective and privacy leakage is addressed. In the second stage, we utilize cascaded learning with semantic abstraction to further improve the performance of SER while maintaining privacy guarantees.

Our experimental evaluation on the IEMOCAP dataset demonstrates that Aclipse achieves competitive SER performance while effectively minimizing privacy leakage. The framework maintains high accuracy in emotion recognition while providing formal privacy protection through differential privacy mechanisms. Results show that our approach successfully builds a new paradigm for privacy-preserving SER systems.
