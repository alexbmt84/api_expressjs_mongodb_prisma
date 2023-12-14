const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

class User {
    
    constructor (username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password
    }

    static async seed() {

        const salt = await bcrypt.genSalt();
        const users = [];
    
        for (let i = 0; i < 10; i++) {
    
            const user = await prisma.users.create({
    
                data: {
                
                    username: faker.internet.userName(),
                    email: faker.internet.email(),
                    password: await bcrypt.hash(faker.internet.password(), salt),
                    createdAt: new Date(),
                    updatedAt: new Date()
    
                }
    
            });

            users.push(user);
    
        }

        return users;
    
    }

    static async findAll() {

        return await prisma.users.findMany();

    }

    static async findById(req) {

        const id = req.params.id;
        
        return await prisma.users.findUnique({
            where: {
                id
            }
        });

    }

    static async createUser(req) {

        return await prisma.users.create({

            data: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                createdAt: new Date(),
                updatedAt: new Date()
            }

        });

    }

    static async updateUser(req) {

        const {id} = req.params;

        const user = await prisma.users.update({

            where: {
                id: id
            },

            data: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            }

        });

        if(!user) {
            return res.status(404).json({message: `Cannot find any user with ID ${id}`})
        }

        return await prisma.users.findUnique({

            where: {
                id: id
            }

        });

    }

    static async deleteUser(req, res) {

        const {id} = req.params;
        
        const user = await prisma.users.delete({

            where: {
                id: id
            }

        });

        if(!user) {
            return res.status(404).json({message: `Cannot find any user with ID ${id}`})
        }

        return user;
        
    }

}

module.exports = User;