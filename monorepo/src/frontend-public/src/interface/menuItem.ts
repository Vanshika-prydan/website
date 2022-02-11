export interface MenuItemModal {
    id: number;
    title: string;
    urlLink: string;
    isSamePage?: boolean;
    target?: string;
    children: MenuItemModal[];
}