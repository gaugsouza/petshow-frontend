export interface Sort {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}

export interface Pageable {
    sort: Sort;
    offset: number;
    pageSize: number;
    pageNumber: number;
    unpaged: boolean;
    paged: boolean;
}

export interface ObjetoPaginado {
    content: any[];
    pageable: Pageable;
    totalElements: number;
    totalPages: number;
    last: boolean;
    size: number;
    number: number;
    numberOfElements: number;
    sort: Sort;
    first: boolean;
    empty: boolean;
}
