export function extractProfileLinks(data: any): string[] {
    return data.relationships_following
        .flatMap((f: any) => {f.string_list_data.href});
}