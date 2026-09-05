---
title: "OptiCloak: Blinding Vision-Based Autonomous Driving Systems Through Adversarial Optical Projection"
authors: [Huixiang Wen, Shan Chang, Luo Zhou, Wei Liu and Hongzi Zhu]
venue: IEEE INTERNET OF THINGS JOURNAL (IoT-J), 11(17), pp. 28931-28944, 2024.
year: 2024
track: Journal
tags: [Autonomous driving, black-box, light projection attack, object detection, physical-world attack]
imageUrl: iot2024-wenhuixiang.png
imageCaption: "Fig. 1. Example of light projection-based attack."
pdfUrl: iot2024-wenhuixiang.pdf
---

Studies have proven that applying patch stickers generated through adversarial training to target objects can effectively deceive classifiers or target detectors. These "Print-and-paste" adversarial attacks however have three shortcomings. First, touching the target object physically is required, which may be infeasible in practice. Second, stickers might be taken as evidence to identify the attackers. Third, the attack effect decreases significantly in poor light, especially at long distances. To overcome above limitations, we introduce OptiCloak, a car vanishing attack, which fools the object detector (OD) of a vision-based autonomous driving systems with transient projection pattern. We establish three digital-to-physical mapping models to compensate the distortions caused by perspective deformation, double image, and partial light reflection in real world. Furthermore, to avoid adversarial functionality degeneration caused by the loss of patch details in long-range attacks, we utilize MeanShift Filtering to constrain the "resolution" of pixels in a patch during training. We propose a gradient-free patch updating (GPU) approach, which utilizes ZO-AdaMM to approximate gradients and model parameters through the confidence scores of OD, making OptiCloak can work well in both the white-box and black-box scenarios. We deploy OptiCloak in real-world driving scenarios, and the extensive experimental results demonstrate that the OptiCloak achieves similar attack success rates (ASRs) as printed patches in bright environments, while significantly improving the attack performance in gloomy environments. This effect is validated across all settings, including different angles, imaging devices, and film transparency rates. In black-box settings, the average ASR can reach 71%, with a maximum attack distance of approximately 10 m.