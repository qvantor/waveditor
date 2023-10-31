export default [
  {
    id: 1,
    name: '2 columns',
    userId: 1,
    json: {
      config: {
        fonts: [
          {
            id: '0.9888764057977806',
            fallback: 'Arial',
            genericFamily: 'sans-serif',
          },
        ],
        style: {},
        rootElementId: '0.6883738668379833',
        viewportWidth: 600,
      },
      elements: {
        '0.489299013804267': {
          id: '0.489299013804267',
          link: null,
          name: 'header2',
          type: 'text',
          style: {
            padding: '20px 0px 0px',
            fontSize: '22px',
            lineHeight: '24px',
          },
          params: {
            content: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      text: 'Europe’s fall destinations for those in the know',
                      type: 'text',
                      marks: [{ type: 'bold' }],
                    },
                  ],
                },
              ],
            },
          },
        },
        '0.3689954826452322': {
          id: '0.3689954826452322',
          link: null,
          name: 'content',
          type: 'layout',
          style: { verticalAlign: 'bottom' },
          params: {
            gap: 20,
            columns: [
              { children: ['0.23330691775527446'], proportion: 50 },
              {
                children: ['0.7056211486336472'],
                proportion: 50,
              },
            ],
          },
        },
        '0.6106373818204667': {
          id: '0.6106373818204667',
          link: null,
          name: 'text',
          type: 'text',
          style: {
            padding: '20px 0px 0px',
            fontSize: '16px',
            lineHeight: '18px',
          },
          params: {
            content: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      text: 'If you are just looking for a short answer to the question of whether it’s a good idea to visit Italy in November, then I’d say go for it. ',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
          },
        },
        '0.6883738668379833': {
          id: '0.6883738668379833',
          link: null,
          name: '2 col root',
          type: 'layout',
          style: {
            margin: '0px auto',
            padding: '20px',
            backgroundColor: '#ffffff',
          },
          params: {
            columns: [
              {
                children: ['0.8217072663371938', '0.3689954826452322'],
                proportion: 100,
              },
            ],
          },
        },
        '0.7056211486336472': {
          id: '0.7056211486336472',
          link: null,
          name: 'layout3',
          type: 'layout',
          style: {},
          params: {
            columns: [
              {
                children: ['0.489299013804267', '0.9754992269300791'],
                proportion: 100,
              },
            ],
          },
        },
        '0.8217072663371938': {
          id: '0.8217072663371938',
          link: null,
          name: 'images',
          type: 'layout',
          style: {},
          params: {
            gap: 20,
            columns: [
              { children: ['0.10434077591306479'], proportion: 50 },
              {
                children: ['0.23432633217146437'],
                proportion: 50,
              },
            ],
          },
        },
        '0.9754992269300791': {
          id: '0.9754992269300791',
          link: null,
          name: 'text2',
          type: 'text',
          style: {
            padding: '20px 0px 0px',
            fontSize: '16px',
            lineHeight: '18px',
          },
          params: {
            content: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      text: 'As the temperatures drop, Europe comes into its own. Here are the less crowded places you may want to visit.',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
          },
        },
        '0.9843674541133136': {
          id: '0.9843674541133136',
          link: null,
          name: 'header',
          type: 'text',
          style: {
            padding: '20px 0px 0px',
            fontSize: '22px',
            lineHeight: '24px',
          },
          params: {
            content: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      text: 'What It’s Really Like to Visit Italy in November ',
                      type: 'text',
                      marks: [{ type: 'bold' }],
                    },
                  ],
                },
              ],
            },
          },
        },
        '0.10434077591306479': {
          id: '0.10434077591306479',
          link: null,
          meta: { width: 600, height: 400 },
          name: 'image',
          type: 'image',
          style: { height: '180px', borderRadius: '20px' },
          params: {
            url: 'https://images.pexels.com/photos/307007/pexels-photo-307007.jpeg?auto=compress&cs=tinysrgb&w=300&dpr=2',
          },
        },
        '0.23330691775527446': {
          id: '0.23330691775527446',
          link: null,
          name: 'layout2',
          type: 'layout',
          style: {},
          params: {
            columns: [
              {
                style: {},
                children: ['0.9843674541133136', '0.6106373818204667'],
                proportion: 100,
              },
            ],
          },
        },
        '0.23432633217146437': {
          id: '0.23432633217146437',
          link: null,
          meta: { width: 600, height: 400 },
          name: 'image1',
          type: 'image',
          style: { height: '180px', borderRadius: '20px' },
          params: {
            url: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=300&h=750&dpr=2',
          },
        },
      },
      relations: { elementFont: { '0.489299013804267': '0.9888764057977806' } },
      variables: [],
    },
    previewHeight: 380,
    createdAt: '2023-10-09T14:03:12.144Z',
    updatedAt: '2023-10-09T14:03:12.144Z',
  },
  {
    id: 2,
    name: 'Header with social',
    userId: 1,
    json: {
      config: {
        fonts: [],
        style: {},
        rootElementId: '0.254832381949331',
        viewportWidth: 600,
      },
      elements: {
        '0.254832381949331': {
          id: '0.254832381949331',
          link: null,
          name: 'header',
          type: 'layout',
          style: { padding: '20px' },
          params: {
            columns: [
              {
                style: {},
                children: ['0.2318218992530372'],
                proportion: 50,
              },
              { children: ['0.6433852536468228'], proportion: 50 },
            ],
          },
        },
        '0.2318218992530372': {
          id: '0.2318218992530372',
          link: null,
          meta: { width: 202, height: 40 },
          name: 'logo',
          type: 'image',
          style: { width: '200px' },
          params: {
            url: 'https://wave-editor.s3.eu-central-1.amazonaws.com/components/logo-placeholder.png',
          },
        },
        '0.6433852536468228': {
          id: '0.6433852536468228',
          link: null,
          name: 'rightside',
          type: 'layout',
          style: {},
          params: {
            columns: [
              { children: [], proportion: 44.88 },
              {
                children: ['0.8068297473350075'],
                proportion: 55.12,
              },
            ],
          },
        },
        '0.7439619103958846': {
          id: '0.7439619103958846',
          link: { url: 'https://www.instagram.com/', newTab: true },
          meta: { width: 64, height: 64 },
          name: 'inst',
          type: 'image',
          style: { height: '30px' },
          params: {
            url: 'https://wave-editor.s3.eu-central-1.amazonaws.com/components/instagram.png',
          },
        },
        '0.8068297473350075': {
          id: '0.8068297473350075',
          link: null,
          name: 'icons',
          type: 'layout',
          style: { textAlign: 'center' },
          params: {
            columns: [
              {
                children: ['0.0007533427068231457'],
                proportion: 25,
              },
              { children: ['0.7439619103958846'], proportion: 25 },
              {
                children: ['0.9797900074509625'],
                proportion: 25,
              },
              { children: ['0.11348412019506049'], proportion: 25 },
            ],
          },
        },
        '0.9797900074509625': {
          id: '0.9797900074509625',
          link: { url: 'https://www.youtube.com/', newTab: true },
          meta: { width: 64, height: 64 },
          name: 'youtube',
          type: 'image',
          style: { height: '30px' },
          params: {
            url: 'https://wave-editor.s3.eu-central-1.amazonaws.com/components/youtube.png',
          },
        },
        '0.11348412019506049': {
          id: '0.11348412019506049',
          link: { url: 'https://linkedin.com/', newTab: true },
          meta: { width: 64, height: 64 },
          name: 'linkedin',
          type: 'image',
          style: { height: '30px' },
          params: {
            url: 'https://wave-editor.s3.eu-central-1.amazonaws.com/components/linkedin.png',
          },
        },
        '0.0007533427068231457': {
          id: '0.0007533427068231457',
          link: { url: 'https://facebook.com/', newTab: true },
          meta: { width: 64, height: 64 },
          name: 'fb',
          type: 'image',
          style: { height: '30px' },
          params: {
            url: 'https://wave-editor.s3.eu-central-1.amazonaws.com/components/facebook.png',
          },
        },
      },
      relations: { elementFont: {} },
      variables: [],
    },
    previewHeight: 80,
    createdAt: '2023-10-09T14:54:03.803Z',
    updatedAt: '2023-10-09T14:54:03.803Z',
  },
  {
    id: 3,
    name: 'Header with contacts',
    userId: 1,
    json: {
      config: {
        fonts: [],
        style: {},
        rootElementId: '0.254832381949331',
        viewportWidth: 600,
      },
      elements: {
        '0.254832381949331': {
          id: '0.254832381949331',
          link: null,
          name: 'header',
          type: 'layout',
          style: { padding: '20px' },
          params: {
            columns: [
              {
                style: {},
                children: ['0.2318218992530372'],
                proportion: 50,
              },
              { children: ['0.1466537913027235'], proportion: 50 },
            ],
          },
        },
        '0.1466537913027235': {
          id: '0.1466537913027235',
          link: null,
          name: 'contacts',
          type: 'text',
          style: { fontSize: '14px', textAlign: 'right', lineHeight: '22px' },
          params: {
            content: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      text: '+1 953 123-456-783',
                      type: 'text',
                      marks: [
                        {
                          type: 'link',
                          attrs: {
                            rel: 'noopener noreferrer nofollow',
                            href: 'phone:+1953123456783',
                            class: null,
                            target: '_blank',
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  content: [
                    {
                      text: 'info@company.com',
                      type: 'text',
                      marks: [
                        {
                          type: 'link',
                          attrs: {
                            rel: 'noopener noreferrer nofollow',
                            href: 'mailto:iintersergey@gmail.com',
                            class: null,
                            target: '_blank',
                          },
                        },
                        { type: 'underline' },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        },
        '0.2318218992530372': {
          id: '0.2318218992530372',
          link: null,
          meta: { width: 202, height: 40 },
          name: 'logo',
          type: 'image',
          style: { width: '200px' },
          params: {
            url: 'https://wave-editor.s3.eu-central-1.amazonaws.com/components/logo-placeholder.png',
          },
        },
      },
      relations: { elementFont: {} },
      variables: [],
    },
    previewHeight: 84,
    createdAt: '2023-10-09T15:01:57.761Z',
    updatedAt: '2023-10-09T15:01:57.761Z',
  },
  {
    id: 4,
    name: 'header with social row',
    userId: 1,
    json: {
      config: {
        fonts: [],
        style: {},
        rootElementId: '0.254832381949331',
        viewportWidth: 600,
      },
      elements: {
        '0.254832381949331': {
          id: '0.254832381949331',
          link: null,
          name: 'header',
          type: 'layout',
          style: { padding: '20px', textAlign: 'center' },
          params: {
            columns: [
              {
                children: ['0.2318218992530372', '0.9067728117391001'],
                proportion: 100,
              },
            ],
          },
        },
        '0.2318218992530372': {
          id: '0.2318218992530372',
          link: null,
          meta: { width: 202, height: 40 },
          name: 'logo',
          type: 'image',
          style: { width: '200px' },
          params: {
            url: 'https://wave-editor.s3.eu-central-1.amazonaws.com/components/logo-placeholder.png',
          },
        },
        '0.5570919937897845': {
          id: '0.5570919937897845',
          link: null,
          name: 'icons',
          type: 'layout',
          style: { textAlign: 'center' },
          params: {
            columns: [
              {
                children: ['0.6232309183335885'],
                proportion: 25,
              },
              { children: ['0.6672311268190878'], proportion: 25 },
              {
                children: ['0.6793697521661888'],
                proportion: 25,
              },
              { children: ['0.9235176812454686'], proportion: 25 },
            ],
          },
        },
        '0.6232309183335885': {
          id: '0.6232309183335885',
          link: { url: 'https://facebook.com/', newTab: true },
          meta: { width: 64, height: 64 },
          name: 'fb',
          type: 'image',
          style: { height: '30px' },
          params: {
            url: 'https://wave-editor.s3.eu-central-1.amazonaws.com/components/facebook.png',
          },
        },
        '0.6672311268190878': {
          id: '0.6672311268190878',
          link: { url: 'https://www.instagram.com/', newTab: true },
          meta: { width: 64, height: 64 },
          name: 'inst',
          type: 'image',
          style: { height: '30px' },
          params: {
            url: 'https://wave-editor.s3.eu-central-1.amazonaws.com/components/instagram.png',
          },
        },
        '0.6793697521661888': {
          id: '0.6793697521661888',
          link: { url: 'https://www.youtube.com/', newTab: true },
          meta: { width: 64, height: 64 },
          name: 'youtube',
          type: 'image',
          style: { height: '30px' },
          params: {
            url: 'https://wave-editor.s3.eu-central-1.amazonaws.com/components/youtube.png',
          },
        },
        '0.9067728117391001': {
          id: '0.9067728117391001',
          link: null,
          name: 'second row',
          type: 'layout',
          style: { padding: '25px 0px 0px' },
          params: {
            columns: [
              { children: [], proportion: 33.33 },
              {
                children: ['0.5570919937897845'],
                proportion: 33.33,
              },
              { children: [], proportion: 33.33 },
            ],
          },
        },
        '0.9235176812454686': {
          id: '0.9235176812454686',
          link: { url: 'https://linkedin.com/', newTab: true },
          meta: { width: 64, height: 64 },
          name: 'linkedin',
          type: 'image',
          style: { height: '30px' },
          params: {
            url: 'https://wave-editor.s3.eu-central-1.amazonaws.com/components/linkedin.png',
          },
        },
      },
      relations: { elementFont: {} },
      variables: [],
    },
    previewHeight: 135,
    createdAt: '2023-10-09T15:05:10.407Z',
    updatedAt: '2023-10-09T15:05:10.407Z',
  },
  {
    id: 5,
    name: 'Dark footer',
    userId: 1,
    json: {
      config: {
        fonts: [
          {
            id: '0.6593136584276968',
            url: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap',
            name: 'Open Sans',
            fallback: 'Helvetica',
            genericFamily: 'sans-serif',
          },
        ],
        style: {},
        rootElementId: '0.18428953619941435',
        viewportWidth: 700,
      },
      elements: {
        '0.691369542084963': {
          id: '0.691369542084963',
          link: null,
          name: 'footer header 1',
          type: 'text',
          style: {
            color: '#ffffff',
            padding: '0px 0px 20px',
            fontSize: '14px',
            lineHeight: '22px',
          },
          params: {
            content: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      text: 'PREFERENCES',
                      type: 'text',
                      marks: [{ type: 'bold' }],
                    },
                  ],
                },
              ],
            },
          },
        },
        '0.2211801490309886': {
          id: '0.2211801490309886',
          link: null,
          name: 'footer header 2',
          type: 'text',
          style: {
            color: '#ffffff',
            padding: '0px 0px 20px',
            fontSize: '14px',
            lineHeight: '22px',
          },
          params: {
            content: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      text: 'MORE LINKS',
                      type: 'text',
                      marks: [{ type: 'bold' }],
                    },
                  ],
                },
              ],
            },
          },
        },
        '0.3913364375144217': {
          id: '0.3913364375144217',
          link: null,
          name: 'preferences',
          type: 'text',
          style: { color: '#939393', fontSize: '14px', lineHeight: '22px' },
          params: {
            content: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      text: 'Unsubscribe',
                      type: 'text',
                      marks: [
                        {
                          type: 'link',
                          attrs: {
                            rel: 'noopener noreferrer nofollow',
                            href: 'https://e.email.forbes.com/',
                            class: null,
                            target: '_blank',
                          },
                        },
                        { type: 'underline' },
                      ],
                    },
                    { text: ' from Unlimited Access Marketing', type: 'text' },
                  ],
                },
                { type: 'paragraph' },
                {
                  type: 'paragraph',
                  content: [
                    {
                      text: 'Click here',
                      type: 'text',
                      marks: [
                        {
                          type: 'link',
                          attrs: {
                            rel: 'noopener noreferrer nofollow',
                            href: 'http://e.email.forbes.com/',
                            class: null,
                            target: '_blank',
                          },
                        },
                        { type: 'underline' },
                      ],
                    },
                    {
                      text: ' to opt-out of all  marketing emails.',
                      type: 'text',
                    },
                  ],
                },
                { type: 'paragraph' },
                {
                  type: 'paragraph',
                  content: [
                    {
                      text: 'Manage',
                      type: 'text',
                      marks: [
                        {
                          type: 'link',
                          attrs: {
                            rel: 'noopener noreferrer nofollow',
                            href: 'https://e.email.forbes.com/',
                            class: null,
                            target: '_blank',
                          },
                        },
                        { type: 'underline' },
                      ],
                    },
                    { text: ' Email Preferences', type: 'text' },
                  ],
                },
              ],
            },
          },
        },
        '0.9646999953982722': {
          id: '0.9646999953982722',
          link: null,
          name: 'links',
          type: 'text',
          style: { color: '#939393', fontSize: '14px', lineHeight: '26px' },
          params: {
            content: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      text: 'My Account',
                      type: 'text',
                      marks: [
                        {
                          type: 'link',
                          attrs: {
                            rel: 'noopener noreferrer nofollow',
                            href: 'https://e.email.forbes.com/c2/869:64ef678f78abe2ff0c022c64:ot:5e4d3a2b5b099ce02fc101a5:1/53be803c?jwtH=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9&jwtP=eyJpYXQiOjE2OTM2NjM5NDksImNkIjoiLmVtYWlsLmZvcmJlcy5jb20iLCJjZSI6ODY0MDAsInRrIjoiZm9yYmVzLWxpdmUiLCJtdGxJRCI6IjY0ZjBmNDdlNGVkNjVjYTVlMzA0YmU4YyIsImxpbmtVcmwiOiJodHRwczpcL1wvYWNjb3VudC5mb3JiZXMuY29tXC8_Y2RsY2lkPTVlNGQzYTJiNWIwOTljZTAyZmMxMDFhNSJ9&jwtS=6zzLZghAY-4uGC8uUIpK9Y5mhQeS9Xlbporf5NAEyu8',
                            class: null,
                            target: '_blank',
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  content: [
                    {
                      text: 'Newsletters',
                      type: 'text',
                      marks: [
                        {
                          type: 'link',
                          attrs: {
                            rel: 'noopener noreferrer nofollow',
                            href: 'https://e.email.forbes.com/c2/869:64ef678f78abe2ff0c022c64:ot:5e4d3a2b5b099ce02fc101a5:1/9353d812?jwtH=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9&jwtP=eyJpYXQiOjE2OTM2NjM5NDksImNkIjoiLmVtYWlsLmZvcmJlcy5jb20iLCJjZSI6ODY0MDAsInRrIjoiZm9yYmVzLWxpdmUiLCJtdGxJRCI6IjY0ZjBmNDdlNGVkNjVjYTVlMzA0YmU4ZCIsImxpbmtVcmwiOiJodHRwczpcL1wvYWNjb3VudC5mb3JiZXMuY29tXC9uZXdzbGV0dGVycz9jZGxjaWQ9NWU0ZDNhMmI1YjA5OWNlMDJmYzEwMWE1In0&jwtS=qSYyCpmS6VOXbG7PrXuBjiqvtrA1DaVxNiYYuX6y2ko',
                            class: null,
                            target: '_blank',
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  content: [
                    {
                      text: 'Help',
                      type: 'text',
                      marks: [
                        {
                          type: 'link',
                          attrs: {
                            rel: 'noopener noreferrer nofollow',
                            href: 'https://e.email.forbes.com/c2/869:64ef678f78abe2ff0c022c64:ot:5e4d3a2b5b099ce02fc101a5:1/e586361e?jwtH=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9&jwtP=eyJpYXQiOjE2OTM2NjM5NDksImNkIjoiLmVtYWlsLmZvcmJlcy5jb20iLCJjZSI6ODY0MDAsInRrIjoiZm9yYmVzLWxpdmUiLCJtdGxJRCI6IjY0ZjBmNDdlNGVkNjVjYTVlMzA0YmU4ZSIsImxpbmtVcmwiOiJodHRwczpcL1wvaGVscC5mb3JiZXMuY29tXC9zdXBwb3J0XC9ob21lP2NkbGNpZD01ZTRkM2EyYjViMDk5Y2UwMmZjMTAxYTUifQ&jwtS=cLZWM_tndYS6nLki7ou7R5T8rPJ-cKm_yfIv1EFXWBE',
                            class: null,
                            target: '_blank',
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  content: [
                    {
                      text: 'Privacy',
                      type: 'text',
                      marks: [
                        {
                          type: 'link',
                          attrs: {
                            rel: 'noopener noreferrer nofollow',
                            href: 'http://e.email.forbes.com/c2/869:64ef678f78abe2ff0c022c64:ot:5e4d3a2b5b099ce02fc101a5:1/c3d6b2cd?jwtH=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9&jwtP=eyJpYXQiOjE2OTM2NjM5NDksImNkIjoiLmVtYWlsLmZvcmJlcy5jb20iLCJjZSI6ODY0MDAsInRrIjoiZm9yYmVzLWxpdmUiLCJtdGxJRCI6IjY0ZjBmNDdlNGVkNjVjYTVlMzA0YmU4ZiIsImxpbmtVcmwiOiJodHRwOlwvXC93d3cuZm9yYmVzLmNvbVwvZmRjXC9wcml2YWN5Lmh0bWw_Y2RsY2lkPTVlNGQzYTJiNWIwOTljZTAyZmMxMDFhNSJ9&jwtS=XaCTbGaAfSPws3Wk-MW-tgPL1s2sRNucWwVEKlEs_8E',
                            class: null,
                            target: '_blank',
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        },
        '0.9801058442311088': {
          id: '0.9801058442311088',
          link: null,
          name: 'text4',
          type: 'text',
          style: { color: '#939393', fontSize: '14px', lineHeight: '22px' },
          params: {
            content: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
          },
        },
        '0.18428953619941435': {
          id: '0.18428953619941435',
          link: null,
          name: 'footer',
          type: 'layout',
          style: {
            padding: '30px 50px 20px',
            verticalAlign: 'top',
            backgroundColor: '#191919',
          },
          params: {
            gap: 20,
            columns: [
              {
                children: ['0.49946369696069937', '0.9801058442311088'],
                proportion: 33.33,
              },
              {
                style: {},
                children: ['0.691369542084963', '0.3913364375144217'],
                proportion: 33.33,
              },
              {
                style: {},
                children: ['0.2211801490309886', '0.9646999953982722'],
                proportion: 33.33,
              },
            ],
          },
        },
        '0.49946369696069937': {
          id: '0.49946369696069937',
          link: null,
          meta: { width: 202, height: 40 },
          name: 'logo',
          type: 'image',
          style: { width: '130px', padding: '0px 0px 20px' },
          params: {
            url: 'https://wave-editor.s3.eu-central-1.amazonaws.com/components/logo-placeholder.png',
          },
        },
      },
      relations: {
        elementFont: {
          '0.691369542084963': '0.6593136584276968',
          '0.2211801490309886': '0.6593136584276968',
          '0.3913364375144217': '0.6593136584276968',
          '0.9646999953982722': '0.6593136584276968',
          '0.9801058442311088': '0.6593136584276968',
        },
      },
      variables: [],
    },
    previewHeight: 206,
    createdAt: '2023-10-09T15:36:08.515Z',
    updatedAt: '2023-10-09T15:36:08.515Z',
  },
  {
    id: 6,
    name: '3 columns with image',
    userId: 1,
    json: {
      config: {
        fonts: [
          {
            id: '0.22362874502575214',
            fallback: 'Arial',
            genericFamily: 'sans-serif',
          },
        ],
        style: {},
        rootElementId: '0.5797910503538968',
        viewportWidth: 600,
      },
      elements: {
        '0.723109871853588': {
          id: '0.723109871853588',
          link: null,
          name: 'text2',
          type: 'text',
          style: {
            padding: '20px 0px 0px',
            fontSize: '16px',
            lineHeight: '18px',
          },
          params: {
            content: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      text: 'As the temperatures drop, Europe comes into its own. Here are the less crowded places you may want to visit.',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
          },
        },
        '0.925574582540857': {
          id: '0.925574582540857',
          link: null,
          name: 'text3',
          type: 'text',
          style: { padding: '20px 0px 0px' },
          params: {
            content: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      text: 'We put the two Indian Ocean heavyweights head-to-head to find out which island comes out on top for beaches.',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
          },
        },
        '0.2528169730061969': {
          id: '0.2528169730061969',
          link: null,
          name: 'header',
          type: 'text',
          style: {
            padding: '20px 0px 0px',
            fontSize: '22px',
            lineHeight: '24px',
          },
          params: {
            content: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      text: 'What It’s Really Like to Visit Italy in November ',
                      type: 'text',
                      marks: [{ type: 'bold' }],
                    },
                  ],
                },
              ],
            },
          },
        },
        '0.2908977521724714': {
          id: '0.2908977521724714',
          link: null,
          meta: { width: 600, height: 400 },
          name: 'image2',
          type: 'image',
          style: { borderRadius: '10px' },
          params: {
            url: 'https://images.pexels.com/photos/3320529/pexels-photo-3320529.jpeg?auto=compress&cs=tinysrgb&w=300&h=750&dpr=2',
          },
        },
        '0.3252197848702201': {
          id: '0.3252197848702201',
          link: null,
          name: '3 col root',
          type: 'layout',
          style: {
            margin: '0px auto',
            padding: '20px',
            backgroundColor: '#ffffff',
          },
          params: {
            columns: [
              {
                children: ['0.5110246743408449', '0.3929594355050967'],
                proportion: 100,
              },
            ],
          },
        },
        '0.3453015556381245': {
          id: '0.3453015556381245',
          link: null,
          name: 'layout',
          type: 'layout',
          style: {},
          params: {
            columns: [
              {
                style: {},
                children: ['0.2528169730061969', '0.4916175368240705'],
                proportion: 100,
              },
            ],
          },
        },
        '0.3929594355050967': {
          id: '0.3929594355050967',
          link: null,
          name: 'content',
          type: 'layout',
          style: { verticalAlign: 'top' },
          params: {
            gap: 15,
            columns: [
              { children: ['0.3453015556381245'], proportion: 33.33 },
              {
                children: ['0.4777233995687096'],
                proportion: 33.33,
              },
              { children: ['0.6138635327553645'], proportion: 33.33 },
            ],
          },
        },
        '0.4777233995687096': {
          id: '0.4777233995687096',
          link: null,
          name: 'layout2',
          type: 'layout',
          style: {},
          params: {
            columns: [
              {
                children: ['0.8286793312237646', '0.723109871853588'],
                proportion: 100,
              },
            ],
          },
        },
        '0.4916175368240705': {
          id: '0.4916175368240705',
          link: null,
          name: 'text',
          type: 'text',
          style: {
            padding: '20px 0px 0px',
            fontSize: '16px',
            lineHeight: '18px',
          },
          params: {
            content: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      text: 'If you are just looking for a short answer to the question of whether it’s a good idea to visit Italy in November, then I’d say go for it. ',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
          },
        },
        '0.5017106107337306': {
          id: '0.5017106107337306',
          link: null,
          meta: { width: 600, height: 400 },
          name: 'image1',
          type: 'image',
          style: { borderRadius: '10px' },
          params: {
            url: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=300&h=750&dpr=2',
          },
        },
        '0.5110246743408449': {
          id: '0.5110246743408449',
          link: null,
          name: 'images',
          type: 'layout',
          style: { verticalAlign: 'top' },
          params: {
            gap: 15,
            columns: [
              {
                children: ['0.48635179043929866'],
                proportion: 33.33,
              },
              { children: ['0.5017106107337306'], proportion: 33.33 },
              {
                children: ['0.2908977521724714'],
                proportion: 33.33,
              },
            ],
          },
        },
        '0.5797910503538968': {
          id: '0.5797910503538968',
          link: null,
          name: 'layout',
          type: 'layout',
          style: {
            margin: '0px auto',
            padding: '0px',
            backgroundColor: '#fff',
          },
          params: {
            columns: [{ children: ['0.3252197848702201'], proportion: 100 }],
          },
        },
        '0.6138635327553645': {
          id: '0.6138635327553645',
          link: null,
          name: 'layout3',
          type: 'layout',
          style: {},
          params: {
            columns: [
              {
                children: ['0.21633317771267757', '0.925574582540857'],
                proportion: 100,
              },
            ],
          },
        },
        '0.8286793312237646': {
          id: '0.8286793312237646',
          link: null,
          name: 'header1',
          type: 'text',
          style: {
            padding: '20px 0px 0px',
            fontSize: '22px',
            lineHeight: '24px',
          },
          params: {
            content: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      text: 'Europe’s fall destinations for those in the know',
                      type: 'text',
                      marks: [{ type: 'bold' }],
                    },
                  ],
                },
              ],
            },
          },
        },
        '0.21633317771267757': {
          id: '0.21633317771267757',
          link: null,
          name: 'header2',
          type: 'text',
          style: {
            padding: '20px 0px 0px',
            fontSize: '22px',
            lineHeight: '24px',
          },
          params: {
            content: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      text: 'Maldives vs Mauritius: which is the real winner?',
                      type: 'text',
                      marks: [{ type: 'bold' }],
                    },
                  ],
                },
              ],
            },
          },
        },
        '0.48635179043929866': {
          id: '0.48635179043929866',
          link: null,
          meta: { width: 600, height: 400 },
          name: 'image',
          type: 'image',
          style: { borderRadius: '10px' },
          params: {
            url: 'https://images.pexels.com/photos/307007/pexels-photo-307007.jpeg?auto=compress&cs=tinysrgb&w=300&dpr=2',
          },
        },
      },
      relations: {
        elementFont: { '0.8286793312237646': '0.22362874502575214' },
      },
      variables: [],
    },
    previewHeight: 386,
    createdAt: '2023-10-09T15:52:03.345Z',
    updatedAt: '2023-10-09T15:52:03.345Z',
  },
  {
    id: 7,
    name: 'Image BG call to action',
    userId: 1,
    json: {
      config: {
        fonts: [
          {
            id: '0.4464797957426785',
            fallback: 'Tahoma',
            genericFamily: 'sans-serif',
          },
        ],
        style: {},
        rootElementId: '0.34380051368932607',
        viewportWidth: 600,
      },
      elements: {
        '0.0975247213307826': {
          id: '0.0975247213307826',
          link: null,
          name: 'text',
          type: 'text',
          style: {
            color: '#ffffff',
            width: '510px',
            padding: '0px 0px 60px',
            fontSize: '64px',
            textAlign: 'left',
          },
          params: {
            content: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    { text: 'Best', type: 'text', marks: [{ type: 'bold' }] },
                  ],
                },
                {
                  type: 'paragraph',
                  content: [
                    {
                      text: 'Holiday',
                      type: 'text',
                      marks: [{ type: 'bold' }],
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  content: [
                    {
                      text: 'Destination 2024',
                      type: 'text',
                      marks: [{ type: 'bold' }],
                    },
                  ],
                },
              ],
            },
          },
        },
        '0.5006910873074122': {
          id: '0.5006910873074122',
          link: null,
          meta: { width: 202, height: 40 },
          name: 'logo',
          type: 'image',
          style: { width: '200px', padding: '0px 0px 60px' },
          params: {
            url: 'https://wave-editor.s3.eu-central-1.amazonaws.com/components/logo-placeholder.png',
          },
        },
        '0.05210121443646454': {
          id: '0.05210121443646454',
          link: null,
          name: 'text1',
          type: 'text',
          style: {
            color: '#414141',
            width: '500px',
            padding: '20px 0px',
            fontSize: '24px',
            borderRadius: '10px',
            backgroundColor: '#ffffff',
          },
          params: {
            content: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      text: 'Order now',
                      type: 'text',
                      marks: [{ type: 'bold' }],
                    },
                  ],
                },
              ],
            },
          },
        },
        '0.34380051368932607': {
          id: '0.34380051368932607',
          link: null,
          name: 'layout',
          type: 'layout',
          style: {
            margin: '0px auto',
            padding: '60px 0px',
            textAlign: 'center',
            borderRadius: '20px 20px 0px 0px',
            backgroundSize: 'cover',
            backgroundImage:
              'https://images.pexels.com/photos/4321802/pexels-photo-4321802.jpeg?auto=compress&cs=tinysrgb&w=300&h=750&dpr=2',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'bottom',
          },
          params: {
            columns: [
              {
                children: [
                  '0.5006910873074122',
                  '0.0975247213307826',
                  '0.05210121443646454',
                ],
                proportion: 100,
              },
            ],
          },
        },
      },
      relations: {
        elementFont: { '0.05210121443646454': '0.4464797957426785' },
      },
      variables: [],
    },
    previewHeight: 657,
    createdAt: '2023-10-09T16:05:21.443Z',
    updatedAt: '2023-10-09T16:05:21.443Z',
  },
  {
    id: 8,
    name: 'List item with image',
    userId: 1,
    json: {
      config: {
        fonts: [],
        style: {},
        rootElementId: '0.2385611861356407',
        viewportWidth: 600,
      },
      elements: {
        '0.2385611861356407': {
          id: '0.2385611861356407',
          link: null,
          name: 'item',
          type: 'layout',
          style: {},
          params: {
            gap: 20,
            columns: [
              {
                children: ['0.8339123217798228'],
                proportion: 30.22,
              },
              {
                style: { verticalAlign: 'top' },
                children: [
                  '0.6601702127632119',
                  '0.29991482688920734',
                  '0.22554489161044233',
                ],
                proportion: 69.78,
              },
            ],
          },
        },
        '0.6601702127632119': {
          id: '0.6601702127632119',
          link: null,
          name: 'header',
          type: 'text',
          style: {
            color: '#21293c',
            padding: '0px 0px 30px',
            fontSize: '16px',
            lineHeight: '24px',
          },
          params: {
            content: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      text: 'Digma.ai',
                      type: 'text',
                      marks: [{ type: 'bold' }],
                    },
                  ],
                },
              ],
            },
          },
        },
        '0.8339123217798228': {
          id: '0.8339123217798228',
          link: null,
          meta: { width: 240, height: 240 },
          name: 'image',
          type: 'image',
          style: { width: '136px', height: '136px', borderRadius: '5px' },
          params: {
            url: 'https://ph-files.imgix.net/3417301a-dafb-4cce-8cf0-6a02375cdaa2.gif',
          },
        },
        '0.22554489161044233': {
          id: '0.22554489161044233',
          link: null,
          name: 'footer',
          type: 'text',
          style: { color: '#4b587c', fontSize: '14px', lineHeight: '24px' },
          params: {
            content: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      text: 'Because you are interested in ',
                      type: 'text',
                      marks: [
                        {
                          type: 'link',
                          attrs: {
                            rel: 'noopener noreferrer nofollow',
                            href: 'https://links-i.producthunt.com/u/click?_t=5087b63679ef40be82eb21820e92e1ec&_m=a5d0dc6692c5412499e27647bcfda587&_e=fV25xB35KC43f_QSHSIi3CLyZ9Gxmq1PjbKTfDXAj2Wc7w5qRwWLkglDuIOPhqBHV9jr7co0cZyRrYZ0GmXk4AY0ajLRIzKgJ4qITNL2oNBEYhsbl-Li66ldA0v63MNe_JBtWK-ln_4GFrgHkzBjq0ps20k6MDQpHhUOUmeaqz2Yisaa4uLhqleL7oK8M_JmU4xCZMdpXgEk9Scnf1hzO_mSpUnoTr6MbQSU3u5nCTuLm3VwJw5oXUUpJRPYOik9qg_L5CZw9SCxJFVurYfidlrzspUNb9fqwNowUMOA4PBeqK73W45bAIrPl8OADmrASxJg2MnbdDqPLC6UKdODCA%3D%3D',
                            class: null,
                            target: '_blank',
                          },
                        },
                        { type: 'italic' },
                      ],
                    },
                    {
                      text: 'Developer Tools',
                      type: 'text',
                      marks: [
                        {
                          type: 'link',
                          attrs: {
                            rel: 'noopener noreferrer nofollow',
                            href: 'https://links-i.producthunt.com/u/click?_t=5087b63679ef40be82eb21820e92e1ec&_m=a5d0dc6692c5412499e27647bcfda587&_e=fV25xB35KC43f_QSHSIi3CLyZ9Gxmq1PjbKTfDXAj2Wc7w5qRwWLkglDuIOPhqBHV9jr7co0cZyRrYZ0GmXk4AY0ajLRIzKgJ4qITNL2oNBEYhsbl-Li66ldA0v63MNe_JBtWK-ln_4GFrgHkzBjq0ps20k6MDQpHhUOUmeaqz2Yisaa4uLhqleL7oK8M_JmU4xCZMdpXgEk9Scnf1hzO_mSpUnoTr6MbQSU3u5nCTuLm3VwJw5oXUUpJRPYOik9qg_L5CZw9SCxJFVurYfidlrzspUNb9fqwNowUMOA4PBeqK73W45bAIrPl8OADmrASxJg2MnbdDqPLC6UKdODCA%3D%3D',
                            class: null,
                            target: '_blank',
                          },
                        },
                        { type: 'bold' },
                        { type: 'italic' },
                      ],
                    },
                    {
                      text: '.',
                      type: 'text',
                      marks: [
                        {
                          type: 'link',
                          attrs: {
                            rel: 'noopener noreferrer nofollow',
                            href: 'https://links-i.producthunt.com/u/click?_t=5087b63679ef40be82eb21820e92e1ec&_m=a5d0dc6692c5412499e27647bcfda587&_e=fV25xB35KC43f_QSHSIi3CLyZ9Gxmq1PjbKTfDXAj2Wc7w5qRwWLkglDuIOPhqBHV9jr7co0cZyRrYZ0GmXk4AY0ajLRIzKgJ4qITNL2oNBEYhsbl-Li66ldA0v63MNe_JBtWK-ln_4GFrgHkzBjq0ps20k6MDQpHhUOUmeaqz2Yisaa4uLhqleL7oK8M_JmU4xCZMdpXgEk9Scnf1hzO_mSpUnoTr6MbQSU3u5nCTuLm3VwJw5oXUUpJRPYOik9qg_L5CZw9SCxJFVurYfidlrzspUNb9fqwNowUMOA4PBeqK73W45bAIrPl8OADmrASxJg2MnbdDqPLC6UKdODCA%3D%3D',
                            class: null,
                            target: '_blank',
                          },
                        },
                        { type: 'italic' },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        },
        '0.29991482688920734': {
          id: '0.29991482688920734',
          link: null,
          name: 'description',
          type: 'text',
          style: {
            color: '#4b587c',
            padding: '0px 0px 30px',
            fontSize: '14px',
            lineHeight: '24px',
          },
          params: {
            content: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      text: 'See what your code is doing wrong, as you code, in the IDE',
                      type: 'text',
                      marks: [
                        {
                          type: 'link',
                          attrs: {
                            rel: 'noopener noreferrer nofollow',
                            href: 'https://links-i.producthunt.com/u/click?_t=5087b63679ef40be82eb21820e92e1ec&_m=a5d0dc6692c5412499e27647bcfda587&_e=fV25xB35KC43f_QSHSIi3CLyZ9Gxmq1PjbKTfDXAj2Wc7w5qRwWLkglDuIOPhqBHV9jr7co0cZyRrYZ0GmXk4AY0ajLRIzKgJ4qITNL2oNBEYhsbl-Li66ldA0v63MNe_JBtWK-ln_4GFrgHkzBjq0ps20k6MDQpHhUOUmeaqz2Yisaa4uLhqleL7oK8M_JmhQdhgQulQHCinqBSsAtWLYXkDPETrshoqooUbISZH0qBmDl554Ihen3FVrjxsTtMUmcn6kJsL3EJpCFDLCSp5qhPPS0ydeFdmBwBz5ft7reaKdsPhIa7kYsA6BaOaoMwxRf_V-JknNGojL7sw4zvaQ%3D%3D',
                            class: null,
                            target: '_blank',
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        },
      },
      relations: { elementFont: {} },
      variables: [],
    },
    previewHeight: 136,
    createdAt: '2023-10-10T07:44:20.537Z',
    updatedAt: '2023-10-10T07:44:20.537Z',
  },
  {
    id: 9,
    name: 'One column with button',
    userId: 1,
    json: {
      config: {
        fonts: [],
        style: {},
        rootElementId: '0.19144047517338203',
        viewportWidth: 600,
      },
      elements: {
        '0.2911730708321485': {
          id: '0.2911730708321485',
          link: null,
          name: 'layout1',
          type: 'layout',
          style: {
            height: '330px',
            borderRadius: '5px',
            backgroundSize: 'cover',
            backgroundImage:
              'https://images.pexels.com/photos/6157041/pexels-photo-6157041.jpeg?auto=compress&cs=tinysrgb&w=600&h=750',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          },
          params: { columns: [{ children: [], proportion: 100 }] },
        },
        '0.3365373358432773': {
          id: '0.3365373358432773',
          link: null,
          name: 'text',
          type: 'text',
          style: {
            color: '#121316',
            padding: '20px 0px',
            fontSize: '16px',
            textAlign: 'left',
            lineHeight: '26px',
          },
          params: {
            content: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
          },
        },
        '0.5404882666692203': {
          id: '0.5404882666692203',
          link: null,
          name: 'button',
          type: 'text',
          style: {
            color: '#ffffff',
            width: '190px',
            padding: '8px 0px',
            fontSize: '16px',
            textAlign: 'center',
            lineHeight: '24px',
            borderRadius: '4px',
            backgroundColor: '#2980b9',
          },
          params: {
            content: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      text: 'START READING',
                      type: 'text',
                      marks: [{ type: 'bold' }],
                    },
                  ],
                },
              ],
            },
          },
        },
        '0.10058991207848855': {
          id: '0.10058991207848855',
          link: null,
          name: 'header',
          type: 'text',
          style: {
            color: '#202020',
            padding: '20px 0px 0px',
            fontSize: '18px',
            textAlign: 'left',
            lineHeight: '24px',
          },
          params: {
            content: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      text: 'Check out the top stories you might have missed recently.',
                      type: 'text',
                      marks: [{ type: 'bold' }],
                    },
                  ],
                },
              ],
            },
          },
        },
        '0.19144047517338203': {
          id: '0.19144047517338203',
          link: null,
          name: 'item',
          type: 'layout',
          style: { textAlign: 'center' },
          params: {
            columns: [
              {
                children: [
                  '0.2911730708321485',
                  '0.10058991207848855',
                  '0.3365373358432773',
                  '0.5404882666692203',
                ],
                proportion: 100,
              },
            ],
          },
        },
      },
      relations: { elementFont: {} },
      variables: [],
    },
    previewHeight: 532,
    createdAt: '2023-10-10T07:59:15.596Z',
    updatedAt: '2023-10-10T07:59:15.596Z',
  },
];
