import { TextEditorStyle } from '@waveditors/text-editor';
import { VersionsProvider } from '../../versions';
import { MailBuilderVersion } from './mail-builder-version';

export const MailBuilder = () => (
  <VersionsProvider>
    <TextEditorStyle />
    <MailBuilderVersion />
  </VersionsProvider>
);
