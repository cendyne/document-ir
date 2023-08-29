import { DocumentNode } from "./types.ts";

export const ExampleDocument: DocumentNode = {
  type: "document",
  author: "TODO",
  title: "TEST",
  url: "/test",
  "pub-date": 2123312,
  date: "2022-02-02",
  guid: "0259336e-de74-412b-9f5e-2bb5ae5d3da1",
  description: "test test",
  image: "https://c.cdyn.dev/JY6wB9Y9",
  hidden: true,
  noindex: true,
  content: [
    {
      type: "text",
      text: "hello ",
    },
    {
      type: "array",
      content: [
        {
          type: "text",
          text: "\n world",
        },
        {
          type: "text",
          text: ".",
        },
      ],
    },
    {
      type: "block-quote",
      content: [
        {
          type: "text",
          text: "We live in a ",
        },
        {
          type: "text",
          text: "society.",
        },
        {
          type: "emoji",
          url: "https://c.cdyn.dev/YzU3qe7R",
          alt: "flan_ooh",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Thankfully ",
        },
        {
          type: "bold",
          content: [
            {
              type: "text",
              text: " we ",
            },
            {
              type: "text",
              text: " can rest easy.",
            },
            {
              type: "break",
            },
            {
              type: "text",
              text: "Really.",
            },
          ],
        },
      ],
    },
    {
      type: "horizontal-rule",
    },
    {
      type: "center",
      content: [
        {
          type: "text",
          text: "centered",
        },
      ],
    },
    {
      type: "columns",
      columns: [
        [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Left side",
              },
            ],
          },
        ],
        [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Right side ",
              },
              {
                type: "definition-reference",
                definition: {
                  abbreviation: [{ type: "text", text: "TODO" }],
                  key: "TODO",
                },
                content: [
                  {
                    type: "text",
                    text: "TODO",
                  },
                ],
              },
              {
                type: "text",
                text: "...",
              },
            ],
          },
        ],
      ],
      "column-count": 2,
    },
    {
      type: "definition-list",
      content: [
        {
          type: "definition",
          key: "TODO",
          abbreviation: [
            {
              type: "text",
              text: "TODO",
            },
          ],
          content: [
            {
              type: "text",
              text: "An interesting thing to do",
            },
          ],
          title: [
            {
              type: "text",
              text: "Something to do",
            },
          ],
        },
      ],
    },
    {
      type: "warning",
      content: [
        {
          type: "text",
          text: "A warning message",
        },
      ],
    },
    {
      type: "bubble",
      orientation: "left",
      content: [
        {
          type: "text",
          text: "A message",
        },
      ],
    },
    {
      type: "bubble",
      orientation: "right",
      content: [
        {
          type: "text",
          text: "Another message",
        },
      ],
    },
    {
      type: "header",
      level: 2,
      htmlId: "h200",
      content: [
        {
          type: "text",
          text: "Header here",
        },
      ],
    },
    {
      type: "image",
      alt: "Nothing important",
      image: "nothing/important",
      blurhash: "E9C[4yH^nlo{RRtP.hRnM}j[oeV]",
      url: "https://c.cdyn.dev/pr45JDDH",
      width: 1600,
      height: 737,
      hero: true,
    },
    {
      type: "figure",
      content: [
        {
          type: "image",
          alt: "Nothing important",
          image: "nothing/important",
          blurhash: "E9C[4yH^nlo{RRtP.hRnM}j[oeV]",
          url: "https://c.cdyn.dev/pr45JDDH",
          width: 1600,
          height: 737,
        },
        {
          type: "figure-caption",
          content: [
            {
              type: "text",
              text: "Figure ",
            },
            {
              type: "code",
              content: [
                {
                  type: "text",
                  text: "caption",
                },
              ],
            },
            {
              type: "italic",
              content: [
                {
                  type: "text",
                  text: "it",
                },
              ],
            },
            {
              type: "underline",
              content: [
                {
                  type: "text",
                  text: "un",
                },
              ],
            },
            {
              type: "strike-through",
              content: [
                {
                  type: "text",
                  text: "un",
                },
              ],
            },
            {
              type: "text",
              text: "nospacehere.",
            },
          ],
        },
      ],
    },
    {
      type: "sticker",
      orientation: "left",
      character: "cendyne",
      name: "naga-approved",
      size: 512,
      content: [
        {
          type: "text",
          text: "Approved",
        },
      ],
    },
    {
      type: "sticker",
      orientation: "left",
      character: "cendyne",
      name: "naga-approved",
      width: 512,
      height: 200,
      content: [
        {
          type: "text",
          text: "Approved",
        },
      ],
    },
    {
      type: "sticker",
      orientation: "right",
      character: "cendyne",
      name: "naga-approved",
      size: 512,
      content: [
        {
          type: "text",
          text: "Approved",
        },
      ],
    },
    {
      type: "sticker",
      orientation: "left",
      character: "cendyne",
      name: "naga-disapproved",
      size: 512,
      content: [
        {
          type: "text",
          text: "Disapproved",
        },
      ],
    },
    {
      type: "sticker",
      orientation: "center",
      character: "cendyne",
      name: "naga-disapproved",
      size: 512,
      content: [],
    },
    {
      type: "figure-image",
      alt: "Nothing important",
      image: "nothing/important",
      blurhash: "E9C[4yH^nlo{RRtP.hRnM}j[oeV]",
      url: "https://c.cdyn.dev/pr45JDDH",
      width: 1600,
      height: 737,
      hero: true,
      content: [
        {
          type: "text",
          text: "Some description",
        },
      ],
    },
    {
      type: "table",
      content: [
        [
          {
            type: "table-cell",
            header: true,
            span: [1, 1],
            content: [
              {
                type: "text",
                text: "A",
              },
            ],
          },
          {
            type: "table-cell",
            header: true,
            span: [1, 1],
            content: [
              {
                type: "text",
                text: "B",
              },
            ],
          },
        ],
        [
          {
            type: "table-cell",
            span: [1, 1],
            content: [
              {
                type: "text",
                text: "1",
              },
            ],
          },
          {
            type: "table-cell",
            span: [1, 1],
            content: [
              {
                type: "text",
                text: "2",
              },
            ],
          },
        ],
        [
          {
            type: "table-cell",
            span: [2, 1],
            content: [
              {
                type: "text",
                text: "Double wide",
              },
            ],
          },
        ],
      ],
    },
    {
      type: "list",
      style: "unordered",
      content: [
        {
          type: "list-item",
          content: [
            {
              type: "text",
              text: "A thing",
            },
          ],
        },
        {
          type: "list-item",
          content: [
            {
              type: "text",
              text: "Another thing",
            },
          ],
        },
      ],
    },
    {
      type: "list",
      style: "ordered",
      content: [
        {
          type: "list-item",
          content: [
            {
              type: "text",
              text: "First thing",
            },
          ],
        },
        {
          type: "list-item",
          content: [
            {
              type: "text",
              text: "Second thing",
            },
          ],
        },
      ],
    },
    {
      type: "tweet",
      id: "503994351844728833",
    },
    {
      type: "toot",
      id: "109597685236238071",
    },
    {
      type: "youtube",
      id: "AbSehcT19u0",
    },
    {
      type: "vimeo",
      id: "162704765",
    },
    {
      type: "secret",
      content: [
        {
          type: "text",
          text: "America! The secret text here...",
        },
      ],
    },
    {
      type: "high-tech-alert",
      warning: [
        {
          type: "text",
          text: "Jimmy Johns",
        },
      ],
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "oh yeah.",
            },
            {
              type: "italic",
              content: [
                {
                  type: "text",
                  text: " He ",
                },
              ],
            },
            {
              type: "text",
              text: "was special.",
            },
          ],
        },
      ],
    },
    {
      type: "video",
      alt: "Takt Time in 2 minutes",
      width: 1920,
      height: 1080,
      poster: "https://c.cdyn.dev/b2FeAuU-",
      mp4: "https://c.cdyn.dev/vPRK5O4U",
      blurhash: "MVEEGl9b9F~U9tNyt6s.NGoL4.%L$*E1%1",
      muted: true,
      autoplay: true,
      loop: true,
      content: [
        {
          type: "text",
          text: "Unsupported video / gif",
        },
      ],
    },
    {
      type: "card",
      header: {
        type: "card-header",
        title: [{ type: "text", text: "Example" }],
        imageUrl: "https://c.cdyn.dev/b2FeAuU-",
        imageBlurhash: "MVEEGl9b9F~U9tNyt6s.NGoL4.%L$*E1%1",
        backgroundColor: "FFFFFF",
        backgroundBlurhash: "MbRymP?ct8bHW=xujZWBj]of_ND%Rjs:oJ",
        backgroundImage: "https://c.cdyn.dev/Buov2-Ce",
      },
      attribution: {
        type: "card-attribution",
        title: [{ type: "text", text: "Example" }],
      },
      media: {
        type: "card-media",
        content: [
          {
            type: "image",
            alt: "Henlo",
            width: 1920,
            height: 1080,
            url: "https://c.cdyn.dev/b2FeAuU-",
            blurhash: "MVEEGl9b9F~U9tNyt6s.NGoL4.%L$*E1%1",
          },
          {
            type: "embed",
            content: {
              type: "youtube",
              id: "todo",
            },
          },
        ],
      },
      content: {
        type: "card-content",
        content: [
          {
            type: "text",
            text: "Example text",
          },
          {
            type: "block",
            content: [
              {
                type: "text",
                text: "Text in block",
              },
            ],
          },
        ],
      },
      original: {
        type: "youtube",
        id: "abcdef",
      },
    },
    {
      type: "embed",
      content: {
        type: "youtube",
        id: "AbSehcT19u0",
        imagePreview: {
          url: "https://c.cdyn.dev/MD0AxBQq",
          blurhash: "L6E1%J0y00IU00o}^,}sxts.-VoL",
          width: 480,
          height: 360,
        },
      },
    },
    {
      type: "region",
      mode: "allow",
      regions: "WI",
      content: [
        {
          type: "text",
          text: "Allowed in wisconsin",
        },
      ],
    },
    {
      type: "region",
      mode: "deny",
      regions: "WI",
      content: [
        {
          type: "text",
          text: "Denied in wisconsin",
        },
      ],
    },
    {
      type: "formatted-text",
      language: "javascript",
      text: "//hello javascript\nmain();",
    },
    {
      type: "note",
      content: [
        {
          type: "text",
          text: "A note here \uD83C\uDF4A",
        },
      ],
    },
    {
      type: "quote",
      icon: "https://c.cdyn.dev/JY6wB9Y9",
      name: "Cendyne",
      url: "https://cendyne.dev/",
      content: [
        {
          type: "text",
          text: "A thing",
        },
      ],
    },
  ],
  definitions: [{
    type: "definition",
    key: "TODO",
    abbreviation: [{ type: "text", text: "TODO" }],
    title: [{ type: "text", text: "TO DO" }],
    content: [{
      type: "text",
      text: "A thing to do.",
    }],
  }],
  hierarchy: {
    headerId: "a1",
    headerText: "aaa",
    totalWords: 200,
    words: 100,
    children: [{
      headerId: "a2",
      headerText: "bbb",
      totalWords: 100,
      words: 100,
      children: [],
    }],
  },
};
