window.fantasyExample = {
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
  };
  
  window.foodExample = {
    survey: [
      {
        id: "1",
        title: "Did you eat any of the following vegetables today",
        choices: ["no veggies", "broccoli", "cabbage", "carrot"],
        condition: null,
      },
      {
        id: "2",
        title: "Did you eat any of the following fruits today",
        choices: ["no fruits", "apple", "banana", "pineapple"],
        condition: null,
      },
      {
        id: "3",
        title: "Congrats on being healthy, what prize do you want",
        choices: ["a firm handshake", "a pat on the back", "money"],
        condition: {
          type: "AND",
          subconditions: [
            {
              type: "OR",
              subconditions: [
                {
                  questionId: "1",
                  choice: "broccoli",
                },
                {
                  questionId: "1",
                  choice: "cabbage",
                },
                {
                  questionId: "1",
                  choice: "carrot",
                },
              ],
            },
            {
              type: "OR",
              subconditions: [
                {
                  questionId: "2",
                  choice: "apple",
                },
                {
                  questionId: "1",
                  choice: "banana",
                },
                {
                  questionId: "1",
                  choice: "pineapple",
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
          { questionId: "1", choice: "no veggies" },
          { questionId: "2", choice: "no fruits" },
        ],
      },
      {
        expected: "valid",
        responses: [
          { questionId: "1", choice: "carrot" },
          { questionId: "2", choice: "apple" },
          { questionId: "3", choice: "money" },
        ],
      },
      {
        expected: "valid",
        responses: [
          { questionId: "1", choice: "no veggies" },
          { questionId: "2", choice: "apple" },
        ],
      },
      {
        expected: "valid",
        responses: [
          { questionId: "1", choice: "carrot" },
          { questionId: "2", choice: "no fruits" },
        ],
      },
      {
        expected: "invalid",
        responses: [
          { questionId: "1", choice: "carrot" },
          { questionId: "2", choice: "no fruits" },
          { questionId: "3", choice: "money" },
        ],
      },
    ],
  };
  