import { VersionsProvider } from '../../versions';
import { MailBuilderVersion } from './mail-builder-version';

export const MailBuilder = () => (
  <VersionsProvider>
    <MailBuilderVersion />
  </VersionsProvider>
);
