---
title: "Footprint: Detecting Sybil Attacks in Urban Vehicular Networks"
authors: [Shan Chang, Yong Qi, Hongzi Zhu, Jizhong Zhao and Xuemin (Sherman) Shen]
venue: IEEE Transactions on Parallel and Distributed Systems (TPDS), 23(6), pp. 1103-1114, 2012.
year: 2012
track: Journal
topic: "Privacy & Security"
tags: ["Sybil attack", "location privacy", "signer-ambiguous signature", "urban vehicular networks", "location-hidden trajectory"]
imageUrl: TPDS2012-changshan.png
imageCaption: "Fig. 1. An illustration of the system model, where the dash line indicates the travel route of a vehicle. As the vehicle traverses the area, it will encounter multiple RSUs, typically deployed at intersections."
pdfUrl: TPDS2012-changshan.pdf
doi: "10.1109/TPDS.2011.263"
---

In urban vehicular networks, where privacy, especially the location privacy of anonymous vehicles is highly concerned, anonymous verification of vehicles is indispensable. Consequently, an attacker who succeeds in forging multiple hostile identifies can easily launch a Sybil attack, gaining a disproportionately large influence. In this paper, we propose a novel Sybil attack detection mechanism, Footprint, using the trajectories of vehicles for identification while still preserving their location privacy. More specifically, when a vehicle approaches a road-side unit (RSU), it actively demands an authorized message from the RSU as the proof of the appearance time at this RSU. We design a location-hidden authorized message generation scheme for two objectives: first, RSU signatures on messages are signer ambiguous so that the RSU location information is concealed from the resulted authorized message; second, two authorized messages signed by the same RSU within the same given period of time (temporarily linkable) are recognizable so that they can be used for identification. With the temporal limitation on the linkability of two authorized messages, authorized messages used for long-term identification are prohibited. With this scheme, vehicles can generate a location-hidden trajectory for location-privacy-preserved identification by collecting a consecutive series of authorized messages. Utilizing social relationship among trajectories according to the similarity definition of two trajectories, Footprint can recognize and therefore dismiss "communities" of Sybil trajectories. Rigorous security analysis and extensive trace-driven simulations demonstrate the efficacy of Footprint.
