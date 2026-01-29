---
title: "Understanding Distributed Poisoning Attack in Federated Learning"
authors: [Di Cao, Shan Chang, Zhijian Lin, Guohua Liu and Donghong Sun]
venue: "in Proceedings of IEEE ICPADS 2019"
location: "Tianjin, China"
year: 2019
track: Conference
topic: "Federated Learning"
tags: ["federated learning", "distributed poisoning attack", "defense", "attack success rate", "label-flipping"]
imageUrl: ICPADS2019-caodi.png
imageCaption: "Fig. 1: The federated learning system architecture. The clients train models locally and share local model parameters to a server. The server aggregates model parameters of all clients, and then broadcasts the new global model to all clients."
pdfUrl: ICPADS2019-caodi.pdf
award: ""
doi: "10.1109/ICPADS47876.2019.00042"
---

Federated learning is inherently vulnerable to poisoning attacks, since no training samples will be released to and checked by trustworthy authority. Poisoning attacks are widely investigated in centralized learning paradigm, however distributed poisoning attacks, in which more than one attacker colludes with each other, and injects malicious training samples into local models of their own, may result in a greater catastrophe in federated learning intuitively. In this paper, through real implementation of a federated learning system and distributed poisoning attacks, we obtain several observations about the relations between the number of poisoned training samples, attackers, and attack success rate. Moreover, we propose a scheme, Sniper, to eliminate poisoned local models from malicious participants during training. Sniper identifies benign local models by solving a maximum clique problem, and suspected (poisoned) local models will be ignored during global model updating. Experimental results demonstrate the efficacy of Sniper. The attack success rates are reduced to around 2% even a third of participants are attackers.
