import { generateId } from '@waveditors/utils';
import {
  createEmptyColumn,
  createInitialConfig,
  createInitialRelations,
  RenderContextObject,
} from '@waveditors/editor-model';
import { LOCAL_STORAGE_KEY } from '../constants';
import DemoTemplates from '../constants/demo.json';
// const migrateProject = (project: RenderContextObject) => {
//   return {
//     ...project,
//     elements: Object.entries(project.elements).reduce((sum, [key, element]) => {
//       if (element.type === 'layout') {
//         return {
//           ...sum,
//           [key]: {
//             ...element,
//             params: {
//               ...element.params,
//               columns: element.params.columns.map((col) => ({
//                 children: col,
//                 proportion: columnsCountToProportion(
//                   element.params.columns.length
//                 ),
//               })),
//             },
//           },
//         };
//       }
//       return { ...sum, [key]: element };
//     }, {}),
//   };
// };
//
// const handMigrator = () =>
//   Object.entries(DemoTemplates).reduce((sum, [key, project]) => {
//     return { ...sum, [key]: migrateProject(project as any) };
//   }, {});

const initialTemplates = () => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DemoTemplates));
  return DemoTemplates;
};
export const getTemplates = () => {
  const value = localStorage.getItem(LOCAL_STORAGE_KEY);
  const savedProjects: Record<string, RenderContextObject> = value
    ? JSON.parse(value)
    : initialTemplates();
  return savedProjects;
};

export const generateEmptyTemplate = (): RenderContextObject => {
  const rootId = generateId();
  return {
    config: createInitialConfig(rootId),
    elements: {
      [rootId]: {
        id: rootId,
        type: 'layout',
        name: 'layout',
        params: {
          columns: [createEmptyColumn(50), createEmptyColumn(50)],
        },
        style: {
          backgroundColor: '#fff',
          margin: '0px auto',
          padding: '20px',
        },
        link: null,
      },
    },
    relations: createInitialRelations(),
    variables: [],
  };
};
export const getInitialTemplate = (): RenderContextObject => {
  const templates = getTemplates();
  const keys = Object.keys(templates);
  if (keys.length > 0) return templates[keys[0]];
  return generateEmptyTemplate();
};
