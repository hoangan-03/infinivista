import * as VisuallyHiddenPrimitive from '@radix-ui/react-visually-hidden';
import * as React from 'react';

import {cn} from '@/lib/utils';

const VisuallyHidden = React.forwardRef<
    React.ElementRef<typeof VisuallyHiddenPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof VisuallyHiddenPrimitive.Root>
>(({className, ...props}, ref) => <VisuallyHiddenPrimitive.Root ref={ref} className={cn(className)} {...props} />);
VisuallyHidden.displayName = 'VisuallyHidden';

export {VisuallyHidden};
