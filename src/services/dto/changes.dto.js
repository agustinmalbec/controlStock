export default class ChangesDTO {
    constructor(user, description, changes) {
        this.user = user;
        this.date = new Date().toLocaleString();
        this.itemName = changes.title;
        this.itemCode = changes.code;
        this.itemCategory = changes.category
        this.description = description;
    }
}