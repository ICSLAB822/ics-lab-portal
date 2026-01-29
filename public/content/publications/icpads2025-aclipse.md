---
title: "Aclipse: Attention-based Cascaded Learning Enabling Privacy-preserving Speech Emotion Recognition"
authors: [Jiusong Luo, Shan Chang, Luo Zhou and Shizong Yan]
venue: in Proceedings of IEEE ICPADS 2025
year: 2025
location: Hefei, China
track: Conference
topic: Privacy-preserving Machine Learning
tags: [Speech Emotion Recognition, Privacy Protection, Deep Learning, Attention Mechanism]
award: "Best Presentation in Session"
imageUrl: icpads2025-aclipse.png
pdfUrl: icpads2025-aclipse.pdf
imageCaption: "Fig. 1: Aclipse adds adversarial perturbation to the original audio for protecting the privacy of the speech content while still effectively recognize emotion."
codeUrl: #
---

Speech Emotion Recognition (SER), as a core technology in intelligent interaction and affective computing, faces critical privacy security challenges. Speech not only contains emotional information, but also encompasses sensitive data such as conversational content and speaker identity markers. The sensitive information could be potentially reconstructed through Automatic Speech Recognition (ASR), posing substantial privacy leakage risks. Existing privacy protection methods focus mainly
on suppressing the leakage of demographic characteristics such as speaker identity, while there is a lack of systematic research on the speech content. The traditional SER and ASR joint training paradigm relies on the sequence alignment mechanism of ASR, which leads to deep coupling of emotion features with the corresponding text, causing a fundamental contradiction between ”performance improvement” and ”privacy protection”. To address this problem, this paper proposes an attention-based cascaded learning enabling privacy-preserving (Aclipse) strategy, which is divided into two stages. In the first stage, the emotion-retaining (ER) module and semantics-obfuscating (SO) module in cascaded manner, which consist of the channel-level attention mechanism, guides the targeted injection of adversarial perturbation by identifying and strengthening high-frequency feature channels that are critical to ASR performance, thereby significantly improving the semantic obfuscation to achieve speech privacy protection while minimizing the negative impact on SER performance. In the second stage, we freeze the SO
module parameters to maintain its interference effect on ASR, and fine-tune the ER to improve the performance of SER by adjusting the channel-level attention mechanism to focus on emotion-related information. The experimental results on the IEMOCAP dataset show that Aclipse achieves an effective balance between performance and privacy protection, providing a new idea to build a trustworthy SER system.
