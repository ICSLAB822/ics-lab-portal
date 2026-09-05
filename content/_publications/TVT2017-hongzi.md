---
title: "Online Vehicle Front-Rear Distance Estimation With Urban Context-Aware Trajectories"
authors: [Hongzi Zhu, Shan Chang, Wei Zhang, Fan Wu and Li Lu]
venue: IEEE Transactions on Vehicular Technology (TVT), 67(2), pp. 1063-1074
year: 2018
track: Journal
topic: "Vehicular Networks"
tags: ["GSM-aware trajectory", "front-rear distance", "fingerprinting", "vehicle-to-vehicle communication"]
imageUrl: TVT2017-hongzi.png
imageCaption: "Fig. 5. System architecture of RUPS."
pdfUrl: TVT2017-hongzi.pdf

---

Access to accurate relative front-rear distance information between vehicles is of great interest to drivers as such information can be utilized to improve driving safety. Acquiring such information based on systems such as the global positioning system (GPS) in urban settings is very challenging due to the high complexity of urban environments. In this paper, we propose a scheme, called relative urban positioning system (RUPS), to tackle the relative distance fixing problem. We first investigate the pervasive global system for mobile communication (GSM) signals and find that the received signal strength indicator measures of multiple GSM channels collected over a distance has ideal temporal-spatial characteristics for temporary fingerprinting. With this key insight, an RUPS-enabled vehicle first perceives the information of its GSM-aware trajectory while moving. Then, by exchanging and comparing its own trajectory with that of a neighboring vehicle, the vehicle can identify common locations overlapped between trajectories of itself and this neighbor. Finally, the relative distance between this pair of vehicles can be perceived by further comparing their geographical trajectories based on an identified common location. As a result, RUPS is a fully distributed and lightweight scheme, requiring only a minimum hardware deployment, and does not need synchronization between vehicles or any preconstructed signal maps. We implement a prototype system to validate the feasibility of the RUPS design. Extensive trace-driven simulation results show that RUPS can work stably under complex urban environments and overwhelm the performance of GPS by 2.7 times on average.
