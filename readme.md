# Polco Take Home Problem

## Problem Overview

At Polco, questions in our surveys can be “conditional”. This means that some questions are only shown to users if they select certain choices on other questions.

For example, a respondent may only see the question "How would you rate the condition of Lafayette Park?" if they respond "Yes" to the question "Have you been to Lafayette Park?"

On Polco, responses to all questions are submitted at the end of the survey, not question-by-question. When a user clicks the final "Submit" button, we have to make sure that the user provided responses to all the questions that were displayed to them. This means for each user, we must know which subset of all survey questions they were shown and whether they submitted a response to each question in that subset.

## Task

Your task is to implement the function `areResponsesValid` in **index.js**.

This function takes:

1. An array of all questions in the survey (`questions`) and
2. An array of a user's submitted responses to that survey (`responses`).

The function should return a boolean representing whether or not the submitted set of responses is valid. In this context, valid means:

1. Every question displayed to the user has a corresponding submitted response in the `responses` array
2. Every question not displayed to the user is not included in the `responses` array

## Data Shapes

These are the provided data model shapes.
Feel free to adapt them if you think it would result in a better implementation.

### Questions

```
Question: {
  id: string;
  title: string;
  choices: string[];
  condition: ConditionGroup | null
}
```

### Responses

```
Response: {
  questionId: string;
  choice: string;
}
```

### Conditions

```
ConditionGroup: {
  // If the `type` is "AND", then all the subconditions must be true.
  // If the `type` is "OR", then one or more of the subconditions must be true.
  conditionType: 'AND' | 'OR';
  subconditions: (ConditionGroup | Condition)[] | null;
}
```

```
Condition: {
  questionId: string
  choice: string
}
```

## Testing

Included in this repository is a basic environment that you can use to test your code. The provided `data.js` file contains sample questions, conditions, and responses. There are 2 example surveys and some example responses in `data.js` - some valid, some not.

While implementing the `areResponsesValid` function in `index.js`, you can open the provided `test.html` file in your browser. In there you will see the expected result for each case in Column 2 and the current result of your function in Column 3.

We provide these examples for quick testing, but your solution should work against any survey with any set of conditions.

## Getting Started and Submitting Your Code

To get started, fork this repository or [use it as template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) in order to create a new repository for your solution.

Once you have finished working on the problem, send a link to your repository back to our team.

Good luck - we can't wait to see what you come up with!
