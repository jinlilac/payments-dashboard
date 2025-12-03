import React, { type ComponentProps } from 'react';
import cn from '@/libs/cn';

interface ContainerProps extends ComponentProps<'div'> {
  /**
   * 컨테이너 레이아웃 타입
   * - default: 기본 div
   * - grid: CSS Grid 레이아웃
   * - flex-row: Flexbox 행 레이아웃
   * - flex-col: Flexbox 열 레이아웃
   * - section: 시맨틱 <section>
   * - article: 시맨틱 <article>
   * - aside: 시맨틱 <aside>
   */
  as?: 'div' | 'section' | 'article' | 'aside';
  layout?: 'default' | 'grid' | 'flex-row' | 'flex-col';
  ariaLabel?: string;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className = '', as = 'div', layout = 'default', ariaLabel, ...others }, ref) => {
    const layoutStyles = {
      default: '',
      grid: 'grid',
      'flex-row': 'flex flex-row items-center',
      'flex-col': 'flex flex-col',
    };

    const layoutClass = layoutStyles[layout];
    const className_merged = cn(layoutClass, className);

    // 시맨틱 태그 선택
    const Component = as as React.ElementType;

    return (
      <Component ref={ref} className={className_merged} aria-label={ariaLabel} {...others}>
        {children}
      </Component>
    );
  }
);

Container.displayName = 'Container';

export default Container;
