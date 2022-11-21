class TreeStore {
    items: object[]
    parents:object[]

    constructor(arr: object[]) {
        this.items = arr
        this.parents = [];
    }

    getAll(): object[] {
        return this.items;
    }

    getItem(id: string|number): object {
        return this.items.filter((item) => item['id'] == id)[0]
    }

    getChildren(id: string|number): object[] {
        return this.items.filter((item) => item['parent'] == id)
    }

    getAllChildren(id: string|number): object[] {
        const allChildItems: object[] = [];
        let itemIds: string = '';
        let diffItems: object[] = this.items.filter((item) => {
            if (item['parent'] == id) {
                allChildItems.push(item);
                itemIds += "*#*" + item['id'];
            } else {
                return item;
            }
        })
        diffItems.forEach((i) => {
            if (itemIds.indexOf("*#*" + i['parent']) > -1) {
                allChildItems.push(i)
            }
        })
        return allChildItems;
    }

    getAllParents(id:string|number):object[]{
        let parent = this.getItem(id)
        if(parent && this.getItem(parent['parent']) ){
            this.parents.push(this.getItem(parent['parent']))
            this.getAllParents(parent['parent'])
        }
        return this.parents;
    }
}
