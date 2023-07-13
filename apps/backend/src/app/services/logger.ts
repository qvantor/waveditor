import * as process from 'process';
import bunyan from 'bunyan';
import pretty from '@mechanicalhuman/bunyan-pretty';
import { EnvConst } from '../../common/constants';

export const logger = bunyan.createLogger({
  name: 'Waveditor',
  stream:
    EnvConst.NODE_ENV === 'dev'
      ? pretty(process.stdout, { timeStamps: false })
      : undefined,
  level: EnvConst.LOG_LEVEL === 'debug' ? bunyan.DEBUG : bunyan.INFO,
});
