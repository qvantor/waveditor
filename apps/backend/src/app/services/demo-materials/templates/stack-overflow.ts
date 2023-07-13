import { EditorSnapshot } from '@waveditors/editor-model';

export const StackOverflowTemplate: EditorSnapshot = {
  config: {
    rootElementId: '0.33487982865084454',
    viewportWidth: 680,
    style: {
      margin: '0',
      backgroundColor: '#f3f3f5',
      fontSize: '16px',
    },
    fonts: [
      {
        id: '0.6444420080505084',
        fallback: 'Helvetica',
        genericFamily: 'sans-serif',
        name: 'Arimo',
        url: 'https://fonts.googleapis.com/css2?family=Arimo:wght@400;600&display=swap',
      },
      {
        id: '0.9447189572273049',
        fallback: 'Times New Roman',
        genericFamily: 'serif',
      },
    ],
  },
  relations: {
    elementFont: {},
  },
  elements: {
    '0.33487982865084454': {
      id: '0.33487982865084454',
      type: 'layout',
      link: null,
      params: {
        columns: [
          {
            children: [
              '0.05495988646996097',
              '0.5250545023981659',
              '0.3290068882330466',
              '0.8940368277081923',
            ],
            proportion: 100,
          },
        ],
      },
      style: {
        margin: '0px auto',
        padding: '20px 0px',
      },
    },
    '0.8077460603421789': {
      id: '0.8077460603421789',
      type: 'image',
      link: null,
      params: {
        url: 'https://react-email-demo-ijnnx5hul-resend.vercel.app/static/stack-overflow-logo.png',
      },
      style: {
        display: 'block',
        maxWidth: '100%',
      },
      meta: {
        width: 292,
        height: 72,
      },
    },
    '0.5027819118396955': {
      id: '0.5027819118396955',
      type: 'text',
      link: null,
      params: {
        content: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  marks: [
                    {
                      type: 'bold',
                    },
                  ],
                  text: 'Find what you want, faster',
                },
              ],
            },
          ],
        },
      },
      style: {
        color: '#ffffff',
        fontSize: '27px',
        lineHeight: '27px',
        padding: '20px 0px 27px',
      },
    },
    '0.05495988646996097': {
      id: '0.05495988646996097',
      type: 'layout',
      link: null,
      params: {
        columns: [
          {
            children: ['0.8077460603421789'],
            proportion: 25,
          },
          {
            children: [],
            proportion: 25,
          },
          {
            children: [],
            proportion: 25,
          },
          {
            children: [],
            proportion: 25,
          },
        ],
      },
      style: {
        padding: '0px 30px 20px',
      },
    },
    '0.5250545023981659': {
      id: '0.5250545023981659',
      type: 'layout',
      link: null,
      params: {
        columns: [
          {
            children: ['0.5027819118396955', '0.005649646066144598'],
            proportion: 50,
          },
          {
            children: ['0.5281707743147301'],
            proportion: 50,
          },
        ],
      },
      style: {
        padding: '10px 20px 10px 30px',
        backgroundColor: '#2b2d6e',
        borderRadius: '5px 5px 0px 0px',
      },
    },
    '0.005649646066144598': {
      id: '0.005649646066144598',
      type: 'text',
      link: null,
      params: {
        content: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Tips and tricks for searching on Stack Overflow',
                },
              ],
            },
          ],
        },
      },
      style: {
        color: '#ffffff',
        padding: '0px 0px 20px',
        fontSize: '17px',
        lineHeight: '24px',
      },
    },
    '0.5281707743147301': {
      id: '0.5281707743147301',
      type: 'image',
      link: null,
      params: {
        url: 'https://react-email-demo-ijnnx5hul-resend.vercel.app/static/stack-overflow-header.png',
      },
      style: {
        display: 'block',
        maxWidth: '100%',
        padding: '35px 0px',
      },
      meta: {
        width: 640,
        height: 374,
      },
    },
    '0.3290068882330466': {
      id: '0.3290068882330466',
      type: 'layout',
      link: null,
      params: {
        columns: [
          {
            children: [
              '0.5247315254185632',
              '0.28263615694320166',
              '0.11988580987485387',
              '0.5680156934891727',
              '0.9322484544802578',
              '0.6453944679404455',
              '0.49698673070872856',
            ],
            proportion: 100,
          },
        ],
      },
      style: {
        padding: '30px 20px',
        backgroundColor: '#ffffff',
      },
    },
    '0.5247315254185632': {
      id: '0.5247315254185632',
      type: 'text',
      link: null,
      params: {
        content: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  marks: [
                    {
                      type: 'bold',
                    },
                  ],
                  text: 'Searching for solutions',
                },
              ],
            },
          ],
        },
      },
      style: {
        fontSize: '21px',
        lineHeight: '21px',
      },
    },
    '0.28263615694320166': {
      id: '0.28263615694320166',
      type: 'text',
      link: null,
      params: {
        content: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: "With more than 18 million questions, it's possible that someone has already provided a solution to the problem you're facing.",
                },
              ],
            },
          ],
        },
      },
      style: {
        fontSize: '15px',
        lineHeight: '21px',
        padding: '16px 0px 0px',
      },
    },
    '0.11988580987485387': {
      id: '0.11988580987485387',
      type: 'text',
      link: null,
      params: {
        content: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  marks: [
                    {
                      type: 'bold',
                    },
                  ],
                  text: 'Use the search bar at the top of the page to find what you need',
                },
              ],
            },
          ],
        },
      },
      style: {
        fontSize: '21px',
        lineHeight: '21px',
        padding: '30px 0px 0px',
      },
    },
    '0.5680156934891727': {
      id: '0.5680156934891727',
      type: 'text',
      link: null,
      params: {
        content: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Here are a few simple search tips to get you started:',
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'To find a specific phrase, enter it in quotes: "local storage"',
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'To search within specific tag(s), enter them in square brackets: [javascript]',
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Combine them to get even more precise results - [javascript] "local storage" searches for the phrase “local storage” in questions that have the [javascript] tag',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      style: {
        fontSize: '15px',
        lineHeight: '32px',
        padding: '15px 0px 0px',
      },
    },
    '0.9322484544802578': {
      id: '0.9322484544802578',
      type: 'text',
      link: null,
      params: {
        content: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'The more information you can put in the search bar, the more likely you will be to either find the answer you need or feel confident that no one else has asked the question before.',
                },
              ],
            },
          ],
        },
      },
      style: {
        fontSize: '15px',
        lineHeight: '21px',
        padding: '16px 0px 0px',
      },
    },
    '0.6453944679404455': {
      id: '0.6453944679404455',
      type: 'text',
      link: null,
      params: {
        content: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  marks: [
                    {
                      type: 'bold',
                    },
                  ],
                  text: 'Take a break and read about the worst coder in the world',
                },
              ],
            },
          ],
        },
      },
      style: {
        fontSize: '21px',
        lineHeight: '21px',
        padding: '30px 0px 0px',
      },
    },
    '0.49698673070872856': {
      id: '0.49698673070872856',
      type: 'layout',
      link: null,
      params: {
        columns: [
          {
            children: ['0.31049815074271914'],
            proportion: 25,
          },
          {
            children: [],
            proportion: 25,
          },
          {
            children: [],
            proportion: 25,
          },
          {
            children: [],
            proportion: 25,
          },
        ],
      },
      style: {
        padding: '10px 0px 0px',
      },
    },
    '0.31049815074271914': {
      id: '0.31049815074271914',
      type: 'text',
      params: {
        content: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'I need a break',
                },
              ],
            },
          ],
        },
      },
      style: {
        backgroundColor: '#0095ff',
        textAlign: 'center',
        padding: '13px 17px',
        color: '#ffffff',
        borderRadius: '4px',
      },
      link: {
        newTab: true,
        url: 'https://github.com/qvantor',
      },
    },
    '0.7279449430255271': {
      id: '0.7279449430255271',
      type: 'text',
      link: null,
      params: {
        content: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: "You're receiving this email because your Stack Overflow activity triggered this tip or reminder.",
                },
              ],
            },
          ],
        },
      },
      style: {
        padding: '32px 0px 0px',
        fontSize: '12px',
        lineHeight: '15px',
        color: '#9199a1',
      },
    },
    '0.07539442852999345': {
      id: '0.07539442852999345',
      type: 'layout',
      link: null,
      params: {
        columns: [
          {
            children: ['0.2600000104504372'],
            proportion: 20,
          },
          {
            children: [],
            proportion: 20,
          },
          {
            children: [],
            proportion: 20,
          },
          {
            children: [],
            proportion: 20,
          },
          {
            children: [],
            proportion: 20,
          },
        ],
      },
      style: {
        padding: '30px 0px 0px',
      },
    },
    '0.2600000104504372': {
      id: '0.2600000104504372',
      type: 'image',
      link: null,
      params: {
        url: 'https://react-email-demo-ijnnx5hul-resend.vercel.app/static/stack-overflow-logo-sm.png',
      },
      style: {
        display: 'block',
        maxWidth: '100%',
      },
      meta: {
        width: 222,
        height: 44,
      },
    },
    '0.7731995924021442': {
      id: '0.7731995924021442',
      type: 'text',
      link: null,
      params: {
        content: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  marks: [
                    {
                      type: 'bold',
                    },
                  ],
                  text: 'Stack Overflow',
                },
                {
                  type: 'text',
                  text: ', 110 William Street, 28th Floor, New York, NY 10038',
                },
              ],
            },
          ],
        },
      },
      style: {
        fontSize: '12px',
        lineHeight: '15px',
        color: '#9199a1',
        padding: '0px',
      },
    },
    '0.8940368277081923': {
      id: '0.8940368277081923',
      type: 'layout',
      link: null,
      params: {
        columns: [
          {
            children: [
              '0.7279449430255271',
              '0.07539442852999345',
              '0.7731995924021442',
              '0.3421968501210084',
            ],
            proportion: 100,
          },
        ],
      },
      style: {
        padding: '0px 30px',
      },
    },
    '0.719363560017702': {
      id: '0.719363560017702',
      type: 'text',
      link: null,
      params: {
        content: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Unsubscribe from emails like this',
                },
              ],
            },
          ],
        },
      },
      style: {
        fontSize: '12px',
        lineHeight: '15px',
      },
    },
    '0.3421968501210084': {
      id: '0.3421968501210084',
      type: 'text',
      link: null,
      params: {
        content: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: '<3',
                },
              ],
            },
          ],
        },
      },
      style: {
        fontSize: '11px',
        lineHeight: '11px',
        color: '#e06c77',
        padding: '10px 0px 0px',
      },
    },
  },
  variables: [],
};
