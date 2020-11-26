import {
  CELL_CSS_CLASS,
  DATA_CONTAINER_CSS_CLASS,
  HEADER_CELL_CSS_CLASS,
} from '../constants/cssClassesConstants';
import { CellIndexCoordinates } from '../models/cell';

export function isOverflown(element: Element): boolean {
  return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

export function findParentElementFromClassName(elem: Element, className: string): Element | null {
  return elem.closest(`.${className}`);
}

export function isCell(elem: Element | null): boolean {
  return elem != null && findParentElementFromClassName(elem, CELL_CSS_CLASS) !== null;
}

export function isInputElement(elem: Element | null): boolean {
  return elem != null && (elem instanceof HTMLInputElement && !['button', 'submit', 'reset'].includes(elem.type) || elem instanceof HTMLTextAreaElement);
}

export function isButtonElement(elem: Element | null): boolean {
  return elem != null && (elem instanceof HTMLButtonElement || (elem instanceof HTMLInputElement && ['button', 'submit', 'reset'].includes(elem.type)) || elem.getAttribute('role') === 'button')
}

export function isSelectElement(elem: Element | null): boolean {
  return elem != null && (elem instanceof HTMLSelectElement || elem.classList.contains('MuiSelect-root'))
}

export function isHeaderCell(elem: Element): boolean {
  return elem && findParentElementFromClassName(elem, HEADER_CELL_CSS_CLASS) !== null;
}

export function getIdFromRowElem(rowEl: Element): string {
  return rowEl.getAttribute('data-id')!;
}

export function getFieldFromHeaderElem(colCellEl: Element): string {
  return colCellEl.getAttribute('data-field')!;
}

export function findHeaderElementFromField(elem: Element, field: string): Element | null {
  return elem.querySelector(`[data-field="${field}"]`);
}

export function findCellElementsFromCol(col: HTMLElement): NodeListOf<Element> | null {
  const field = col.getAttribute('data-field');
  const root = findParentElementFromClassName(col, 'MuiDataGrid-root');
  if (!root) {
    throw new Error('Material-UI: The root element is not found.');
  }
  const cells = root.querySelectorAll(`:scope .${CELL_CSS_CLASS}[data-field="${field}"]`);
  return cells;
}

export function findGridRootFromCurrent(elem: Element): HTMLDivElement | null {
  if (elem.classList.contains('MuiDataGrid-root')) {
    return elem as HTMLDivElement;
  }
  const root = findParentElementFromClassName(elem, 'MuiDataGrid-root');
  return root as HTMLDivElement;
}

export function findDataContainerFromCurrent(elem: Element): HTMLDivElement | null {
  const root = findGridRootFromCurrent(elem);
  if (!root) {
    return null;
  }
  return root.querySelector(`:scope .${DATA_CONTAINER_CSS_CLASS}`) as HTMLDivElement;
}

export function getCellElementFromIndexes(
  root: Element,
  { colIndex, rowIndex }: CellIndexCoordinates,
) {
  return root.querySelector(
    `:scope .${CELL_CSS_CLASS}[aria-colIndex='${colIndex}'][data-rowIndex='${rowIndex}']`,
  ) as HTMLDivElement;
}
