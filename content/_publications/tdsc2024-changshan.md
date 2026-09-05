---
title: "Combating Voice Spoofing Attacks on Wearables via Speech Movement Sequences"
authors: [Shan Chang, Luo Zhou, Wei Liu, Hongzi Zhu, Xinggang Hu and Lei Yang]
venue: IEEE Transactions on Dependable and Secure Computing (TDSC), 22(1), pp. 819-832, 2024.
year: 2024
track: Journal
topic: "Mobile Sensing"
tags: [voice assistant, spoofing attack, speech movement sequence, gyroscope, wearable]
imageUrl: tdsc2024-changshan.png
imageCaption: "Fig. 3: The overall architecture of GyroTalk."
pdfUrl: tdsc2024-changshan.pdf
---

Voice assistants, increasingly integrated into wearable devices with limited human-computer interaction modalities, are susceptible to voice spoofing attacks. Such attacks exploit pre-recorded or synthesized voice commands to trick the assistants into executing actions unauthorized by legitimate users. In this work, we propose GyroTalk, a novel approach extracts individual and reliable features from speech movement sequences of users, using built-in gyroscopes in wearables, to differentiate between legitimate users and malicious attackers. GyroTalk is inspired by two critical insights. Firstly, speech, as a highly intricate motor task, necessitates the synchronized coordination of multiple respiratory, laryngeal, lingual and mandibular muscles. These collective muscle movements propagate throughout the body, providing unique movement signatures. Secondly, the distinctive speech movement sequences of individual speakers, essential for generating specific words, can be grabbed by embedded IMU of wearables. We conduct a comprehensive evaluation of GyroTalk across various COTS Android devices, including smart phones, watches and glasses. Our experimental results demonstrate that GyroTalk can achieve a mean FAR of 2.23% and a FRR of 2.48%, even in the face of complicated voice spoofing attacks.
