---
title: "Lotus: Evolutionary Blind Regression over Noisy Crowdsourced Data"
authors: [Chao Li, Shan Chang, Hongzi Zhu, Hang Chen and Ting Lu]
venue: in Proceedings of IEEE SECON 2018
year: 2018
track: Conference
topic: "Mobile Crowd Sensing"
location: "Hong Kong, China"
tags: ["mobile crowd sensing", "blind regression", "model evolution", "outlier", "opportunistic sensing", "non-stationary"]
award: "Best Paper Award Runner-up"
imageUrl: SECON2018(Hong Kong, China)-lichao.png
imageCaption: "Fig. 2. Overview of Lotus."
pdfUrl: SECON2018(Hong Kong, China)-lichao.pdf
---

In mobile crowd sensing (MCS) applications, a public model of a system or phenomenon is expected to be derived from sensory data, i.e., observations, collected by mobile device users, through regression modeling. Unique features of MCS data bring the regression task new challenges. First, observations are error-prone and private, making it of great difficulty to derive an accurate model without acquiring raw data. Second, observations are non-stationary and opportunistically generated, calling for an evolutionary model updating mechanism. Last, mobile devices are resource-constrained, posing an urgent demand for lightweight regression schemes. In this paper, we propose an evolutionary blind regression scheme, called Lotus, in MCS settings. The core idea is first to select a 'maximum-safe-subset' of observations locally stored over all participants, which refers to finding a subset containing half of observations, such that the corresponding regression model has a minimum value of residual sum of squares. It implies the inconsistency between observations in the subset is minimized. Since such a maximum-safe-subset selection problem is NP-hard, a distributed greedy hill-climbing algorithm is proposed. Then, based on the resulted regression model, more observations are checked. Selected ones will be used to refine the model. With observations constantly coming, newly selected 'safe' observations are used to make the model evolved. To preserve data privacy, a one-time pad masking mechanism, and a blocking scheme are integrated into the process of regression estimation. Intensive theoretical analysis and extensive trace-driven simulations are conducted and the results demonstrate the efficacy of the Lotus design.
