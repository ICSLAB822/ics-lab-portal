---
title: "Exploiting Temporal Dependency for Opportunistic Forwarding in Urban Vehicular Networks"
authors: [Hongzi Zhu, Shan Chang, Minglu Li, Sagar Naik and Sherman Shen]
venue: in Proceedings of IEEE INFOCOM 2011
year: 2011
track: Conference
topic: "Vehicular Networks"
location: "Shanghai, China"
tags: ["Inter-contact time", "vehicular networks", "temporal dependency", "opportunistic forwarding", "Markov chain"]
imageUrl: INFOCOM2011(Shanghai, China)-hongzi.png
imageCaption: "Figure 1. A taxi with a commercial GPS device installed (highlighted in the inset), the location and operational information thus can be preriodically sent back via GPRS wireless channels."
pdfUrl: INFOCOM2011(Shanghai, China)-hongzi.pdf
---

Inter-contact times (ICTs) between moving objects are one of the key metrics in vehicular networks, and they are also central to forwarding algorithms and the end-to-end delay. Recent study on the tail distribution of ICTs based on theoretical mobility models and empirical trace data shows that the delay between two consecutive contact opportunities drops exponentially. While theoretical results facilitate problem analysis, how to design practical opportunistic forwarding protocols in vehicular networks, where messages are delivered in carry-and-forward fashion, is still unclear. In this paper, we study three large sets of Global Positioning System (GPS) traces of more than ten thousand public vehicles, collected from Shanghai and Shenzhen, two metropolises in China. By mining the temporal correlation and the evolution of ICTs between each pair of vehicles, we develop higher order Markov chains to characterize urban vehicular mobility patterns, which adapt as ICTs between vehicles continuously get updated. Then, the next hop for message forwarding is determined based on the previous ICTs. With our message forwarding strategy, it can dramatically increase delivery ratio (up to 80%) and reduce end-to-end delay (up to 50%) while generating similar network traffic comparing to current strategies based on the delivery probability or the expected delay.
