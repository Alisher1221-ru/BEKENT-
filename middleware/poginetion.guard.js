class Pagination {
    constructor(totalItems, page, limit){
        this.page=page || 1
        this.limit=limit || 16
        this.totalPages = Math.ceil(totalItems / this.limit)
        this.offset=(this.page-1)*this.limit
    }
}

export default Pagination