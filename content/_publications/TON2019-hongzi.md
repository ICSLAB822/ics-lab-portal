---
title: "Edge-empowered Accurate Urban Vehicle Localization with Cellular-Aware Trajectories"
authors: [Hongzi Zhu, Fan Wu, Siyuan Cao, Shan Chang and Li Lu]
venue: IEEE/ACM Transactions on Networking (TON), 2(1), pp. 12-27, 2019.
year: 2019
track: Journal
topic: "Mobile Sensing"
tags: ["urban", "vehicle localization", "GSM", "fingerprinting", "trajectory"]
imageUrl: TON2019-hongzi.png
imageCaption: "Fig. 6: System architecture of UPS design."
pdfUrl: TON2019-hongzi.pdf
---

Acquiring accurate vehicle location information in urban settings is very challenging due to the complexity of urban environments. In this paper, we propose a novel scheme, called UPS, to tackle urban vehicle localization problem. After extensive empirical study, we find that GSM power spectrogram collected over a distance has ideal temporal-spatial characteristics for fingerprinting. Encouraged by this observation, UPS tries to utilize the geographical trajectory and the associated GSM power spectrogram information of a moving vehicle to identify its location with reference to a map. To this end, two appealing techniques, i.e., online vehicle localization and GSM map construction, are elegantly integrated. With the former, a vehicle can accurately fix its location under complex urban environments. With the latter, a reliable metropolitan-scale GSM power map can be cost-efficiently built at edges, leveraging the strong power of crowdsourcing. By design, UPS is light-weight, requiring only a minimum hardware deployment. We implement a prototype system to validate the feasibility of the UPS design. Furthermore, we conduct extensive trace-driven simulations and results show that UPS can work stably in various urban settings and achieve an accuracy of 5.3 meters with a 90% precision, overwhelming the performance of GPS by five times.
