import { test, expect, describe } from 'bun:test';
import { TextVisitor } from "../TextVisitor.ts";
import { ExampleDocument } from "../ExampleDocument.ts";

const EXPECTED =
  "hello January 1st Top Level Heading\nSub Heading\n\n world.We live in a society.flan_oohThankfully  we  can rest easy.Really.centeredLeft sideRight side TODO...Something to do (TODO): An interesting thing to doA warning messageA messageAnother messageHeader hereNothing importantNothing importantFigure captionitununnospacehere.ApprovedApprovedApprovedDisapprovedNothing importantSome descriptionAB12Double wideA thingAnother thingFirst thingSecond thingAmerica! The secret text here...oh yeah. He was special.Jimmy JohnsTakt Time in 2 minutesUnsupported video / gifExample textText in blockExampleExampleHenloAllowed in wisconsinDenied in wisconsinA note here 🍊A thingTO DO (TODO): A thing to do.";

describe('TextVisitor', () => {
  test('collects text', () => {
    const visitor = new TextVisitor();
    visitor.visit(ExampleDocument);
    expect(visitor.getText()).toBe(EXPECTED);
  });
});
