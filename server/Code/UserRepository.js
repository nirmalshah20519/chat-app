import BaseRepository from "./BaseRepository.js";

class UserRepository extends BaseRepository {
    constructor() {
        super('User');  // Assuming 'User' is the model name registered in Mongoose
    }

    // You can add more specific methods here
}

export default UserRepository;
