---
title: "Perceiving Accurate CSI Phases with Commodity WiFi Devices"
authors: [Yiwei Zhuo, Hongzi Zhu, Hua Xue and Shan Chang]
venue: in Proceedings of IEEE INFOCOM 2017
year: 2017
track: Conference
topic: "Wireless Sensing"
location: "Atlanta, GA, USA"
tags: ["Channel State Information (CSI)", "non-linear phase errors", "rotation phase error", "empirical study", "CSI splicing"]
imageUrl: INFOCOM2017(Atlanta, GA, USA)-zhouyiwei.png
imageCaption: "Fig. 1: (a) raw CSI amplitudes obtained from six 20MHz 802.11n bands in a typical indoor environment; (b) the corresponding raw CSI phases."
pdfUrl: INFOCOM2017(Atlanta, GA, USA)-zhouyiwei.pdf
---

WiFi technology has gained a wide prevalence for not only wireless communication but also pervasive sensing. A wide variety of emerging applications leverage accurate measurements of the Channel State Information (CSI) information obtained from commodity WiFi devices. Due to hardware imperfection of commodity WiFi devices, the frequency response of internal signal processing circuit is mixed with the real channel frequency response in passband, which makes deriving accurate channel frequency response from CSI measurements a challenging task. In this paper, we identify non-negligible non-linear CSI phase errors and report that IQ imbalance is the root source of non-linear CSI phase errors. We conduct intensive analysis on the characteristics of such non-linear errors and find that such errors are prevalent among various WiFi devices. Furthermore, they are rather stable along time and the received signal strength indication (RSSI) but sensitive to frequency bands used between a transmission pair. Based on these key observations, we propose new calibration methods to compensate both non-linear and linear CSI phase errors. We demonstrate the efficacy of the proposed methods by applying them in CSI splicing. Results of extensive real-world experiments indicate that accurate CSI phase measurements can significantly improve the performance of splicing and the stability of the derived power delay profiles (PDPs).
