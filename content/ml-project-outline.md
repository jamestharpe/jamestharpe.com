---
date: 2022-12-30T07:45:20-04:00
description: "An outline and checklist to guide typical machine learning projects"
tags: ["machine-learning", "project-management", "data-teams"]
title: "Machine Learning Project Outline"
---

# Machine Learning Project Outline

Use this [project](project-management.md) outline to document and organize the details of virtually any [machine learning](machine-learning.md) project. This outline will help clearly define the goals, tasks, resources, and timeline required for most machine leaning projects, while helping to ensure all the right questions have been asked.

## Create and record project goals

Goal and expectation setting is a crucial aspect of any project plan. Goals help define desired outcomes and serve as guides for decision making and resource allocation. By setting clear and specific goals, [data teams](data-teams.md) can stay focused and stakeholders can understand the anticipated activities required to achieve them.

Record answers to the following questions, review them with the team, and ensure they are easily accessible for future reference while the project is active:

- What is the projects objective in business terms?
- How will the solution be used?
- What are the current solutions (or workarounds) and how will the new solution be an improvement?
- What overall [type of machine learning](ml-types.md) will be most applicable to the solution (e.g. supervised/unsupervised, online/offline)
- How should performance be measured to align with the business objectives?
- What is the minimum performance needed to reach the business objective?
- What similar problems have already been solved? Can we re-use parts of those solutions?
- What would a manual solution look like?
- What assumptions are we operating on regarding the problem, solution, or approach? Which need to be verified?

## Establish the required role and responsibility assignments

Depending on the project size, a single person may fill multiple roles or a single role may be assigned to multiple individuals. Here are the roles for a typical machine learning project:

| Role                              | Responsibilities                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Product Owner or Business Analyst | Understand, document, and communicate the business problem that the machine learning project is trying to solve as well as the project's business goals and expectations. Identify and gather the necessary artifacts and for communicating the results of the project to stakeholders. Work with other team members to define, refine, negotiate, prioritize, and document the [requirements](requirements.md) and scope of the work required to build the solution and meet the business goals. |
| Project manager                   | Oversee the project to ensure it stays within the budget, timeline, and scope expectations. Create and document project plans, coordinate tasks, take point to remove project risks and roadblocks, provide status reports, and facilitate communication with stakeholders.                                                                                                                                                                                                                       |
| Data scientist                    | Design, implement, and document the machine learning model. Define and communicate the requirements for data selection and preprocessing. Evaluate the model's performance and fine-tune its hyperparameters.                                                                                                                                                                                                                                                                                     |
| Data engineer                     | Build and maintain the data pipelines, infrastructure, monitoring systems, and [system quality requirements](system-qualities.md) needed to support the machine learning project. Automate the extraction, transformation, and loading of data from various sources according to the requirements of the data scientists. Build, maintain, and [document](adrs.md) the [data storage and processing system](distributed-systems.md).                                                              |
| Quality assurance engineer        | Test and validate the machine learning model to ensure that it is functioning correctly and meets the project's requirements as defined by the product owner. Develop and execute test cases, report and track progress on all known issues.                                                                                                                                                                                                                                                      |

## Collect and validate raw data

High-quality data forms the foundation for building and training accurate machine learning models. Use this section to define and identify the initial data required to build the model.

Expand upon and delegate the following tasks to collect the required data:

- Document the required data, available data sources, and amount of data needed.
- Based on the data requirements, determine how much storage and compute resources will be needed. Verify availability and budgetary alignment.
- As required: Purchase licenses and create accounts to gain access to required data.
- If necessary, provision [cloud](cloud-platforms.md) resources with adequate storage and compute resources, preferably as a shared workspace.
- [ETL](etls.md) the raw data from each source into the workspace in a format that is easy to manipulate (e.g. Parquet), otherwise not changing the data its self. Automate this if data requires regular updates.
- Validate basic expectations about the loaded data: Type of data (time series, geographical, etc.), size, ranges (e.g. min and max dates in a time series)
- Sample and set aside a test dataset. Remove the sampled data from the source, and remove all access to the test dataset to ensure validation integrity.

## Explore raw data

[Exploring raw data](exploratory-data-analysis.md) before preparing it for a machine learning project is important because it helps to understand the characteristics of the data, identify any issues or patterns, and determine the appropriate preprocessing steps. By thoroughly understanding the raw data, teams can make informed decisions about how to best prepare it for modeling, which ultimately improves the performance of the resulting machine learning model.

Expand upon and delegate the following tasks to collect the required data:

- If necessary, create a sampled copy of the data for exploration
- Create a shared notebook (e.g. a Jupyter notebook) to record the results of the data exploration and put it under [version control](version-control.md).
- For each attribute of the data, document:
  - The attribute's name
  - A description of what the attribute represents
  - The attribute's [data type](statistical-data-types.md) (categorical, numeric, text, etc.)
  - The percentage of missing values for the attribute
  - Noisiness and type of noise (stochastic, outliers, etc.) associated with the attribute
  - The attribute's distribution (gaussian, uniform, logarithmic, etc.)
  - Why the attribute will or will not be useful to the model
  - Correlations between this and the other attributes
  - For [supervised learning models](ml-supervised.md): Identify whether the attribute is a predictive target or not
- [Visualize](data-visualizations.md) the data to illustrate trends, relationships, correlations, and distributions in the data
- Document a high-level description of how the problem can be solved manually and the approximate level of effort, if the level of effort is low enough, create a complete example of a manual solution
- Identify and document transformations that may be useful for model training and further analysis and why they would be useful
- Identify and document additional data that may be useful that was previously unidentified (see **collect and validate raw data**, above) and how it could be used
- Identify and document any data that is unlikely to be useful to build the solution and why it should be discarded
- When the team is comfortable with their findings, consolidate them into the shared notebook and present summarized findings to stakeholders

## Data preparation

The quality of the data used in machine learning directly impacts the performance of the resulting model, so it is important to carefully select and pre-process the data once it is well understood to ensure it is representative of the problem being solved and free from errors or biases.

Expand upon and delegate the following automation tasks to collect the required data. If your working with a separate [data engineering](data-engineering.md) team, these tasks likely are best suited for that team to ensure efficiency, reusability, and long-term operational stability.

- Drop any data determined to be unnecessary for the solution (but keep an original, unaltered copy of all data)
- Write functions to automate the transformations previously identified as useful (see **explore raw data**, above) so that new data can be easily prepared, code can be reused in future projects, and preparation steps can be treated as hyperparameters
- Remove or replace outliers as needed
- Fill in missing values (e.g. with median values) or remove rows/columns with excessive missing values
- Discretize continuous features
- Decompose complex features (e.g. categorical values, dates and times, structured objects, etc.)
- Create aggregate features
- Standardize/normalize final feature set

## Prioritize models

Trying several different model types is important in machine learning because with multiple model types, teams can determine which model is most effective at solving the specific problem at hand. This can ultimately lead to a better performing and more accurate model.

Expand upon and delegate the following tasks to collect the required data, automating where it makes sense:

- If necessary for scale, create smaller sampled training datasets to reduce training times across multiple candidate models. Note any risks associated with sampling (i.e. more complex models, such as large neural networks, can be significantly penalized if the dataset is too small) and how they will be mitigated.
- Train multiple multiple models using standard parameters
- Compare and document the relative performance of each model using N-fold cross-validation and compute the [mean](averages.md) and [standard deviation](standard-deviation.md) of the performance measure on the N folds.
- Find and document the impact of the most significant variable for each model algorithm
- Analyze the types of errors each model makes and note how a human would avoid them
- Repeat the above steps several times, with a short round of feature selection and engineering between each iteration
- Document the top three to five models that show the most promise, preferring models that make different types of errors

## Refine the solution

Refining a machine learning model can significantly improve the model's performance and the accuracy of predicted outcomes. By carefully selecting and adjusting the model's hyperparameters, using ensemble methods, and cross-validating results, teams can create a model that is optimized for the specific problem at hand and has the best possible performance.

Expand upon and delegate the following automation tasks to collect the required data, automating where it makes sense:

- Using as much data as possible, use cross-validation fine-tune the hyperparameters, treating questionable data transformation choices (e.g. where the team is unsure about whether it's better to replace or drop missing values) as hyperparameters
- Experiment with ensemble methods to combine the best models to produce an overall better model
- Once the team is confident in the model, test it against the test dataset that was withheld initially (see **collect and validate raw data**, above), measuring and documenting performance against the test dataset to estimate the generalization error

## Present the solution

As with any project, the final deliverable should be demonstrated and key decisions should be explained to stakeholders prior to going fully into production. The lead members of the project team should collaborate on the following steps:

- Organize and finalize the documentation
- Create and script the presentation (e.g. a slide show), making copious use of visualizations, roughly following this outline:
  - Review the business goals and expectations for the project, noting any changes or compromises
  - Provide a high level description of the solution, including its limitations
  - Review key discoveries about the data
  - Review key decisions made about the solution (what worked and what didn't)
  - Live or pre-recorded demonstration of the solution
  - Relate the solution to the business goals and expectations, noting future potential improvements
  - Acknowledgements of the team and others who supported the project
  - Time for questions

## Deploy the solution

Having a deployment and maintenance plan in place for a new machine learning model ensures that the model is effectively integrated into the system it was designed for and that it will continue to function effectively over time.

Work as a team to follow these steps:

- Copy the code to the production system
- Connect production data to the deployed production model
- Setup monitoring and alerts for performance and anomalous/unexpected results
- Setup monitoring for input quality, this is especially important for [online learning systems](ml-online-learning.md)
- Have a maintenance plan in place to address issues as they arise and prevent model degradation through regular retraining
