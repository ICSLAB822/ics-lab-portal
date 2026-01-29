---
title: "RUPS: Fixing Relative Distances among Urban Vehicles with Context-Aware Trajectories"
authors: [Hongzi Zhu, Shan Chang, Li Lu and Wei Zhang]
venue: in Proceedings of IEEE IPDPS 2016
year: 2016
track: Conference
topic: "Vehicular Networks"
location: "Chicago, Illinois, USA"
tags: ["GSM-aware trajectory", "front-rear distance", "fingerprinting", "vehicle-to-vehicle communication"]
imageUrl: IPDPS2016(Chicago, Illinois USA)-hongzi.png
imageCaption: "Fig. 5. System architecture of RUPS."
pdfUrl: IPDPS2016(Chicago, Illinois USA)-hongzi.pdf
---

Access to accurate relative front-rear distance information between vehicles can be of great interest to drivers as such information can be utilised to improve driving safety. Acquiring such information in urban settings is very challenging due to the high complexity of urban environments. In this paper, we propose a novel scheme, called RUPS, to tackle the relative distance fixing problem. We first investigate pervasive GSM signals and find that the received signal strength indicator (RSSI) of multiple GSM channels measured over a distance has ideal temporal-spatial characteristics for temporary fingerprinting. With this observation, an RUPS-enabled vehicle first perceives the information of its GSM-aware trajectory while moving. Then by exchanging and comparing its own trajectory with that of a neighbouring vehicle, the vehicle can identify common locations overlapped on both trajectories. Finally, the relative distance between this pair of vehicles can be obtained by further comparing their geographical trajectories since that common location. As a result, RUPS is a fully distributed and lightweight scheme, requiring only a minimum hardware deployment, and does not need synchronization between vehicles or any pre-constructed signal maps. Extensive trace-driven simulation results show that RUPS can work stably under complex urban environments and overwhelm the performance of GPS by 2.7 times on average.
