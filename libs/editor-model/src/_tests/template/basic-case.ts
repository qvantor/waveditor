import { EditorSnapshot } from '../../types';
import { ConfigFont } from '../../config';
import { Element } from '../../elements';
import { Variable } from '../../variables';

export const MooliFont: ConfigFont = {
  id: '0.1332247839013243',
  url: 'https://fonts.googleapis.com/css2?family=Mooli&display=swap',
  name: 'Mooli',
  fallback: 'Helvetica',
  genericFamily: 'serif',
};

export const InterFont: ConfigFont = {
  id: '0.7248257932515505',
  url: 'https://fonts.googleapis.com/css2?family=Inter&display=swap',
  name: 'Inter',
  fallback: 'Helvetica',
  genericFamily: 'sans-serif',
};

export const NameVariable: Variable = {
  id: '0.7830225981794139',
  type: 'string',
  label: 'name',
  defaultValue: 'John Doe',
};

export const AgeVariable: Variable = {
  id: '0.24456524413525726',
  type: 'string',
  label: 'age',
  defaultValue: '32',
};

export const SimpleLayoutImage: Element = {
  id: '0.5826978971156556',
  link: null,
  meta: {
    width: 626,
    height: 626,
  },
  name: 'image1',
  type: 'image',
  style: {},
  params: {
    url: 'https://img.freepik.com/free-vector/choose-concept-illustration_114360-553.jpg?size=626&ext=jpg',
  },
};

export const SimpleLayoutText: Element = {
  id: '0.8946935213422873',
  link: null,
  name: 'text4',
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
              text: 'Simple layout',
              type: 'text',
            },
          ],
        },
      ],
    },
  },
};

export const ImageId = '0.6057618679481303';
export const SimpleTextId = '0.8946935213422873';
export const TextWithMooliFont = '0.8154554735234014';
export const TextWithNameVariable = '0.47976090123156934';
export const TextWithNameVariableAndMooliFont = '0.5151065661804399';
export const TextWithTwoVariablesAndInterFont = '0.09364994320533238';
export const SimpleLayoutOfThree = '0.6750283325075193';
export const LayoutWith2FontsAnd2Variables = '0.970902515713419';
export const Template: EditorSnapshot = {
  config: {
    fonts: [
      {
        id: '0.24797196662515453',
        fallback: 'Helvetica',
        genericFamily: 'sans-serif',
      },
      MooliFont,
      InterFont,
    ],
    style: {
      margin: '0',
      fontSize: '16px',
      backgroundColor: '#f3f3f5',
    },
    rootElementId: '0.38109618781050725',
    viewportWidth: 600,
  },
  elements: {
    '0.970902515713419': {
      id: '0.970902515713419',
      link: null,
      name: 'layout2',
      type: 'layout',
      style: {
        verticalAlign: 'top',
      },
      params: {
        gap: 20,
        columns: [
          {
            children: ['0.6057618679481303'],
            proportion: 39.74,
          },
          {
            children: ['0.8893417274842137', '0.6487191447249776'],
            proportion: 60.26,
          },
        ],
      },
    },
    '0.992109257616949': {
      id: '0.992109257616949',
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
                  text: 'Empty text',
                  type: 'text',
                },
              ],
            },
          ],
        },
      },
    },
    '0.5151065661804399': {
      id: '0.5151065661804399',
      link: null,
      name: 'text3',
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
                  text: 'Text with Mooli Font and ',
                  type: 'text',
                },
                {
                  type: 'variable',
                  attrs: {
                    id: '0.7830225981794139',
                    label: 'name',
                  },
                },
                {
                  text: ' ',
                  type: 'text',
                },
              ],
            },
          ],
        },
      },
    },
    '0.5826978971156556': SimpleLayoutImage,
    '0.6057618679481303': {
      id: '0.6057618679481303',
      link: null,
      meta: {
        width: 626,
        height: 626,
      },
      name: 'image2',
      type: 'image',
      style: {},
      params: {
        url: 'https://img.freepik.com/free-vector/grocery-pick-up-service-abstract-concept-vector-illustration-online-grocery-ordering-virus-protected-shopping-fresh-safe-products-express-food-delivery-ecommerce-abstract-metaphor_335657-2932.jpg?size=626&ext=jpg',
      },
    },
    '0.6487191447249776': {
      id: '0.6487191447249776',
      link: null,
      name: 'layout3',
      type: 'layout',
      style: {
        height: '170px',
        verticalAlign: 'bottom',
      },
      params: {
        columns: [
          {
            children: ['0.7402764635803678'],
            proportion: 50,
          },
          {
            children: ['0.09364994320533238'],
            proportion: 50,
          },
        ],
      },
    },
    '0.6750283325075193': {
      id: '0.6750283325075193',
      link: null,
      name: 'layout1',
      type: 'layout',
      style: {},
      params: {
        columns: [
          {
            children: ['0.5826978971156556'],
            proportion: 50,
          },
          {
            children: ['0.8946935213422873'],
            proportion: 50,
          },
        ],
      },
    },
    '0.7402764635803678': {
      id: '0.7402764635803678',
      link: null,
      name: 'text6',
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
                  text: 'Fonts is here',
                  type: 'text',
                },
              ],
            },
          ],
        },
      },
    },
    '0.7517803589941807': {
      id: '0.7517803589941807',
      link: null,
      meta: {
        width: 626,
        height: 417,
      },
      name: 'image',
      type: 'image',
      style: {
        height: '150px',
      },
      params: {
        url: 'https://img.freepik.com/free-vector/pick-up-truck-concept-illustration_114360-7813.jpg?size=626&ext=jpg',
      },
    },
    '0.8154554735234014': {
      id: '0.8154554735234014',
      link: null,
      name: 'text2',
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
                  text: 'Text with ',
                  type: 'text',
                },
                {
                  text: 'Mooli',
                  type: 'text',
                  marks: [
                    {
                      type: 'underline',
                    },
                  ],
                },
                {
                  text: ' font',
                  type: 'text',
                },
              ],
            },
          ],
        },
      },
    },
    '0.8893417274842137': {
      id: '0.8893417274842137',
      link: null,
      name: 'text5',
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
                  text: 'Layout with variables and fonts',
                  type: 'text',
                },
              ],
            },
          ],
        },
      },
    },
    '0.8946935213422873': SimpleLayoutText,
    '0.09364994320533238': {
      id: '0.09364994320533238',
      link: null,
      name: 'text7',
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
                  text: 'A have ',
                  type: 'text',
                },
                {
                  type: 'variable',
                  attrs: {
                    id: '0.7830225981794139',
                    label: 'name',
                  },
                },
                {
                  text: ' and ',
                  type: 'text',
                },
                {
                  type: 'variable',
                  attrs: {
                    id: '0.24456524413525726',
                    label: 'age',
                  },
                },
                {
                  text: ' and ',
                  type: 'text',
                },
                {
                  text: 'Inter',
                  type: 'text',
                  marks: [
                    {
                      type: 'italic',
                    },
                  ],
                },
                {
                  text: ' font',
                  type: 'text',
                },
              ],
            },
          ],
        },
      },
    },
    '0.38109618781050725': {
      id: '0.38109618781050725',
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
            children: [
              '0.992109257616949',
              '0.7517803589941807',
              '0.8154554735234014',
              '0.47976090123156934',
              '0.5151065661804399',
              '0.6750283325075193',
              '0.970902515713419',
            ],
            proportion: 100,
          },
        ],
      },
    },
    '0.47976090123156934': {
      id: '0.47976090123156934',
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
                  text: 'hello ',
                  type: 'text',
                },
                {
                  type: 'variable',
                  attrs: {
                    id: '0.7830225981794139',
                    label: 'name',
                  },
                },
                {
                  text: ' ',
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
      '0.5151065661804399': '0.1332247839013243',
      '0.7402764635803678': '0.1332247839013243',
      '0.8154554735234014': '0.1332247839013243',
      '0.09364994320533238': '0.7248257932515505',
    },
  },
  variables: [
    NameVariable,
    AgeVariable,
    { id: '0', label: 'Unused Variable', type: 'string' },
  ],
};
