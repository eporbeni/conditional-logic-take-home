//This implementation approach seeks to:

//Grab given survey and responses
//Process Questions to derive conditionalQuestions and unconditionalQuestions
//Process Conditional Questions to derive array of conditions to check 
//Process Responses to derive valid questions for user
//Process Responses to derive actual answers for user
//Compare - if the number of questions answered matches the valid number of questions and all were answered return true (valid), otherwise return false (invalid)

//This implementation fails to achieve accurate results for any survey
//Either of two approaches might work to make this implementation successful:
//1. The array of conditionsToCheck might be compiled in such a way as to make conditions 
//  a composite with related subconditions via And/Or dependencies.
//2. Find a better way to compare actual answers against conditionsToCheck using 
//  the details in each condition to check its And/Or dependencies.

import { fantasyExample } from './test-data.js';
import { foodExample } from './test-data.js';

let desiredTestData = fantasyExample;
//let desiredTestData = foodExample;

const unconditionalQuestions = [];
const conditionalQuestions = [];
const conditionsToCheck = [];
const baseQuestionsForUser = [];
var validQuestionsForUser = [];

const surveyQuestions = desiredTestData.survey;
const surveyResponses = desiredTestData.responsesSets;

processQuestions(surveyQuestions); //Derive unconditionalQuestions[] (always asked) and conditionalQuestions[] (dependent)

//if there are conditional questions, process into custom array of conditionsToCheck[]
if(conditionalQuestions != null){
  processConditionalQuestions(conditionalQuestions)
}

//validate each response set and determin if valid or invalid
surveyResponses.forEach( responseSet => {
  areResponsesValid(surveyQuestions, responseSet);
});

//Derive unconditionalQuestions[] (always asked) and conditionalQuestions[] (dependent)
function processQuestions(questions){
  questions.forEach(question => {
    if(question.condition == null){
      unconditionalQuestions.push(question.id);
    }
    else{
      conditionalQuestions.push(question);
    }
  });
}

//process conditional questions into custom array of conditionsToCheck[]
function processConditionalQuestions(conditionalQuestions){
  conditionalQuestions.forEach(conditionalQuestion => {
    if(conditionalQuestion.condition.subconditions.length == 1){
      let conditionToAdd = {
        "parentQuestionId": conditionalQuestion.id,
        "conditionType": conditionalQuestion.condition.type,
        "subconditionType": conditionalQuestion.condition.subconditions[0].type,
        "questionId": conditionalQuestion.condition.subconditions[0].questionId,
        "choice": conditionalQuestion.condition.subconditions[0].choice 
      };
      conditionsToCheck.push(conditionToAdd)
    }
    else{
      if(conditionalQuestion.condition.subconditions.length > 1){
        for (let x = 0; x < conditionalQuestion.condition.subconditions.length; x++){
          for (let y = 0; y < conditionalQuestion.condition.subconditions[x].subconditions.length; y++){            
            let conditionToAdd = {
              "conditionId": x,
              "subconditionId": y,
              "parentQuestionId": conditionalQuestion.id,
              "conditionType": conditionalQuestion.condition.type,
              "subconditionType": conditionalQuestion.condition.subconditions[x].type,
              "questionId": conditionalQuestion.condition.subconditions[x].subconditions[y].questionId,
              "choice": conditionalQuestion.condition.subconditions[x].subconditions[y].choice                  
            };
            conditionsToCheck.push(conditionToAdd)
          }
        }
      }
    }
  });
}

//Determine all valid questions for the given responseSet (user) based on rules about provided responses
function processResponses(responses){
  var validQuestionsForResponses = [];

  validQuestionsForResponses.length = 0;
  baseQuestionsForUser.length = 0;
  validQuestionsForResponses = baseQuestionsForUser.concat(unconditionalQuestions);

  responses.forEach(response => {
    conditionsToCheck.forEach(condition => {      
      if(response.questionId == condition.questionId && response.choice == condition.choice && !validQuestionsForResponses.includes(condition.parentQuestionId)){
        validQuestionsForResponses.push(condition.parentQuestionId);
      }
    });
  });   
  return validQuestionsForResponses;
}

//validate each response set and determine if valid or invalid
export function areResponsesValid(questions, responseSet) {
    // TODO: Implement this function

  const responseQuestionsArray = [];
  var validQuestionsArray= [];  
  
  //determine all valid questions for this user based on responses 
  validQuestionsArray = processResponses(responseSet.responses);

  //For each user response (responseSet)
  responseSet.responses.forEach(response => {     
    //get an array of all the questions answered by this user (this responseSet) 
    responseQuestionsArray.push(response.questionId);   
  }); 
  console.log("QuestionIds from this response set: " + responseQuestionsArray);  
  console.log("Valid questionIds for this user: " + validQuestionsArray)
  //compare questions answered to valid questions for user an and return function boolean accordingly 
  const hasAllResponses = responseQuestionsArray.every(resp => validQuestionsArray.includes(resp));

  if(hasAllResponses && responseQuestionsArray.length == validQuestionsArray.length){
    console.log("This ResponseSet is valid");
    console.log("\n");          
  }
  else{
    console.log("This ResponseSet is invalid");
    console.log("\n");
  }  

  return (hasAllResponses && responseQuestionsArray.length == validQuestionsForUser.length);  
} 
