---
title: "Adaptive and Blind Regression for Mobile Crowd Sensing"
authors: [Shan Chang, Chao Li, Hongzi Zhu and Hang Chen]
venue: IEEE Transactions on Mobile Computing (TMC), 19(11), pp. 2533-2547, 2020.
year: 2020
track: Journal
topic: "Mobile Crowd Sensing"
tags: ["Mobile crowd sensing", "blind regression", "adaptive model updating", "outlier", "opportunistic sensing", "non-stationary"]
imageUrl: TMC2020-changshan.png
imageCaption: "Fig. 1. Illustration of Lotus used in mobile crowd sensing applications."
pdfUrl: TMC2020-changshan.pdf
---

In mobile crowd sensing (MCS) applications, a public model of a system is expected to be derived from observations collected by mobile device users, through regression modeling. For example, a model describing the relationship between running speed, heart rate, height, and weight of runner can be constructed using MCS data collected from wristbands. Unique features of MCS data bring regression new challenges. First, observations are error-prone and private, making it of great difficulty to derive an accurate model without acquiring raw data. Second, observations are nonstationary and opportunistically, calling for an adaptive model updating mechanism. Last, mobile devices are resource-constrained, posing an urgent demand for lightweight regression. We propose an adaptive and blind regression scheme. The core idea is first to select an optimal 'safe' subset of observations locally stored over all participants, such that the inconsistency between the subset and the corresponding regression model is minimized, and as many observations as possible are included. Then, based on the resulted regression model, more observations are checked and selected to refine the model. With observations constantly coming, newly selected 'safe' observations are used to make the model updated adaptively. To preserve data privacy, one-time pad masking and blocking scheme are integrated.
