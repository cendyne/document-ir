import { test, expect, describe } from 'bun:test';
import { IdentityTransformer } from "../IdentityTransformer.ts";
import { ExampleDocument } from "../ExampleDocument.ts";
import type { DocumentNode } from "../types.ts";

describe('IdentityTransformer', () => {
  test('changes nothing', async () => {
    expect(
      await new IdentityTransformer().transform(ExampleDocument),
    ).toEqual(ExampleDocument);
  });

  test('preserves all link attributes', async () => {
    const doc: DocumentNode = {
      type: "document",
      title: "Test",
      url: "/test",
      content: [
        {
          type: "link",
          url: "https://example.com",
          title: "Example",
          target: "_blank",
          userGeneratedContent: true,
          noReferrer: true,
          noFollow: true,
          noOpener: true,
          content: [{ type: "text", text: "Click here" }],
        },
      ],
    };

    const result = await new IdentityTransformer().transform(doc);
    expect(result).toEqual(doc);
  });

  test('preserves all image attributes', async () => {
    const doc: DocumentNode = {
      type: "document",
      title: "Test",
      url: "/test",
      content: [
        {
          type: "image",
          url: "https://example.com/image.png",
          alt: "An image",
          width: 800,
          height: 600,
          blurhash: "LEHV6nWB2yk8pyo0adR*.7kCMdnj",
          image: "optimized/path.webp",
          hero: true,
        },
      ],
    };

    const result = await new IdentityTransformer().transform(doc);
    expect(result).toEqual(doc);
  });

  test('preserves all video attributes', async () => {
    const doc: DocumentNode = {
      type: "document",
      title: "Test",
      url: "/test",
      content: [
        {
          type: "video",
          poster: "https://example.com/poster.jpg",
          alt: "A video",
          mp4: "https://example.com/video.mp4",
          width: 1920,
          height: 1080,
          webm: "https://example.com/video.webm",
          blurhash: "LEHV6nWB2yk8pyo0adR*.7kCMdnj",
          muted: true,
          autoplay: true,
          loop: true,
          controls: true,
          content: [{ type: "text", text: "Fallback" }],
        },
      ],
    };

    const result = await new IdentityTransformer().transform(doc);
    expect(result).toEqual(doc);
  });

  test('preserves all figure-image attributes', async () => {
    const doc: DocumentNode = {
      type: "document",
      title: "Test",
      url: "/test",
      content: [
        {
          type: "figure-image",
          url: "https://example.com/image.png",
          alt: "An image",
          width: 800,
          height: 600,
          blurhash: "LEHV6nWB2yk8pyo0adR*.7kCMdnj",
          image: "optimized/path.webp",
          hero: true,
          content: [{ type: "text", text: "Caption" }],
        },
      ],
    };

    const result = await new IdentityTransformer().transform(doc);
    expect(result).toEqual(doc);
  });

  test('preserves all header attributes', async () => {
    const doc: DocumentNode = {
      type: "document",
      title: "Test",
      url: "/test",
      content: [
        {
          type: "header",
          level: 3,
          htmlId: "my-header",
          content: [{ type: "text", text: "Header" }],
        },
      ],
    };

    const result = await new IdentityTransformer().transform(doc);
    expect(result).toEqual(doc);
  });

  test('preserves all sticker attributes', async () => {
    const doc: DocumentNode = {
      type: "document",
      title: "Test",
      url: "/test",
      content: [
        {
          type: "sticker",
          orientation: "right",
          character: "mascot",
          name: "wave",
          size: 256,
          width: 200,
          height: 200,
          content: [{ type: "text", text: "Hello!" }],
        },
      ],
    };

    const result = await new IdentityTransformer().transform(doc);
    expect(result).toEqual(doc);
  });

  test('preserves all quote attributes', async () => {
    const doc: DocumentNode = {
      type: "document",
      title: "Test",
      url: "/test",
      content: [
        {
          type: "quote",
          name: "Author",
          icon: "https://example.com/avatar.png",
          url: "https://example.com/source",
          orientation: "right",
          content: [{ type: "text", text: "Quote text" }],
        },
      ],
    };

    const result = await new IdentityTransformer().transform(doc);
    expect(result).toEqual(doc);
  });

  test('preserves all table-of-contents attributes', async () => {
    const doc: DocumentNode = {
      type: "document",
      title: "Test",
      url: "/test",
      content: [
        {
          type: "toc",
          href: "https://example.com/section",
          hrefHtmlId: "section-1",
          date: {
            type: "date",
            isoDate: "2024-01-15",
            content: [{ type: "text", text: "January 15" }],
          },
          content: [{ type: "text", text: "Section 1" }],
          children: [
            {
              type: "toc",
              hrefHtmlId: "section-1-1",
              content: [{ type: "text", text: "Section 1.1" }],
              children: [],
            },
          ],
        },
      ],
    };

    const result = await new IdentityTransformer().transform(doc);
    expect(result).toEqual(doc);
  });

  test('preserves all formatted-text attributes', async () => {
    const doc: DocumentNode = {
      type: "document",
      title: "Test",
      url: "/test",
      content: [
        {
          type: "formatted-text",
          language: "typescript",
          text: "const x = 1;",
        },
      ],
    };

    const result = await new IdentityTransformer().transform(doc);
    expect(result).toEqual(doc);
  });

  test('preserves all card attributes', async () => {
    const doc: DocumentNode = {
      type: "document",
      title: "Test",
      url: "/test",
      content: [
        {
          type: "card",
          header: {
            type: "card-header",
            title: [{ type: "text", text: "Card Title" }],
            imageUrl: "https://example.com/avatar.png",
            imageBlurhash: "LEHV6nWB2yk8",
            backgroundImage: "https://example.com/bg.png",
            backgroundColor: "#ffffff",
            backgroundBlurhash: "L6PZfSi_.AyE",
            url: "https://example.com",
            username: "user",
            usernameDomain: "example.com",
          },
          content: {
            type: "card-content",
            content: [{ type: "text", text: "Card body" }],
          },
          media: {
            type: "card-media",
            content: [
              {
                type: "image",
                url: "https://example.com/media.png",
                alt: "Media",
              },
            ],
          },
          attribution: {
            type: "card-attribution",
            title: [{ type: "text", text: "Source" }],
            url: "https://example.com/source",
            date: "2024-01-15",
            archiveUrl: "https://archive.org/example",
          },
          original: {
            type: "tweet",
            id: "123456789",
          },
        },
      ],
    };

    const result = await new IdentityTransformer().transform(doc);
    expect(result).toEqual(doc);
  });

  test('preserves all document meta attributes', async () => {
    const doc: DocumentNode = {
      type: "document",
      title: "Test Document",
      url: "/test",
      hidden: true,
      noindex: true,
      author: "Test Author",
      description: "A test document",
      image: "https://example.com/og.png",
      guid: "550e8400-e29b-41d4-a716-446655440000",
      "pub-date": 1705320000000,
      date: "2024-01-15",
      contentDigest: "sha256-abc123",
      readingDifficultyMultiplier: 1.5,
      content: [{ type: "text", text: "Content" }],
      definitions: [
        {
          type: "definition",
          key: "API",
          abbreviation: [{ type: "text", text: "API" }],
          title: [{ type: "text", text: "Application Programming Interface" }],
          content: [{ type: "text", text: "A way for programs to communicate" }],
        },
      ],
      hierarchy: {
        headerText: "Test",
        headerId: "test",
        words: 10,
        totalWords: 100,
        children: [],
      },
    };

    const result = await new IdentityTransformer().transform(doc);
    expect(result).toEqual(doc);
  });

  test('preserves embed with imagePreview', async () => {
    const doc: DocumentNode = {
      type: "document",
      title: "Test",
      url: "/test",
      content: [
        {
          type: "embed",
          content: {
            type: "youtube",
            id: "dQw4w9WgXcQ",
            imagePreview: {
              url: "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg",
              blurhash: "LEHV6nWB2yk8",
              width: 480,
              height: 360,
            },
          },
        },
      ],
    };

    const result = await new IdentityTransformer().transform(doc);
    expect(result).toEqual(doc);
  });

  test('does not add undefined optional attributes', async () => {
    const doc: DocumentNode = {
      type: "document",
      title: "Test",
      url: "/test",
      content: [
        {
          type: "image",
          url: "https://example.com/image.png",
          alt: "Simple image",
        },
      ],
    };

    const result = await new IdentityTransformer().transform(doc);

    // Should not have extra undefined properties
    const imageNode = result.content[0]!;
    expect(imageNode.type).toBe("image");
    expect(Object.keys(imageNode).sort()).toEqual(["alt", "type", "url"]);
  });

  test('preserves time-range with both bounds', async () => {
    const doc: DocumentNode = {
      type: "document",
      title: "Test",
      url: "/test",
      content: [
        {
          type: "time-range",
          notBefore: "2024-06-01T00:00:00Z",
          notAfter: "2024-12-31T23:59:59Z",
          content: [{ type: "text", text: "Limited time" }],
        },
      ],
    };

    const result = await new IdentityTransformer().transform(doc);
    expect(result).toEqual(doc);
  });

  test('preserves time-range with only notBefore', async () => {
    const doc: DocumentNode = {
      type: "document",
      title: "Test",
      url: "/test",
      content: [
        {
          type: "time-range",
          notBefore: "2024-01-01T00:00:00Z",
          content: [{ type: "text", text: "After date" }],
        },
      ],
    };

    const result = await new IdentityTransformer().transform(doc);
    expect(result).toEqual(doc);
  });

  test('preserves time-range with only notAfter', async () => {
    const doc: DocumentNode = {
      type: "document",
      title: "Test",
      url: "/test",
      content: [
        {
          type: "time-range",
          notAfter: "2025-12-31T23:59:59Z",
          content: [{ type: "text", text: "Before date" }],
        },
      ],
    };

    const result = await new IdentityTransformer().transform(doc);
    expect(result).toEqual(doc);
  });

  test('does not add undefined optional attributes to time-range', async () => {
    const doc: DocumentNode = {
      type: "document",
      title: "Test",
      url: "/test",
      content: [
        {
          type: "time-range",
          notBefore: "2024-01-01T00:00:00Z",
          content: [{ type: "text", text: "Only notBefore" }],
        },
      ],
    };

    const result = await new IdentityTransformer().transform(doc);

    const node = result.content[0]!;
    expect(node.type).toBe("time-range");
    expect(Object.keys(node).sort()).toEqual(["content", "notBefore", "type"]);
  });

  test('does not add undefined optional attributes to figure-image', async () => {
    const doc: DocumentNode = {
      type: "document",
      title: "Test",
      url: "/test",
      content: [
        {
          type: "figure-image",
          url: "https://example.com/image.png",
          alt: "Simple image",
          content: [],
        },
      ],
    };

    const result = await new IdentityTransformer().transform(doc);

    const node = result.content[0]!;
    expect(node.type).toBe("figure-image");
    // Should not have blurhash, width, height, image, hero if not in source
    expect(Object.keys(node).sort()).toEqual(["alt", "content", "type", "url"]);
  });
});
