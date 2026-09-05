---
title: "π-Splicer: Perceiving Accurate CSI Phases with Commodity WiFi Devices"
authors: [Hongzi Zhu, Yiwei Zhuo, Qinghao Liu and Shan Chang]
venue: IEEE Transactions on Mobile Computing (TMC), 17(9), pp. 2155-2165, 2018.
year: 2018
track: Journal
topic: "Wireless Sensing"
tags: ["Channel state information (CSI)", "non-linear phase error", "rotation phase error", "CSI splicing", "indoor distance ranging"]
imageUrl: TMC2018-hongzi.png
imageCaption: "Fig. 2. Illustration of signal processing in 802.11n."
pdfUrl: TMC2018-hongzi.pdf

---

WiFi technology has gained a wide prevalence for not only wireless communication but also pervasive sensing. A wide variety of emerging applications leverage accurate measurements of the Channel State Information (CSI) information obtained from commodity WiFi devices. Due to hardware imperfection of commodity WiFi devices, the frequency response of internal signal processing circuit is mixed with the real channel frequency response in passband, which makes deriving accurate channel frequency response from CSI measurements a challenging task. In this paper, we identify non-negligible non-linear CSI phase errors and report that IQ imbalance is the root source of non-linear CSI phase errors. We conduct intensive analysis on the characteristics of such non-linear errors and find that such errors are prevalent among various WiFi devices. Furthermore, they are rather stable along time and the received signal strength indication (RSSI) but sensitive to frequency bands used between a transmission pair. Based on these key observations, we propose new methods to compensate both non-linear and linear CSI phase errors. We demonstrate the efficacy of the proposed methods by applying them in CSI splicing and indoor distance ranging. Results of extensive real-world experiments indicate that accurate CSI phase measurements can significantly improve the performance of splicing and the stability of the derived power delay profiles (PDPs). Moreover, the estimated distance errors are reduced by 5.7 times on average comparing to the state-of-the-art schemes.
