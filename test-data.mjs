export const samplesurveydata = {
  fantasyExample : {
    survey: [
      {
        id: "1",
        title: "Where do you live?",
        choices: ["US", "Canada"],
        condition: null,
      },
      {
        id: "2",
        title: "Are you older than 18?",
        choices: ["Yes", "No"],
        condition: null,
      },
      {
        id: "3",
        title: "Do you like vampires?",
        choices: ["Yes", "No"],
        condition: null,
      },
      {
        id: "4",
        title: "What province do you live in",
        choices: ["British Columbia", "Alberta"],
        condition: {
          type: "AND",
          subconditions: [
            {
              questionId: "1",
              choice: "Canada",
            },
          ],
        },
      },
      {
        id: "5",
        title: "Would you like to join our fantasy meet-up email list?",
        choices: ["Yes", "No"],
        // This question should be responseed if:
        // (They are in the US AND over 18) OR
        // (They like vampires)
        condition: {
          type: "OR",
          subconditions: [
            {
              type: "AND",
              subconditions: [
                {
                  questionId: "1",
                  choice: "US",
                },
                {
                  questionId: "2",
                  choice: "Yes",
                },
              ],
            },
            {
              type: "AND",
              subconditions: [
                {
                  questionId: "3",
                  choice: "Yes",
                },
              ],
            },
          ],
        },
      },
    ],
    responsesSets: [
      {
        expected: "valid",
        responses: [
          { questionId: "1", choice: "US" },
          { questionId: "2", choice: "No" },
          { questionId: "3", choice: "Yes" },
          { questionId: "5", choice: "Yes" },
        ],
      },
      {
        expected: "valid",
        responses: [
          { questionId: "1", choice: "US" },
          { questionId: "2", choice: "No" },
          { questionId: "3", choice: "No" },
        ],
      },
      {
        expected: "invalid",
        responses: [
          { questionId: "1", choice: "US" },
          { questionId: "2", choice: "Yes" },
          { questionId: "3", choice: "Yes" },
        ],
      },
      {
        expected: "invalid",
        responses: [
          { questionId: "1", choice: "US" },
          { questionId: "2", choice: "Yes" },
          { questionId: "3", choice: "No" },
          { questionId: "4", choice: "Alberta" },
        ],
      },
    ],
  },
}