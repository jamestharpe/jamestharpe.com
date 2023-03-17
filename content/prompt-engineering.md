---
date: 2023-03-17T14:59:52-04:00
description: "The art of guiding AI language models"
tags: ["chatgpt"]
title: "Prompt Engineering"
---

# Prompt engineering

**Prompt engineering** is a set of technique used to improve performance and control behavior of language-based AI models like [ChatGPT](chatgpt.md) and DALL·E. It involves designing and refining input queries or prompts to obtain more accurate, relevant, or useful responses as well as avoid issues like incoherent or unintended responses.

The process of prompt engineering typically includes the following steps:

1. Define the objective: Clearly outline the goal of the specific output you want the AI model to generate.
2. Craft an initial prompt: Develop a question or statement to achieve the objective. This can involve providing context, specifying the desired format of the response, or using examples to guide the model.
3. Test and iterate: Submit the initial prompt and evaluate the response. Identify areas for improvement and refine the prompt accordingly. Repeat this process until you get the desired output. In some cases, it can be necessary to include additional information or context within the prompt by providing relevant background information or specifying certain constraints.
4. Refine the prompt for length and complexity: Look for ways to simplify and shorten the prompt by simplifying the language, removing excess context, and eliminating redundant information. Test and iterate on this step as well.

## Meta-prompt engineering, an example

**Meta-prompt engineering** is the act of guiding a language-based AI model through performing the steps of prompt engineering its self. Let's say we want ChatGPT to assist with [software development](software-engineering.md); however, each time we try, the responses we get are overly broad or don't account for all the requirements as we intended.

Here's a quick example using ChatGPT-4, with virtually no prompt engineering:

> **James:**
>
> Write a to-do list app using JavaScript
>
> **ChatGPT:**
>
> Here's a simple to-do list app using HTML, CSS, and JavaScript. You can copy the code and save it as an HTML file and open it in your browser to see it in action.
>
> ```html
> <!DOCTYPE html>
> <html lang="en">
> <head>
>     <meta charset="UTF-8">
>     <meta name="viewport" content="width=device-width, initial-scale=1.0">
>     <title>Simple To-Do List App</title>
>     <style>
>         body { font-family: Arial, sans-serif; }
>         #newTask { padding: 10px; }
>         ul { list-style-type: none; padding: 0; }
>         li { padding: 10px; background-color: #f1f1f1; margin-bottom: 5px; }
>     </style>
> </head>
> <body>
>     <h1>Simple To-Do List App</h1>
>     <input type="text" id="newTask" placeholder="Add new task">
>     <button onclick="addTask()">Add Task</button>
>     <ul id="taskList"></ul>
>     <script>
>         function addTask() {
>             let taskList = document.getElementById("taskList");
>             let newTaskInput = document.getElementById("newTask");
>             let newTaskText = newTaskInput.value.trim();
> 
>             if (newTaskText === "") {
>                 alert("Please enter a task.");
>                 return;
>             }
> 
>             let newTask = document.createElement("li");
>             newTask.innerText = newTaskText;
>             newTask.onclick = function() {
>                 this.classList.toggle("completed");
>             };
>             newTask.ondblclick = function() {
>                 this.remove();
>             };
>             taskList.appendChild(newTask);
>             newTaskInput.value = "";
>         }
>     </script>
> </body>
> </html>
> ```

Though the output seems accurate, it didn't account for any of the features I wanted like requiring a login or being able to define predecessor/successor tasks. Rather than try to engineer a better prompt, let's use meta prompt engineering to coax ChatGPT into walking us through the process of developing virtually any software application.

### Step 1: Define the objective

Here's my objective: I want to be able to give a simple description of an application to ChatGPT and, in return, receive guidance on how to build the app step-by-step, including any features I left out of the initial description.

### Step 2: Craft an initial prompt

> **James:**
>
> Act as a prompt engineer and guide me to create a detailed prompt that I can use with ChatGPT so that it will act as an AI-powered software development assistant.
>
> **ChatGPT:**
>
> To create a detailed prompt for ChatGPT to act as an AI-powered software development assistant, consider the following guidelines:
>
> 1. Specify your desired role for ChatGPT: Clearly mention that you want ChatGPT to act as a software development assistant, helping with tasks such as programming, debugging, or offering suggestions.
> 2. State your programming language: Clearly mention the programming language you are working with, as this will help ChatGPT provide accurate and relevant assistance.
> 3. Describe your project or task: Give a brief overview of your project or the specific task you need help with. This will help ChatGPT understand the context and >provide appropriate suggestions.
> 4. Ask a specific question or request: Clearly state the question or request you have for ChatGPT, such as troubleshooting an issue, suggesting a new feature, or >offering advice on best practices.
> 5. Provide any necessary code snippets or examples: If your question or request is related to code, include relevant code snippets or examples to help ChatGPT >better understand the issue.
>
> Here's a sample prompt you can use as a starting point:
>
> "Hi ChatGPT, I'd like you to be my AI-powered software development assistant for a project I'm working on. I am using Python and my project is a web application that uses the Flask framework. I'm having trouble implementing user authentication. Here's my current code snippet for the login function:
>
> ```python
> Copy code
> @app.route('/login', methods=['GET', 'POST'])
> def login():
>    if request.method == 'POST':
>        username = request.form['username']
>        password = request.form['password']
>        # Authentication logic here
>
>    return render_template('login.html')
> ```
>
> Could you please guide me on how to implement user authentication using Flask-Security or suggest another secure method to authenticate users? Additionally, if you have any best practices or tips for structuring the application, please let me know."
>
> Feel free to modify the sample prompt based on your specific needs and context.

ChatGPT uncovered some good points, but we're looking for something more generalized, so let's continue the conversation:

> **James:**
>
>How does this look?
>
>"I want you to act as an AI-powered software development assistant to help with tasks such as requirements gathering, programming, debugging, and deployment.  >You will prompt be for the application name and a high-level description of the type of application (for example: a to-do list app, a game, a chat bot). Next, >you will suggest a list of features and ask me to provide a list of features. Then you will suggest some programming languages (for example: python or >JavaScript) appropriate for the application and allow me to choose one. Next, you will guide me step-by-step through the development of the application. >Throughout development, you will suggest new features and ask me for suggestions of new features. Once I am satisfied with the application, you will provide >instructions on how to deploy it."
>
> **ChatGPT:**
>
>Your prompt looks good and provides a clear outline of the tasks you want the AI-powered software development assistant to help with. However, the prompt seems to be more of an instruction set than a question or request. You can start by asking a question to initiate the conversation and then follow up with more questions as the conversation progresses. Here's a modified version of your prompt:
>
>"Hi ChatGPT, please act as my AI-powered software development assistant, helping me with tasks such as requirements gathering, programming, debugging, and deployment. First, can you prompt me for the application name and a high-level description of the type of application (e.g., a to-do list app, a game, a chatbot)? Once we have that, we can discuss the features and programming languages appropriate for the application, and then you can guide me step-by-step through the development process."
>
> By starting with a question, you engage ChatGPT in a more conversational manner, allowing you to build on the discussion and ask follow-up questions as needed. This approach will also enable you to receive more targeted and specific guidance from ChatGPT throughout the development process.

ChatGPT's response seems well reasoned, so we have our initial prompt!

### Step 3: Test and iterate

Let's try to build a to-do list app again, but prime ChatGPT with the prompt we came up with using ChatGPT as our prompt engineer. The resulting conversation I had with ChatGPT was long, so I won't include it here, but I'll summarize some of the issues:

* It was more wordy than it needed to be
* It chose a framework for me ([React](react.md)), rather than helping me make a choice
* It gave a few detailed initial steps (e.g. "run `npm instal ...`"), followed by several high-level steps (e.g. "deploy the app") that lacked detail, rather than guiding me step-by-step.

Let's try again by putting that feedback back into the Prompt Engineering session of ChatGPT. After a little back-and-forth, I ended up with this prompt:

> Hi ChatGPT, please act as my AI-powered software development assistant, helping me make informed decisions throughout the development process including requirements gathering, programming, debugging, and deployment. First, can you prompt me for the application name and a high-level description of the type of application (e.g., a to-do list app, a game, a chatbot)? Once we have that, we can discuss the features and programming languages appropriate for the application and you can help me choose an appropriate framework for development. After the features are defined, programming language is selected, and the framework is chosen, you can provide a high-level plan for development. After I provide feedback on the plan, you can guide me step-by-step through development of the application. When you prompt me, please focus on brevity.

This iteration resulted in less wordy responses, but actually combined almost all the steps into a single prompt! It looks like ChatGPT is queuing off sentence structure, so rather than give it feedback, I'm just going to break up my prompt into more sentences:

> Hi ChatGPT, please act as my AI-powered software development assistant, helping me make informed decisions throughout the development process including requirements gathering, programming, debugging, and deployment. First, can you prompt me for the application name and a high-level description of the type of application (e.g., a to-do list app, a game, a chatbot)? Once we have that, suggest some features and get my feedback on what to add or remove. Once you know the features, please prompt me to help me choose a programming language appropriate for the application. Based on the programming language I select, you can then prompt me to choose appropriate frameworks for development. After the features are defined, programming language is selected, and the framework is chosen, you can provide a high-level plan for development. After I provide feedback on the plan, you can guide me step-by-step through development of the application. When you prompt me, please focus on brevity.

After this, the results were much better! However, at this point I realized that I want ChatGPT to use [test driven development](test-driven-development.md), so I made one more update:

> Hi ChatGPT, please act as my AI-powered software development assistant, helping me make informed decisions throughout the development process including requirements gathering, programming, debugging, and deployment. First, can you prompt me for the application name and a high-level description of the type of application (e.g., a to-do list app, a game, a chatbot)? Once we have that, suggest some features and get my feedback on what to add or remove. Once you know the features, please prompt me to help me choose a programming language appropriate for the application. Based on the programming language I select, you can then prompt me to choose appropriate frameworks for development. After the features are defined, programming language is selected, and the framework is chosen, you can provide a high-level plan for development. After I provide feedback on the plan, you can guide me step-by-step through development of the application using test driven development. When you prompt me, please focus on brevity.

For whatever reason, ChatGPT did not follow test driven development, so I got a little more explicit:

> Hi ChatGPT, please act as my AI-powered software development assistant, helping me make informed decisions throughout the development process including requirements gathering, programming, debugging, and deployment. First, can you prompt me for the application name and a high-level description of the type of application (e.g., a to-do list app, a game, a chatbot)? Once we have that, suggest some features and get my feedback on what to add or remove. Once you know the features, please prompt me to help me choose a programming language appropriate for the application. Based on the programming language I select, you can then prompt me to choose appropriate frameworks for development. After the features are defined, programming language is selected, and the framework is chosen, you can provide a high-level plan for development. After I provide feedback on the plan, you can guide me step-by-step through development of the application using test driven development, meaning we'll code the tests before we code the features. When you prompt me, please focus on brevity.

At this point, the prompt is working really well! After putting this prompt into ChatGPT, it will prompt us for information about the app, suggest features, elaborate when we have questions, and walk us through writing code step-by-step. ChatGPT still doesn't seem to understand Test Driven Development, so I'm going to leave solving that issue for another day.

### Step 4: Refine the prompt for length and complexity

At this point our prompt is working well, but it's very long and somewhat complex. Let's trim it down a little bit at a time, testing at each step.

We'll start by removing the niceties:

> Act as my AI-powered software development assistant, helping me make informed decisions throughout the development process including requirements gathering, programming, debugging, and deployment. First, can you prompt me for the application name and a high-level description of the type of application (e.g., a to-do list app, a game, a chatbot)? Once we have that, suggest some features and get my feedback on what to add or remove. Once you know the features, prompt me to help me choose a programming language appropriate for the application. Based on the programming language I select, you can then prompt me to choose appropriate frameworks for development. After the features are defined, programming language is selected, and the framework is chosen, you can provide a high-level plan for development. After I provide feedback on the plan, you can guide me step-by-step through development of the application using test driven development, meaning we'll code the tests before we code the features. When you prompt me, please focus on brevity.

That didn't seem to change the behavior, so let's try removing a little bit more by removing redundant instructions:

> Act as my software development assistant, helping me make informed decisions throughout the development process including requirements gathering, programming, debugging, and deployment. First, can you prompt me for the application name and a high-level description of the type of application (e.g., a to-do list app, a game, a chatbot)? Once we have that, suggest some features and get my feedback on what to add or remove. Once you know the features, prompt me to help me choose a programming language appropriate for the application. Based on the programming language I select, you can then prompt me to choose appropriate frameworks for development. After that, you can provide a high-level plan for development. After I provide feedback on the plan, you can guide me step-by-step through development of the application using test driven development, meaning we'll code the tests before we code the features. When you prompt me, please focus on brevity.

It worked great! Maybe we can get simplify it a little further by editing the grammar for succinctness:

> Act as my software development assistant to help me make informed decisions throughout the development process including requirements gathering, programming, debugging, and deployment. First, prompt me for the application name and a high-level description of the type of application (e.g., a to-do list app, a game, a chatbot). Next, suggest features and get my feedback on what to add or remove. Then prompt me to choose a programming language appropriate for the application. Next, prompt me to choose appropriate frameworks for development. After that, provide a high-level plan for development. After I provide feedback on the plan, guide me step-by-step through development of the application using test driven development, meaning we'll code the tests before we code the features. Focus on brevity when you prompt me.

After another round of testing, the prompt worked great for several scenarios! Here are the scenarios I tested with:

* A to-do list web app with Next.js and using IndexDB to avoid having to deploy a database
* A Blackjack app written in Angular
* A TikTok clone

Though I didn't build the apps through to completion, the plans, frameworks, and code all looked promising. I'm confident that by using this meta prompt engineered prompt, that virtually anyone can build an app quicker than ever!
