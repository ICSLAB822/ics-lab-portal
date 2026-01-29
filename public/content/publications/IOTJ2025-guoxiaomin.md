---
title: "Cog-EEG: Early Detection of Cerebrovascular Patients With Cognitive Impairment Using EEG"
authors: [Xiaomin Guo, Luting Shen, Lan Li, Shan Chang, Zongwei Liu and Yang Shi]
venue: "IEEE Internet of Things Journal (IOT-J), 12(10), pp. 13870-13880, 2025."
year: 2025
track: Journal
topic: "Healthcare IoT"
tags: ["Cerebrovascular", "cognitive impairment", "cross wavelet transform (XWT)", "functional connectivity matrix", "low-density electroencephalogram (EEG) signal"]
imageUrl: IOTJ2025-guoxiaomin.png
imageCaption: "Fig. 5. Source localization."
pdfUrl: IOTJ2025-guoxiaomin.pdf
award: ""
doi: "10.1109/JIOT.2025.3525654"
---

The cognitive impairment caused by cerebrovascular disease is one of the most common causes of dementia in the elders. Cerebrovascular diseases are traditionally diagnosed by neuroimaging techniques, e.g., magnetic resonance imaging, which are however high-priced and can only identify the structural change of cerebral vessels. Questionnaire form-based diagnosis, e.g., mini-mental state examination (MMSE) or cognitive assessment (MoCA), is commonly used to discover cognition impairment, however subjective, highly relying on the experience of doctors. Electroencephalogram (EEG) waveform changes with physiological conditions and it is closely related to cognitive, so it is promising to identify cerebrovascular disease. In this work, we propose an EEG-based diagnosis approach, Cog-EEG, to distinguish between healthy people, cerebrovascular patients with and without cognitive impairment, effectively, which contains the following key designs. First, after preprocessing of EEG signals (i.e., electrode positioning, re-reference, filtering, segmentation, and independent component analysis), Cog-EEG exploits weighted minimum norm estimation to enable source localization with low-density (i.e., 19 channels) EEG signals, and then the recovered source signals are analyzed in time–frequency domain. Second, Cog-EEG conducts cross wavelet transform between brain regions, and extracts the corresponding functional connectivity matrices between them. Third, the functional connectivity matrices are utilized as key features and fed into a classifier for prediction. We collect an EEG signals dataset of 78 subjects, among whom 19 are healthy, 30 are cerebrovascular patients with cognitive impairment, and the rest are cerebrovascular patients without cognitive impairment. Experimental results demonstrate that Cog-EEG can achieve a classification accuracy of 96.7%.
