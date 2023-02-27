//This implementation approach seeks to:
//Grab the given survey and responses
//Build an array of survey questions that are valid for the user (based on initial responses)
//Build an array of survey questions that were actually answered by the user
//Compare - if the number of questions answered matches the valid number of questions and all were answered return true (valid), otherwise return false (invalid)

//Note: used .mjs in lieu of .js for data import approach
import { samplesurveydata } from './test-data.mjs';

const unconditionalQuestionsArray = [];
const baseQuestionsForUser = [];
var validQuestionsForUser = [];

processQuestions(samplesurveydata.fantasyExample.survey); //Get and array of the questions that will always be asked

//Grab/parse survey and responses data for processing
samplesurveydata.fantasyExample.responsesSets.forEach( responseSet => {
  areResponsesValid(samplesurveydata.fantasyExample.survey, responseSet);
});

//Get array of the questions that will always be asked (helper function)
function processQuestions(questions){
  questions.forEach(question => {
    if(question.condition == null){
      unconditionalQuestionsArray.push(question.id);
    }
  });
}

//Determine all valid questions for the given responseSet 
function processResponses(questions, responses){
  var validQuestionsForResponses = [];

  let isCanadian = false;
  let isAmerican = false;
  let isEighteen = false;
  let likesVamps = false;

  responses.forEach(response => {
    if(response.questionId == '1' && response.choice == "Canada"){
      isCanadian = true;
      isAmerican = false;
    }
    
    if(response.questionId == '1' && response.choice == "US") {
      isAmerican = true;
      isCanadian = false;
    }

    if(response.questionId == '2' && response.choice == "Yes"){
      isEighteen = true;
    }

    if(response.questionId == '3' && response.choice == "Yes"){
      likesVamps = true;
    }
  }); 

  validQuestionsForResponses.length = 0;
  baseQuestionsForUser.length = 0;
  validQuestionsForResponses = baseQuestionsForUser.concat(unconditionalQuestionsArray);

  if(isCanadian){
    validQuestionsForResponses.push(questions[3].id);
  }

  if((isAmerican && isEighteen) || likesVamps){
    validQuestionsForResponses.push(questions[4].id);
  }

  return validQuestionsForResponses;
}

function areResponsesValid(questions, responseSet) {
    // TODO: Implement this function

  const responseQuestionsArray = [];
  var validQuestionsArray= [];  
  
  //determine all valid questions for this user based on responses (use helper function)
  validQuestionsArray = processResponses(questions, responseSet.responses);

  //get an array of all the questions answered by this user (this responseSet) 
  responseSet.responses.forEach(response => {    
    responseQuestionsArray.push(response.questionId);   
  }); 

  //compare questions answered to valid questions for user  
  const hasAllResponses = responseQuestionsArray.every(resp => validQuestionsArray.includes(resp));
  //and return function boolean accordingly
  return (hasAllResponses && responseQuestionsArray.length == validQuestionsForUser.length);  
} 