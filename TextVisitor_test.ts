import { expect, test } from "bun:test";
import { TextVisitor } from "./TextVisitor.ts";
import { ExampleDocument } from "./ExampleDocument.ts";

test("Text visitor collects text", async () => {
  const visitor = new TextVisitor();
  visitor.visit(ExampleDocument);
  expect(visitor.getText()).toEqual('hello \n world.We live in a society.flan_oohThankfully  we  can rest easy.Really.centeredLeft sideRight side TODOTODOTODOSomething to doAn interesting thing to doA warning messageA messageAnother messageHeader hereNothing importantNothing importantFigure captionitununnospacehere.ApprovedApprovedDisapprovedNothing importantSome descriptionAB12Double wideA thingAnother thingFirst thingSecond thingAmerica! The secret text here...oh yeah. He was special.Jimmy JohnsTakt Time in 2 minutesUnsupported video / gifExample textText in blockExampleExampleHenloAllowed in wisconsinDenied in wisconsinA note here \uD83C\uDF4AA thingTODOTO DOA thing to do.');
});