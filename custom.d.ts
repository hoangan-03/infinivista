// declare module '*.svg' {
//     import * as React from 'react';
//     const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
//     export default ReactComponent;
// }

declare module '*.svg' {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    import React = require('react');
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}
