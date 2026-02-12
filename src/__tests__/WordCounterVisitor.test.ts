import { test, expect, describe } from 'bun:test';
import { WordCounterVisitor } from "../WordCounterVisitor.ts";

describe('WordCounterVisitor', () => {
  test('counts paragraph', () => {
    const visitor = new WordCounterVisitor();
    visitor.visit({
      type: "array",
      content: [{
        type: "paragraph",
        content: [{ type: "text", text: "Hello world" }],
      }],
    });
    expect(visitor.getCount()).toBe(2);
  });

  test('counts adjacent paragraph', () => {
    const visitor = new WordCounterVisitor();
    visitor.visit({
      type: "array",
      content: [{
        type: "paragraph",
        content: [{ type: "text", text: "Hello world" }],
      }, {
        type: "paragraph",
        content: [{ type: "text", text: "Hello world" }],
      }],
    });
    expect(visitor.getCount()).toBe(4);
  });

  test('counts paragraph followed by text', () => {
    const visitor = new WordCounterVisitor();
    visitor.visit({
      type: "array",
      content: [{
        type: "paragraph",
        content: [{ type: "text", text: "hello" }],
      }, {
        type: "text",
        text: "world",
      }],
    });
    expect(visitor.getCount()).toBe(2);
  });

  test('counts paragraph followed by conjoined text', () => {
    const visitor = new WordCounterVisitor();
    visitor.visit({
      type: "array",
      content: [{
        type: "paragraph",
        content: [{ type: "text", text: "hello" }],
      }, {
        type: "text",
        text: "world",
      }, {
        type: "text",
        text: "world",
      }],
    });
    expect(visitor.getCount()).toBe(2);
  });
});
