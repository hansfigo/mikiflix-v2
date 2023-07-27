interface PaginationParams {
    page: number;
    perPage: number;
}

export function getPaginationParamsFromURL(url: URL): PaginationParams {
    const page = Number(url.searchParams.get('page') ?? '1');
    const perPage = Number(url.searchParams.get('perPage') ?? '20');

    return { page, perPage };
}