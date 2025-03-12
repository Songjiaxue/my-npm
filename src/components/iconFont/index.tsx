import createIconM from './createIcon';
import IconC from './Icon';

type InternalCreateIcon = typeof IconC;

interface IconInterface extends InternalCreateIcon {
  createIcon: typeof createIconM;
}

const Icon = IconC as IconInterface;
Icon.createIcon = createIconM;

export default Icon;
