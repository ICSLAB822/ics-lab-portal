---
title: "VOGUE: Secure User Voice Authentication on Wearable Devices using Gyroscope"
authors: [Shan Chang, Xinggan Hu, Hongzi Zhu, Wei Liu and Lei Yang]
venue: in Proceedings of IEEE SECON 2022
year: 2022
track: Conference
topic: "Privacy & Security"
location: "Virtual Conference"
tags: ["voice authentication", "replay attack", "speech movement sequence", "gyroscope", "liveness detection"]
imageUrl: SECON2022(Virtual Conference)-changshan.png
imageCaption: "Fig. 1. The raw audio data sampled by microphone when a speaker pronounces “home”, and the corresponding motion sequences collected from accelerometers and gyroscopes of smart watch, glasses, and phone."
pdfUrl: SECON2022(Virtual Conference)-changshan.pdf
---

Voice assistants are popular to wearable devices with limited input and output capabilities, however vulnerable to voice attacks, which cheat a voice assistant by playing forged voice commands without user awareness. In this paper, we propose VOGUE, which captures unique yet stable pattern of speech movement sequences of speakers with embedded gyroscope in wearable devices, to distinguish between registered legal user and malicious attackers (human or machines). The design of VOGUE is based on two key observations. First, speech, as a type of highly complex motor task, inherently requires coordinated actions of many orofacial, laryngeal, pharyngeal, and respiratory muscles, and the collective movements of muscles propagate to distant body segments. Second, to generate a certain word, the speech movement sequence of a speaker is known to be distinctive, and can be captured by inertial sensors. We implement VOGUE on three kinds of COTS android devices including smart glasses, watches and phones, and conduct comprehensive evaluation on the performances. Experimental results show that VOGUE achieves a mean false-acceptance rate (FAR) and false-rejection rate (FRR) of 2.23% and 2.48%, respectively, even under sophisticated voice impersonation attacks.
