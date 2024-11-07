export default class ChangesDTO {
    constructor(user, description, changes) {
        this.user = `${user.first_name} ${user.last_name}`;
        this.date = new Date().toLocaleString();
        this.itemName = changes.title;
        this.supplier = changes.supplier;
        this.itemId = changes._id;
        this.itemCategory = changes.category;
        this.description = description;
    }
}