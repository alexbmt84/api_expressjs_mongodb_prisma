const User = require('../models/userModel');

async function seeder(req, res) {

    try {

        const users = await User.seed();
        res.status(200).json({users});

    } catch (error) {

        console.log(error.message);
        res.status(500).json({message: error.message});

    }
    
}

async function index(req, res) {

    try {

        const users = await User.findAll();
        res.status(200).json({users})

    } catch (error) {

        res.status(500).json({message: error.message});

    }

}

async function read(req, res) {

    try {

        const user = await User.findById(req);
        res.status(200).json(user);

    } catch (error) {

        res.status(500).json({message: error.message});

    }

}

async function store(req, res) {

    try {

        const user = await User.createUser(req);
        res.status(200).json(user);

    } catch (error) {

        console.log(error.message);
        res.status(500).json({message: error.message});

    }

}

async function update(req, res) {

    try {

        const updatedUser = await User.updateUser(req);
        res.status(200).json(updatedUser);

    } catch (error) {

        res.status(500).json({message: error.message});

    }

}

async function remove(req, res) {

    try {

        const user = await User.deleteUser(req, res);
        res.status(200).json(user);

    } catch (error) {

        res.status(500).json({message: error.message});

    }

}

module.exports = {seeder, index, read, store, update, remove};