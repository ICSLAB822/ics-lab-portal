---
title: "FriendSeeker: Inferring Hidden Friendship in Mobile Social Networks with Sparse Check-in Data"
authors: [Shan Chang, Yuting Tao, Hongzi Zhu and Bo Li]
venue: in Proceedings of IEEE ICDCS 2023
year: 2023
track: Conference
topic: "Privacy & Security"
location: "Hong Kong, China"
tags: ["hidden friendship inference", "sparse check-in data", "spatial-temporal proximity feature", "social proximity feature"]
imageUrl: ICDCS2023(Hong Kong, China)-changshan.png
imageCaption: "Fig. 2: Architecture of FriendSeeker, consisting of two phases, i.e., Real-world Friends Inference and Iterative Hidden Friends Inference."
pdfUrl: ICDCS2023(Hong Kong, China)-changshan.pdf
---

Check-in data widely published in mobile social networks (MSNs) pose serious privacy threats to users. Existing inference attack methods show that pairwise social relationship could be estimated by analyzing check-in user records. However, the efficacy of such attacks heavily depends on the density of check-in data, which is often not present in practice. In this work, we propose a new inference attack scheme, which for the first time can effectively reveal hidden social friendship in both the real world and in cyberspace among users with only sparse check-in data. Our attack method enjoys two salient features. First, it requires no prior knowledge about social connections, instead it estimates users' social proximity by exploiting both physical presence and social proximities. Second, our attack scheme can automatically learn representative features based on the significance of various check-in records, rather than relying on heuristic features. We conduct extensive trace-driven simulations, and the results demonstrate that our inference attack method can improve the efficacy of the state-of-the-art learning based schemes up to 40%. Moreover, our proposed attack method is also robust against common data obfuscation mechanisms.
