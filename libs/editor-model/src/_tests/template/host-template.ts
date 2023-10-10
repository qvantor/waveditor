import { EditorSnapshot } from '../../types';
import { ConfigFont } from '../../config';

export const MooliFont: ConfigFont = {
  id: '0.43368360441087606',
  url: 'https://fonts.googleapis.com/css2?family=Mooli&display=swap',
  name: 'Mooli',
  fallback: 'Helvetica',
  genericFamily: 'sans-serif',
};
export const Template: EditorSnapshot = {
  config: {
    fonts: [
      MooliFont,
      {
        id: '0.4317102971377873',
        fallback: 'Times New Roman',
        genericFamily: 'serif',
      },
    ],
    style: {
      margin: '0',
      fontSize: '16px',
      backgroundColor: '#f3f3f5',
    },
    rootElementId: '0.4464062060314937',
    viewportWidth: 600,
  },
  elements: {
    '0.4464062060314937': {
      id: '0.4464062060314937',
      link: null,
      name: 'layout',
      type: 'layout',
      style: {
        margin: '0px auto',
        padding: '20px',
        backgroundColor: '#fff',
      },
      params: {
        columns: [
          {
            children: ['0.10827230063110993', '0.5788179525717478'],
            proportion: 100,
          },
        ],
      },
    },
    '0.5788179525717478': {
      id: '0.5788179525717478',
      link: null,
      name: 'text',
      type: 'text',
      style: {},
      params: {
        content: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  text: 'Some text written with mooli',
                  type: 'text',
                },
              ],
            },
          ],
        },
      },
    },
    '0.10827230063110993': {
      id: '0.10827230063110993',
      link: null,
      name: 'text1',
      type: 'text',
      style: {},
      params: {
        content: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  text: 'Some text with ',
                  type: 'text',
                },
                {
                  type: 'variable',
                  attrs: {
                    id: '0.6910150707471912',
                    label: 'name',
                  },
                },
                {
                  text: ' variable',
                  type: 'text',
                },
              ],
            },
          ],
        },
      },
    },
  },
  relations: {
    elementFont: {
      '0.10827230063110993': '0.43368360441087606',
    },
  },
  variables: [
    {
      id: '0.6910150707471912',
      type: 'string',
      label: 'name',
      defaultValue: 'Some name',
    },
  ],
};
