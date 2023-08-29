import { assertEquals } from "https://deno.land/std@0.192.0/testing/asserts.ts";
import { WordCounterVisitor } from "./WordCounterVisitor.ts";

Deno.test({
  name: "Word count visitor counts paragraph",
  fn() {
    const visitor = new WordCounterVisitor();
    visitor.visit({
      type: "array",
      content: [{
        type: "paragraph",
        content: [{ type: "text", text: "Hello world" }],
      }],
    });
    assertEquals(visitor.getCount(), 2);
  },
});

Deno.test({
  name: "Word count visitor counts adjacent paragraph",
  fn() {
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
    assertEquals(visitor.getCount(), 4);
  },
});

Deno.test({
  name: "Word count visitor counts paragraph followed by text",
  fn() {
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
    assertEquals(visitor.getCount(), 2);
  },
});
Deno.test({
  name: "Word count visitor counts paragraph followed by conjoined text",
  fn() {
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
    assertEquals(visitor.getCount(), 2);
  },
});
