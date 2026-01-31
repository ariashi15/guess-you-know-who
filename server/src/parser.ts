export function extractProfileLinks(data: any): string[] {
    return data.relationships_following
        .flatMap((f: any) => f.string_list_data.map((item: any) => item.href));
}

export function getMutuals(data1: any, data2: any) {
    const set1 = new Set(data1);
    return data2.filter((user: string) => set1.has(user));
}