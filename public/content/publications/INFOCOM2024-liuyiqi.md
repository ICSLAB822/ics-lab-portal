---
title: "FairFed: Improving Fairness and Efficiency of Contribution Evaluation in Federated Learning via Cooperative Shapley Value"
authors: [Yiqi Liu, Shan Chang, Ye Liu, Bo Li and Cong Wang]
venue: "in Proceedings of IEEE INFOCOM 2024"
location: "Vancouver, Canada"
year: 2024
track: Conference
topic: "Federated Learning"
tags: ["federated learning", "contribution evaluation", "Shapley value", "fairness"]
imageUrl: INFOCOM2024-liuyiqi.png
imageCaption: "Fig. 1. Procedure of FairFed in round t."
pdfUrl: INFOCOM2024-liuyiqi.pdf
award: ""
doi: "10.1109/INFOCOM52122.2024.10621438"
---

The quality of federated learning (FL) is highly correlated with the number and quality of the participants involved. It is essential to design proper contribution evaluation mechanisms. Shapley Value (SV)-based techniques have been widely used to provide fair contribution evaluation. Existing approaches, however, do not support dynamic participants (e.g., joining and departure) and incur significant computation costs, making them difficult to apply in practice. Worse, participants may be incorrectly valued as negative contribution under the Non-IID data scenarios, further jeopardizing fairness. In this work, we propose FairFed to address the above challenges. First, given that each iteration is of equal importance, FairFed treats FL as Multiple Single-stage Cooperative Games, and evaluates participants by each iteration for effectively coping with dynamic participants and ensuring fairness across iterations. Second, we introduce Cooperative Shapley Value (CSV) to rectify negative values of participants to improving the fairness while preserving true negative values. Third, we prove if participants are Strategically Equivalent, the number of participant combinations can be sharply reduced from exponential to polynomial, thus significantly reducing the computational complexity of CSV. Experimental results show that FairFed achieves up to 25.3× speedup and reduces deviations by three orders of magnitude to two state-of-the-art approximation approaches.
