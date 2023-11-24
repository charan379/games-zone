export function groupByInnerObjectField<T>(array: T[], key: string): Record<string, T[]> {
    return array.reduce((acc, item) => {
        const keys = key.split('.');
        const groupKey = keys.reduce<any>((acc, k) => acc[k], item);
        const groupKeyString = String(groupKey);

        if (!acc[groupKeyString]) {
            acc[groupKeyString] = [];
        }
        acc[groupKeyString].push(item);
        return acc;
    }, {} as Record<string, T[]>);
}

export function groupByObjectField<T>(array: T[], key: keyof T): Record<string, T[]> {
    return array.reduce((acc, item) => {
        const groupKey = String(item[key]);
        if (!acc[groupKey]) {
            acc[groupKey] = [];
        }
        acc[groupKey].push(item);
        return acc;
    }, {} as Record<string, T[]>);
}