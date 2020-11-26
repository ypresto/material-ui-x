import * as React from 'react';
import { CellIndexCoordinates, Columns, GridOptions, RenderContextProps, RowModel } from '../models';
import { LeftEmptyCell, RightEmptyCell } from './cell';
import { Row } from './row';
import { RowCells } from './row-cells';

export const RowElements: React.FC<{
  row: RowModel;
  domIndex: number;
  renderCtx: RenderContextProps;
  options: GridOptions;
  columns: Columns;
  cellFocus: CellIndexCoordinates | null;
  hasScroll: { y: boolean; x: boolean };
  selected: boolean;
}> = React.memo(({
  row,
  domIndex,
  renderCtx,
  options,
  columns,
  cellFocus,
  hasScroll,
  selected,
}) => {
  return (
    <Row
      className={(renderCtx.firstRowIdx! + domIndex) % 2 === 0 ? 'Mui-even' : 'Mui-odd'}
      id={row.id}
      selected={selected}
      rowIndex={renderCtx.firstRowIdx + domIndex}
    >
      <LeftEmptyCell width={renderCtx.leftEmptyWidth} />
      <RowCells
        columns={columns}
        row={row}
        firstColIdx={renderCtx.firstColIdx}
        lastColIdx={renderCtx.lastColIdx}
        hasScroll={hasScroll}
        scrollSize={options.scrollbarSize}
        showCellRightBorder={!!options.showCellRightBorder}
        extendRowFullWidth={!options.disableExtendRowFullWidth}
        rowIndex={renderCtx.firstRowIdx + domIndex}
        cellFocus={cellFocus}
        domIndex={domIndex}
      />
      <RightEmptyCell width={renderCtx.rightEmptyWidth} />
    </Row>
  )
});
RowElements.displayName = 'RowElements';
