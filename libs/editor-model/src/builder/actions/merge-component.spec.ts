import { mapJSONContent } from '@waveditors/utils';
import { EditorSnapshot, extractComponent, Layout, Position } from '../../';
import { builderContextToSnapshot, createBuilderContext } from '../services';
import { BasicCase, HostTemplate } from '../../_tests';
import { mergeComponent } from './merge-component';

const {
  Template,
  LayoutWith2FontsAnd2Variables,
  TextWithMooliFont,
  InterFont,
  AgeVariable,
} = BasicCase;

const TemplateExtractor = extractComponent(createBuilderContext(Template));

const ComplexComponent = TemplateExtractor(LayoutWith2FontsAnd2Variables);
const ComponentWithMooliFont = TemplateExtractor(TextWithMooliFont);

const merge = (element: EditorSnapshot, position?: Position) => {
  const hostContext = createBuilderContext(HostTemplate.Template);
  const initialSnap = builderContextToSnapshot(hostContext);
  mergeComponent(hostContext)({ element, position: position ?? null });
  const mergedSnap = builderContextToSnapshot(hostContext);
  return { initialSnap, mergedSnap, hostContext };
};
describe('merge component', () => {
  it('should clone and add elements', () => {
    const { initialSnap, mergedSnap } = merge(ComplexComponent);
    expect(Object.keys(initialSnap.elements).length).toEqual(3);
    expect(Object.keys(mergedSnap.elements).length).toEqual(
      3 + Object.keys(ComplexComponent.elements).length
    );
  });
  it('should add component to specified layout', () => {
    const { initialSnap, mergedSnap } = merge(ComponentWithMooliFont, {
      layout: HostTemplate.Template.config.rootElementId,
      column: 0,
      index: 1,
    });
    const [{ children: initialChilds }] = (
      initialSnap.elements[initialSnap.config.rootElementId] as Layout
    ).params.columns;
    const [{ children: mergedChilds }] = (
      mergedSnap.elements[initialSnap.config.rootElementId] as Layout
    ).params.columns;

    expect(initialChilds.length).toBe(2);

    const [newRootId] = Object.entries(mergedSnap.elements).find(
      ([_, el]) =>
        el.name === ComponentWithMooliFont.elements[TextWithMooliFont].name
    ) as [string, unknown];

    expect(mergedChilds).toEqual([
      initialChilds[0],
      newRootId,
      initialChilds[1],
    ]);
    expect(mergedChilds.length).toBe(3);
  });

  it('should add missing fonts and element-font relations', () => {
    const { initialSnap, mergedSnap } = merge(ComplexComponent);
    const { id, ...font } = InterFont;
    expect(initialSnap.config.fonts.length).toEqual(2);
    expect(initialSnap.config.fonts).toEqual(
      expect.not.arrayContaining([expect.objectContaining(font)])
    );
    expect(Object.keys(initialSnap.relations.elementFont).length).toEqual(1);

    expect(mergedSnap.config.fonts.length).toEqual(3);
    expect(mergedSnap.config.fonts).toEqual(
      expect.arrayContaining([expect.objectContaining(font)])
    );
    expect(Object.keys(mergedSnap.relations.elementFont).length).toEqual(3);
  });
  it('should add element font relation to existing found font', () => {
    const { initialSnap, mergedSnap } = merge(ComponentWithMooliFont);
    expect(initialSnap.config.fonts).toEqual(mergedSnap.config.fonts);

    const [AddedElementId] = Object.entries(mergedSnap.elements).find(
      ([_, el]) =>
        el.name === ComponentWithMooliFont.elements[TextWithMooliFont].name
    ) as [string, unknown];
    expect(mergedSnap.relations.elementFont).toMatchObject({
      [AddedElementId]: HostTemplate.MooliFont.id,
    });
  });
  it('should add missing variables', () => {
    const { initialSnap, mergedSnap } = merge(ComplexComponent);
    const { id, ...ageVar } = AgeVariable;
    expect(initialSnap.variables.length).toBe(1);

    expect(mergedSnap.variables.length).toBe(2);
    expect(mergedSnap.variables).toEqual(
      expect.arrayContaining([expect.objectContaining(ageVar)])
    );
  });
  it('should update variables relations', () => {
    const { mergedSnap } = merge(ComplexComponent);
    const varIds = mergedSnap.variables.map((variable) => variable.id);
    Object.values(mergedSnap.elements).forEach((element) => {
      if (element.type !== 'text') return;
      mapJSONContent(element.params.content, (item) => {
        if (item.type !== 'variable') return item;
        expect(varIds).toContain(item.attrs?.id);
        return item;
      });
    });
  });
});
