import * as React from 'react';
import { columnsSelector } from '../hooks/features/columns/columnsSelector';
import { GridState } from '../hooks/features/core/gridState';
import { useGridSelector } from '../hooks/features/core/useGridSelector';
import { keyboardCellSelector } from '../hooks/features/keyboard/keyboardSelector';
import { selectionStateSelector } from '../hooks/features/selection/selectionSelector';
import { sortedRowsSelector } from '../hooks/features/sorting/sortingSelector';
import { useLogger } from '../hooks/utils/useLogger';
import { optionsSelector } from '../hooks/utils/useOptionsProp';
import { RenderContextProps } from '../models/renderContextProps';
import { ApiContext } from './api-context';
import { RenderContext } from './render-context';
import { RenderingZone } from './rendering-zone';
import { StickyContainer } from './sticky-container';
import { RowElements } from './row-elements';

type ViewportType = React.ForwardRefExoticComponent<React.RefAttributes<HTMLDivElement>>;

export const containerSizesSelector = (state: GridState) => state.containerSizes;
export const viewportSizesSelector = (state: GridState) => state.viewportSizes;
export const scrollBarSizeSelector = (state: GridState) => state.scrollBar;

export const Viewport: ViewportType = React.forwardRef<HTMLDivElement, {}>(
  (props, renderingZoneRef) => {
    const logger = useLogger('Viewport');
    const renderCtx = React.useContext(RenderContext) as RenderContextProps;
    const apiRef = React.useContext(ApiContext);
    const rows = useGridSelector(apiRef, sortedRowsSelector);
    const options = useGridSelector(apiRef, optionsSelector);
    const containerSizes = useGridSelector(apiRef, containerSizesSelector);
    const viewportSizes = useGridSelector(apiRef, viewportSizesSelector);
    const scrollBarState = useGridSelector(apiRef, scrollBarSizeSelector);
    const hasScroll = React.useMemo(() => ({ y: scrollBarState!.hasScrollY, x: scrollBarState.hasScrollX }), [scrollBarState])
    const columns = useGridSelector(apiRef, columnsSelector);
    const cellFocus = useGridSelector(apiRef, keyboardCellSelector);
    const selectionState = useGridSelector(apiRef, selectionStateSelector);

    const getRowsElements = () => {
      // TODO move that to selector
      const renderedRows = rows.slice(renderCtx.firstRowIdx, renderCtx.lastRowIdx!);
      return renderedRows.map((r, idx) => (
        <RowElements
          key={r.id}
          row={r}
          domIndex={idx}
          renderCtx={renderCtx}
          options={options}
          columns={columns.visible}
          cellFocus={cellFocus}
          hasScroll={hasScroll}
          selected={!!selectionState[r.id]}
        />
      ));
    };

    logger.debug('Rendering ViewPort');
    return (
      <StickyContainer {...viewportSizes}>
        <RenderingZone
          ref={renderingZoneRef}
          {...(containerSizes?.renderingZone || { width: 0, height: 0 })}
        >
          {getRowsElements()}
        </RenderingZone>
      </StickyContainer>
    );
  },
);
Viewport.displayName = 'Viewport';
