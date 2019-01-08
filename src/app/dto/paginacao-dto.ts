import { AppConstants } from '../app-constants';

export class PaginacaoDto {
  first: number;
  page: number;
  rows: number;
  totalRecords: number;
  totalPages: number;
  pageCount: number;
  rowsPerPageOptions: number[];

  constructor() {
    this.first = 0;
    this.page = 0;
    this.totalRecords = 0;
    this.pageCount = 0;
    this.rows = AppConstants.ROWS;
    this.rowsPerPageOptions = AppConstants.ROWS_PER_PAGE;
  }
}
