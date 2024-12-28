import React from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Overline
      'o': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      
      // Caption
      'c': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      
      // Paragraphs
      'p2': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'p1': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      
      // Subtitles
      's2': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      's1': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

      // Headings
      'h6': React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      'h5': React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      'h4': React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      'h3': React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      'h2': React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      'h1': React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      
      // Display
      'd3': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'd2': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'd1': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
