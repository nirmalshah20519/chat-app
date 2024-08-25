import mongoose from "mongoose";

class BaseRepository {
    constructor(model) {
        this.model = mongoose.model(model);
    }

    async create(data) {
        const record = new this.model(data);
        return await record.save();
    }

    async findAll() {
        return await this.model.find({});
    }

    async findOne(id) {
        return await this.model.findById(id);
    }

    async update(id, data) {
        return await this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await this.model.findByIdAndDelete(id);
    }
}

export default BaseRepository;
