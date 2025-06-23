export interface Breed {
    id: string;
    name: string;

    [key: string]: any;
}

export interface Category {
    id: number;
    name: string;
}

export interface Cat {
    id: string;
    url: string;
    width: number;
    height: number;
    breeds: Breed[];
    categories?: Category[];
    original_filename?: string;

    [key: string]: any;
}