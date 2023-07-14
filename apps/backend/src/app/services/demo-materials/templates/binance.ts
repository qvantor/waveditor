import { EditorSnapshot } from '@waveditors/editor-model';

export const BinanceTemplate: EditorSnapshot = {
  config: {
    rootElementId: '0.32623154914372776',
    viewportWidth: 600,
    style: {
      margin: '0',
      backgroundColor: '#f3f3f5',
      fontSize: '16px',
    },
    fonts: [
      {
        id: '0.6885474660216875',
        fallback: 'Arial',
        genericFamily: 'sans-serif',
      },
      {
        id: '0.34647020486130486',
        fallback: 'Times New Roman',
        genericFamily: 'serif',
      },
    ],
  },
  relations: {
    elementFont: {},
  },
  elements: {
    '0.32623154914372776': {
      id: '0.32623154914372776',
      type: 'layout',
      name: 'layout',
      link: null,
      params: {
        columns: [
          {
            children: ['0.6086687666787285', '0.7528006558399396'],
            proportion: 100,
          },
        ],
      },
      style: {
        backgroundColor: '#fff',
        margin: '0px auto',
        padding: '0px 0px 20px',
      },
    },
    '0.6086687666787285': {
      id: '0.6086687666787285',
      type: 'image',
      name: 'image',
      link: null,
      params: {
        url: 'https://ci3.googleusercontent.com/proxy/YBhAXb-6msTQkvlOGSORfc-XYSnidZmDXSu7WTrrmZIb-FLdUeM_XknGD9BQCa_6CzHxKIiPna2kIPZDdzSN2koBraKAHCLqp7BSojzQeuJ49s-Xan6Ksu05yAO8ly13Ot_s9bbJTuxByqQ=s0-d-e1-ft#https://public.bnbstatic.com/image/ufo/20210831/1e00bd49-0695-4eaa-8ab0-6dd89a7087fb.png',
      },
      style: {
        display: 'block',
        maxWidth: '100%',
      },
      meta: {
        width: 2160,
        height: 300,
      },
    },
    '0.018257168934974644': {
      id: '0.018257168934974644',
      type: 'text',
      name: 'text',
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
                  text: 'Binance Pay Transaction',
                },
              ],
            },
          ],
        },
      },
      style: {
        fontSize: '20px',
        lineHeight: '25px',
      },
    },
    '0.7528006558399396': {
      id: '0.7528006558399396',
      type: 'layout',
      name: 'layout1',
      link: null,
      params: {
        columns: [
          {
            children: [
              '0.018257168934974644',
              '0.04374711860288438',
              '0.6134559420012582',
              '0.06046565988835417',
              '0.45516000244860755',
              '0.043189972429876544',
              '0.7068556995597648',
              '0.8053306546132524',
              '0.9701935065609852',
              '0.8578551329334243',
            ],
            proportion: 100,
          },
        ],
      },
      style: {
        padding: '15px 15px 0px',
      },
    },
    '0.04374711860288438': {
      id: '0.04374711860288438',
      type: 'text',
      name: 'text1',
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
                  text: 'The following payment has been made from your Binance Pay:',
                },
              ],
            },
          ],
        },
      },
      style: {
        fontSize: '14px',
        lineHeight: '20px',
        padding: '15px 0px 0px',
      },
    },
    '0.6134559420012582': {
      id: '0.6134559420012582',
      type: 'layout',
      name: 'layout2',
      link: null,
      params: {
        columns: [
          {
            children: ['0.9712202236385534', '0.8978788728713902'],
            proportion: 50,
          },
          {
            children: ['0.23438283718134478', '0.05845630863556428'],
            proportion: 50,
          },
        ],
      },
      style: {
        backgroundColor: '#eeeeee',
        padding: '5px',
      },
    },
    '0.9712202236385534': {
      id: '0.9712202236385534',
      type: 'text',
      name: 'text2',
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
                  text: 'Date & Time:',
                },
              ],
            },
          ],
        },
      },
      style: {
        fontSize: '14px',
        lineHeight: '20px',
        color: '#5e6673',
      },
    },
    '0.23438283718134478': {
      id: '0.23438283718134478',
      type: 'text',
      name: 'text3',
      link: null,
      params: {
        content: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'variable',
                  attrs: {
                    id: '0.5201403442405235',
                    label: 'data_time',
                  },
                },
                {
                  type: 'text',
                  text: ' ',
                },
              ],
            },
          ],
        },
      },
      style: {
        textAlign: 'right',
        fontSize: '14px',
        lineHeight: '20px',
      },
    },
    '0.8978788728713902': {
      id: '0.8978788728713902',
      type: 'text',
      name: 'text4',
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
                  text: 'Amount:',
                },
              ],
            },
          ],
        },
      },
      style: {
        color: '#5e6673',
        fontSize: '14px',
        lineHeight: '20px',
      },
    },
    '0.05845630863556428': {
      id: '0.05845630863556428',
      type: 'text',
      name: 'text5',
      link: null,
      params: {
        content: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'variable',
                  attrs: {
                    id: '0.45613772037023415',
                    label: 'amount',
                  },
                },
                {
                  type: 'text',
                  text: ' ',
                },
              ],
            },
          ],
        },
      },
      style: {
        textAlign: 'right',
        fontSize: '14px',
        lineHeight: '20px',
      },
    },
    '0.06046565988835417': {
      id: '0.06046565988835417',
      type: 'layout',
      name: 'layout3',
      link: null,
      params: {
        columns: [
          {
            children: ['0.847457170895753'],
            proportion: 40.48,
          },
          {
            children: [],
            proportion: 59.52,
          },
        ],
      },
      style: {
        padding: '10px 0px 0px',
      },
    },
    '0.847457170895753': {
      id: '0.847457170895753',
      type: 'text',
      name: 'text6',
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
                  text: 'View Pay Transaction History',
                },
              ],
            },
          ],
        },
      },
      style: {
        backgroundColor: '#fcd535',
        padding: '10px 0px',
        textAlign: 'center',
        fontSize: '14px',
        lineHeight: '15px',
        borderRadius: '3px',
      },
    },
    '0.45516000244860755': {
      id: '0.45516000244860755',
      type: 'text',
      name: 'text7',
      link: {
        newTab: true,
        url: 'https://github.com/qvantor',
      },
      params: {
        content: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Don’t recognize this activity? Please ',
                },
                {
                  type: 'text',
                  marks: [
                    {
                      type: 'underline',
                    },
                  ],
                  text: 'reset your password',
                },
                {
                  type: 'text',
                  text: ' and contact ',
                },
                {
                  type: 'text',
                  marks: [
                    {
                      type: 'underline',
                    },
                  ],
                  text: 'customer support',
                },
                {
                  type: 'text',
                  text: ' immediately. ',
                },
              ],
            },
          ],
        },
      },
      style: {
        fontSize: '14px',
        lineHeight: '20px',
        padding: '15px 0px 0px',
      },
    },
    '0.043189972429876544': {
      id: '0.043189972429876544',
      type: 'text',
      name: 'text8',
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
                      type: 'italic',
                    },
                  ],
                  text: 'This is an automated message, please do not reply.',
                },
              ],
            },
          ],
        },
      },
      style: {
        fontSize: '14px',
        lineHeight: '15px',
        padding: '20px 0px',
      },
    },
    '0.7068556995597648': {
      id: '0.7068556995597648',
      type: 'text',
      name: 'text9',
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
                  text: 'Stay connected!',
                },
              ],
            },
          ],
        },
      },
      style: {
        padding: '0px',
        color: '#fcd535',
        textAlign: 'center',
        fontSize: '14px',
        lineHeight: '15px',
      },
    },
    '0.8053306546132524': {
      id: '0.8053306546132524',
      type: 'text',
      name: 'text10',
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
                  text: 'To stay secure, setup your phishing code ',
                },
                {
                  type: 'text',
                  marks: [
                    {
                      type: 'underline',
                    },
                  ],
                  text: 'here',
                },
              ],
            },
          ],
        },
      },
      style: {
        padding: '20px 0px 0px',
        fontSize: '11px',
        lineHeight: '20px',
      },
    },
    '0.9701935065609852': {
      id: '0.9701935065609852',
      type: 'text',
      name: 'text11',
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
                  text: 'Risk warning: ',
                },
                {
                  type: 'text',
                  text: 'Cryptocurrency trading is subject to high market risk. Binance will make the best efforts to choose high-quality coins, but will not be responsible for your trading losses. Please trade with caution.',
                },
              ],
            },
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
                  text: 'Kindly note: ',
                },
                {
                  type: 'text',
                  text: 'Please be aware of phishing sites and always make sure you are visiting the official Binance.com website when entering sensitive data.',
                },
              ],
            },
          ],
        },
      },
      style: {
        fontSize: '11px',
        lineHeight: '15px',
        padding: '10px 0px 0px',
      },
    },
    '0.8578551329334243': {
      id: '0.8578551329334243',
      type: 'text',
      name: 'text12',
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
                  text: '© 2023 Binance.com, All Rights Reserved.',
                },
              ],
            },
          ],
        },
      },
      style: {
        padding: '20px 0px 0px',
        fontSize: '11px',
        lineHeight: '15px',
        textAlign: 'center',
      },
    },
  },
  variables: [
    {
      id: '0.5201403442405235',
      label: 'data_time',
      type: 'string',
      defaultValue: '2023-05-19 13:49:38(UTC)',
    },
    {
      id: '0.45613772037023415',
      label: 'amount',
      type: 'string',
      defaultValue: '1 USDT',
    },
  ],
};
