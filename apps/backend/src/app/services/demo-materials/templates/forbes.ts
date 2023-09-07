import { EditorSnapshot } from '@waveditors/editor-model';

export const ForbesTemplate: EditorSnapshot = {
  config: {
    fonts: [
      {
        id: '0.12219437662183785',
        url: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap',
        name: 'Poppins',
        fallback: 'Helvetica',
        genericFamily: 'sans-serif',
      },
      {
        id: '0.7797112123824887',
        url: 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;600&display=swap',
        name: 'Work Sans',
        fallback: 'Arial',
        genericFamily: 'serif',
      },
      {
        id: '0.6593136584276968',
        url: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap',
        name: 'Open Sans',
        fallback: 'Helvetica',
        genericFamily: 'sans-serif',
      },
    ],
    style: {
      margin: '0',
      fontSize: '16px',
      backgroundColor: '#F7F7F7',
    },
    rootElementId: '0.42998990503198664',
    viewportWidth: 700,
  },
  elements: {
    '0.564416205483032': {
      id: '0.564416205483032',
      link: null,
      name: 'main content',
      type: 'layout',
      style: {
        padding: '30px 130px',
        backgroundColor: '#ffffff',
      },
      params: {
        columns: [
          {
            children: [
              '0.7726873757593369',
              '0.32670942046105345',
              '0.4469762444924079',
              '0.5302520432134668',
              '0.7684601712486583',
              '0.7614446921159275',
              '0.9910187986678045',
              '0.9991282704525641',
              '0.24033503158584169',
              '0.3222302736979712',
            ],
            proportion: 100,
          },
        ],
      },
    },
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
                  marks: [
                    {
                      type: 'bold',
                    },
                  ],
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
                  marks: [
                    {
                      type: 'bold',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    },
    '0.2845336825293603': {
      id: '0.2845336825293603',
      link: null,
      meta: {
        width: 341,
        height: 304,
      },
      name: 'image4',
      type: 'image',
      style: {
        width: '35px',
      },
      params: {
        url: 'https://ci5.googleusercontent.com/proxy/IjCanDZ41pC5gxMukyoio6XOiW12orcRNoc32jQ3nbft3kjMkLR_QkEkuwh-xElGW9YofaVADJLaUoTuXJh9ROqN55sAxJQEWXGi=s0-d-e1-ft#https://images.cordial.com/869/341x304/checkbox-grey.png',
      },
    },
    '0.3222302736979712': {
      id: '0.3222302736979712',
      link: null,
      name: 'button container',
      type: 'layout',
      style: {
        padding: '40px 0px 0px',
        textAlign: 'center',
      },
      params: {
        columns: [
          {
            children: ['0.8824741731913492'],
            proportion: 100,
          },
        ],
      },
    },
    '0.3683207730803302': {
      id: '0.3683207730803302',
      link: null,
      name: 'text12',
      type: 'text',
      style: {
        color: '#333333',
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
                  text: 'Have premium, smooth browsing. Enjoy an ad-light reading experience with fewer ads and interruptions.',
                  type: 'text',
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
      style: {
        color: '#939393',
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
                    {
                      type: 'underline',
                    },
                  ],
                },
                {
                  text: ' from Unlimited Access Marketing',
                  type: 'text',
                },
              ],
            },
            {
              type: 'paragraph',
            },
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
                    {
                      type: 'underline',
                    },
                  ],
                },
                {
                  text: ' to opt-out of all Forbes marketing emails that include invites to LIVE events, suggested content, and special member offers.',
                  type: 'text',
                },
              ],
            },
            {
              type: 'paragraph',
            },
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
                    {
                      type: 'underline',
                    },
                  ],
                },
                {
                  text: ' Email Preferences',
                  type: 'text',
                },
              ],
            },
          ],
        },
      },
    },
    '0.4469762444924079': {
      id: '0.4469762444924079',
      link: null,
      name: 'list description',
      type: 'text',
      style: {
        color: '#333333',
        padding: '0px 0px 20px',
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
                  text: 'Your member-exclusive benefits:',
                  type: 'text',
                },
              ],
            },
          ],
        },
      },
    },
    '0.4993885109326879': {
      id: '0.4993885109326879',
      link: null,
      meta: {
        width: 341,
        height: 304,
      },
      name: 'image5',
      type: 'image',
      style: {
        width: '35px',
      },
      params: {
        url: 'https://ci5.googleusercontent.com/proxy/IjCanDZ41pC5gxMukyoio6XOiW12orcRNoc32jQ3nbft3kjMkLR_QkEkuwh-xElGW9YofaVADJLaUoTuXJh9ROqN55sAxJQEWXGi=s0-d-e1-ft#https://images.cordial.com/869/341x304/checkbox-grey.png',
      },
    },
    '0.5302520432134668': {
      id: '0.5302520432134668',
      link: null,
      name: 'list item1',
      type: 'layout',
      style: {
        padding: '0px 0px 20px',
      },
      params: {
        gap: 10,
        columns: [
          {
            style: {
              textAlign: 'center',
            },
            children: ['0.7661747971972894'],
            proportion: 10,
          },
          {
            children: ['0.21735189934253074'],
            proportion: 90,
          },
        ],
      },
    },
    '0.6771465086959636': {
      id: '0.6771465086959636',
      link: null,
      name: 'text11',
      type: 'text',
      style: {
        color: '#333333',
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
                  text: 'Join the league of global leaders. Member-only events allow you to connect with the best in business and industry, gaining exclusive insights to drive your own success story.',
                  type: 'text',
                },
              ],
            },
          ],
        },
      },
    },
    '0.7614446921159275': {
      id: '0.7614446921159275',
      link: null,
      name: 'list item2',
      type: 'layout',
      style: {
        padding: '0px 0px 20px',
      },
      params: {
        gap: 10,
        columns: [
          {
            style: {
              textAlign: 'center',
            },
            children: ['0.2845336825293603'],
            proportion: 10,
          },
          {
            children: ['0.6771465086959636'],
            proportion: 90,
          },
        ],
      },
    },
    '0.7661747971972894': {
      id: '0.7661747971972894',
      link: null,
      meta: {
        width: 341,
        height: 304,
      },
      name: 'image2',
      type: 'image',
      style: {
        width: '35px',
      },
      params: {
        url: 'https://ci5.googleusercontent.com/proxy/IjCanDZ41pC5gxMukyoio6XOiW12orcRNoc32jQ3nbft3kjMkLR_QkEkuwh-xElGW9YofaVADJLaUoTuXJh9ROqN55sAxJQEWXGi=s0-d-e1-ft#https://images.cordial.com/869/341x304/checkbox-grey.png',
      },
    },
    '0.7684601712486583': {
      id: '0.7684601712486583',
      link: null,
      name: 'list item2',
      type: 'layout',
      style: {
        padding: '0px 0px 20px',
      },
      params: {
        gap: 10,
        columns: [
          {
            style: {
              textAlign: 'center',
            },
            children: ['0.7991050237474366'],
            proportion: 10,
          },
          {
            children: ['0.8529751624966742'],
            proportion: 90,
          },
        ],
      },
    },
    '0.7726873757593369': {
      id: '0.7726873757593369',
      link: null,
      name: 'welcome text',
      type: 'text',
      style: {
        color: '#333333',
        padding: '0px',
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
                  text: 'Dear valued ',
                  type: 'text',
                },
                {
                  type: 'variable',
                  attrs: {
                    id: '0.8734198492568526',
                    label: 'user_name',
                  },
                },
                {
                  text: ', ',
                  type: 'text',
                },
              ],
            },
            {
              type: 'paragraph',
              content: [
                {
                  text: 'Now is the time to join the Forbes community! Take ',
                  type: 'text',
                },
              ],
            },
            {
              type: 'paragraph',
              content: [
                {
                  text: 'advantage of exclusive Labor Day savings and enjoy 50% off an annual membership!',
                  type: 'text',
                },
              ],
            },
          ],
        },
      },
    },
    '0.7991050237474366': {
      id: '0.7991050237474366',
      link: null,
      meta: {
        width: 341,
        height: 304,
      },
      name: 'image3',
      type: 'image',
      style: {
        width: '35px',
      },
      params: {
        url: 'https://ci5.googleusercontent.com/proxy/IjCanDZ41pC5gxMukyoio6XOiW12orcRNoc32jQ3nbft3kjMkLR_QkEkuwh-xElGW9YofaVADJLaUoTuXJh9ROqN55sAxJQEWXGi=s0-d-e1-ft#https://images.cordial.com/869/341x304/checkbox-grey.png',
      },
    },
    '0.8529751624966742': {
      id: '0.8529751624966742',
      link: null,
      name: 'text10',
      type: 'text',
      style: {
        color: '#333333',
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
                  text: 'Make the most of your time with MyForbes.',
                  type: 'text',
                  marks: [
                    {
                      type: 'link',
                      attrs: {
                        rel: 'noopener noreferrer nofollow',
                        href: 'https://e.email.forbes.com/c2/869:64ef678f78abe2ff0c022c64:ot:5e4d3a2b5b099ce02fc101a5:1/746ae807?jwtH=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9&jwtP=eyJpYXQiOjE2OTM2NjM5NDksImNkIjoiLmVtYWlsLmZvcmJlcy5jb20iLCJjZSI6ODY0MDAsInRrIjoiZm9yYmVzLWxpdmUiLCJtdGxJRCI6IjY0ZjBmNDdlNGVkNjVjYTVlMzA0YmU4NyIsImxpbmtVcmwiOiJodHRwczpcL1wvYWNjb3VudC5mb3JiZXMuY29tXC9tZW1iZXJzaGlwP3V0bV9zb3VyY2U9cHJvbW90aW9uJnV0bV9tZWRpdW09ZW1haWwmdXRtX2NhbXBhaWduPWdyb3d0aF9ub24tc3ViX29yZ2FuaWNfc3Vic2NyaWJlX2xhYm9yZGF5MjMmdXRtX2NvbnRlbnQ9cHJvc3BlY3RzLTQmY2RsY2lkPTVlNGQzYTJiNWIwOTljZTAyZmMxMDFhNSJ9&jwtS=R5cb3NDincdzMuzTuwLn0QmIa0rxgszIP7HyT8uoWvg',
                        class: null,
                        target: '_blank',
                      },
                    },
                    {
                      type: 'underline',
                    },
                  ],
                },
                {
                  text: ' Tailored insights crafted to match your interests and aspirations, optimizing the value of every moment you spend with us.',
                  type: 'text',
                },
              ],
            },
          ],
        },
      },
    },
    '0.8824741731913492': {
      id: '0.8824741731913492',
      link: null,
      name: 'button',
      type: 'text',
      style: {
        color: '#ffffff',
        width: '108px',
        padding: '10px',
        fontSize: '12px',
        lineHeight: '24px',
        borderRadius: '10px',
        letterSpacing: '1px',
        backgroundColor: '#dc0000',
      },
      params: {
        content: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  text: 'View offer',
                  type: 'text',
                  marks: [
                    {
                      type: 'bold',
                    },
                  ],
                },
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
      style: {
        color: '#939393',
        fontSize: '14px',
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
                  text: 'My Forbes Account',
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
      style: {
        color: '#939393',
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
                  text: 'The world’s leading voice for entrepreneurial success and free enterprise.',
                  type: 'text',
                },
              ],
            },
          ],
        },
      },
    },
    '0.9910187986678045': {
      id: '0.9910187986678045',
      link: null,
      name: 'list item2',
      type: 'layout',
      style: {},
      params: {
        gap: 10,
        columns: [
          {
            style: {
              textAlign: 'center',
            },
            children: ['0.4993885109326879'],
            proportion: 10,
          },
          {
            children: ['0.3683207730803302'],
            proportion: 90,
          },
        ],
      },
    },
    '0.9951493629308013': {
      id: '0.9951493629308013',
      link: null,
      meta: {
        width: 900,
        height: 400,
      },
      name: 'image',
      type: 'image',
      style: {},
      params: {
        url: 'https://ci3.googleusercontent.com/proxy/Ra3Br7M9Y2vuY_01bu_5Asb2l68Nn2069sEG8KFmmsb80ClMuca2m5UxbVrRdLM0evylAqxQ472zrBGAsGJLEsa_5cVLtkKTuMB4XI1go8blBKtLT-KYOdLdhhQKYcRH=s0-d-e1-ft#https://images.cordial.com/869/900x400/September-LaborDay-Email-900x400-C.jpg',
      },
    },
    '0.9991282704525641': {
      id: '0.9991282704525641',
      link: null,
      name: 'footer text',
      type: 'text',
      style: {
        color: '#333333',
        padding: '20px 0px 0px',
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
                  text: "All that for just $39.99/year, 50% off our regular price. There's only one caveat: it's only for the next few days.",
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
    '0.21735189934253074': {
      id: '0.21735189934253074',
      link: null,
      name: 'text9',
      type: 'text',
      style: {
        color: '#333333',
        padding: '0px',
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
                  text: "Make decisions in your life with confidence. With unlimited access to premium journalism, you'll be informed and enlightened by facts and truth.",
                  type: 'text',
                },
              ],
            },
          ],
        },
      },
    },
    '0.23876982976491945': {
      id: '0.23876982976491945',
      link: null,
      name: 'top info line',
      type: 'text',
      style: {
        color: '#ffffff',
        padding: '10px 0px',
        fontSize: '14px',
        textAlign: 'center',
        lineHeight: '16px',
        backgroundColor: '#DC0000',
      },
      params: {
        content: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  text: 'Save 50% - Invest in Your Success Today',
                  type: 'text',
                  marks: [
                    {
                      type: 'bold',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    },
    '0.24033503158584169': {
      id: '0.24033503158584169',
      link: null,
      name: 'to action text',
      type: 'text',
      style: {
        color: '#333333',
        padding: '20px 0px 0px',
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
                  text: "Don't miss out — invest in your success. Become a member today.",
                  type: 'text',
                },
              ],
            },
          ],
        },
      },
    },
    '0.32670942046105345': {
      id: '0.32670942046105345',
      link: {
        url: 'https://demo.waveditor.qvantor.space/some-link',
        newTab: true,
      },
      name: 'call to action',
      type: 'text',
      style: {
        color: '#15c',
        padding: '20px 0px',
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
                  text: 'Become a member today for just $39.99.',
                  type: 'text',
                  marks: [
                    {
                      type: 'bold',
                    },
                    {
                      type: 'underline',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    },
    '0.42998990503198664': {
      id: '0.42998990503198664',
      link: null,
      name: 'root',
      type: 'layout',
      style: {
        margin: '0px auto',
        padding: '0px',
      },
      params: {
        columns: [
          {
            children: [
              '0.23876982976491945',
              '0.9951493629308013',
              '0.564416205483032',
              '0.18428953619941435',
            ],
            proportion: 100,
          },
        ],
      },
    },
    '0.49946369696069937': {
      id: '0.49946369696069937',
      link: null,
      meta: {
        width: 400,
        height: 127,
      },
      name: 'logo',
      type: 'image',
      style: {
        width: '130px',
        padding: '0px 0px 20px',
      },
      params: {
        url: 'https://ci6.googleusercontent.com/proxy/UpxRZVlRZ6wTlE1zOZzeCL0dmPfOPt92XJcMo1aycAYLSLafsFJ4ZYmM9zB-HOeZgv0n5AvtAXYsZiS5QZUo_Ak6XsCII-_LGyurbGqQ2w=s0-d-e1-ft#https://images.cordial.com/869/400x127/forbes-logo-white.png',
      },
    },
  },
  relations: {
    elementFont: {
      '0.691369542084963': '0.6593136584276968',
      '0.2211801490309886': '0.6593136584276968',
      '0.3683207730803302': '0.7797112123824887',
      '0.3913364375144217': '0.6593136584276968',
      '0.4469762444924079': '0.7797112123824887',
      '0.6771465086959636': '0.7797112123824887',
      '0.7726873757593369': '0.7797112123824887',
      '0.8529751624966742': '0.7797112123824887',
      '0.8824741731913492': '0.7797112123824887',
      '0.9646999953982722': '0.6593136584276968',
      '0.9801058442311088': '0.6593136584276968',
      '0.9991282704525641': '0.7797112123824887',
      '0.21735189934253074': '0.7797112123824887',
      '0.24033503158584169': '0.7797112123824887',
      '0.32670942046105345': '0.7797112123824887',
    },
  },
  variables: [
    {
      id: '0.8734198492568526',
      type: 'string',
      label: 'user_name',
      defaultValue: 'Sergei Nikolaev',
    },
  ],
};
