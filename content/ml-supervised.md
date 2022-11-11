---
date: 2022-11-03T17:02:20-04:00
description: "Machine learning that uses pre-labeled input as training data"
tags: [ "machine-learning" ]
title: "Supervised Machine Learning"
---

# Supervised machine learning

**Supervised machine learning** is a type of [machine learning](machine-learning.md) in which the input is pre-labeled with the output to be predicted by the model. Supervised learning consists of [classification learning](ml-supervised-classification-learning.md), which predict qualitative/categorical values, and [regression learning](ml-supervised-regression-learning.md), which predict continuous values.

<!-- There are three types of datasets involved in training a model using supervised learning:

* The **training dataset** consists of the input plus the pre-labeled outcomes and is used to train the model.
* The **validation dataset** consists of the input plus pre-labeled outcomes and is explicitly withed from the model so that the models output can be compared with the validation dataset to determine the model's accuracy when evaluating unseen data.
* The **testing dataset** -->

## Supervised learning model evaluation

Typically, when a supervised machine learning model is trained, some portion of the training data is withheld for use in model evaluation.

The model is then used to predict the withheld data. The predictions are then compared to the actual values to derive an **accuracy rate**, which represents the overall accuracy of the model, and an **error rate** which represents the number of "bad" predictions made by the model.

Accuracy and error rates are useful; however, they treat all misclassifications as being equally bad. A **confusion matrix** plots the misclassifications to provide more detail on model accuracy.

For example, we may have a classification model that predicts whether a user will "like" or "dislike" a post on social media in which the model accurately predicts the user's input 60% of the time. The model therefore has a 60% accuracy rate and a 40% error rate. The confusion matrix for this model might look something like the following table, illustrating that the model performs better for predicting "dislike" classes than "like" classes.

<table>
	<tr>
		<td rowspan="2" colspan="3"></td>
		<th colspan="2">Predicted class</th>
	</tr>
	<tr>
		<td>Like</td>
		<td>Dislike</td>
	</tr>
	<tr>
		<th rowspan="2" colspan="2">Actual class</th>
		<td>Like</td>
		<td>3</td>
		<td>1</td>
	</tr>
	<tr>
		<td>Dislike</td>
		<td>3</td>
		<td>3</td>
	</tr>
	<tr>
		<th colspan="3">Accuracy</th>
		<td>50%</td>
		<td>75%</td>
	</tr>
</table>
