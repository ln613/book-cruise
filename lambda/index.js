const Alexa = require('ask-sdk-core');

const handler = {
  canHandle(handlerInput) {
    return true;
  },
  handle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    const type = request.type;
    const intent = request.intent;
    const slots = intent.slots;
    const res = handlerInput.responseBuilder;
    
    if (type === 'IntentRequest' && intent.name === 'BookCruise') {
      return (Object.keys(slots).some(s => !slots[s].value)
        ? res.addDelegateDirective(intent)
        : res.speak(`A ${slots.CruiseLine.value} cruise to ${slots.Destination.value} on ${slots.Date.value} with ${slots.StateRoom.value} cabin has been booked for you.`))
        .getResponse();
    }
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak(error.message)
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(handler)
  .addErrorHandlers(ErrorHandler)
  .lambda();
