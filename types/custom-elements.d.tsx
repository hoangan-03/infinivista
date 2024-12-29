import React from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Overline
      'overline': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      
      // Caption
      'cap': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      
      // Paragraphs
      'p2': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'p1': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      
      // Subtitles
      'subtitle2': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'subtitle1': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

      // Headings
      'h6': React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      'h5': React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      'h4': React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      'h3': React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      'h2': React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      'h1': React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      
      // Display
      'display3': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'display2': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'display1': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
