const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { faker } = require('@faker-js/faker');

async function seed(req, res) {

    try {

        for (i = 0; i < 10; i++) {

            await prisma.products.create({

                data: {
                
                    name: faker.commerce.productName(),
                    quantity: Math.floor(Math.random() * 1000),
                    price: parseInt(faker.commerce.price()),
                    v: 0,
                    createdAt: new Date(),
                    updatedAt: new Date()

                }

            });

        }

        res.status(200).json({message: "Products table seeded !"});

    } catch (error) {

        console.log(error.message);
        res.status(500).json({message: error.message});

    }

}

async function index(req, res) {

    try {

        const products = await prisma.products.findMany()
        res.status(200).json({products})

    } catch (error) {

        res.status(500).json({message: error.message});

    }

}

async function read(req, res) {

    try {

        const id = req.params.id;
        
        const product = await prisma.products.findUnique({
            where: {
                id
            }
        });
        
        res.status(200).json(product);

    } catch (error) {

        res.status(500).json({message: error.message});

    }

}

async function store(req, res) {

    try {

        const product = await prisma.products.create({

            data: {
                name: req.body.name,
                quantity: parseInt(req.body.quantity),
                price: parseInt(req.body.price),
                image: req.body.image,
                v: 0,
                createdAt: new Date(),
                updatedAt: new Date()
            }

        });

        res.status(200).json(product);

    } catch (error) {

        console.log(error.message);
        res.status(500).json({message: error.message});

    }

}

async function update(req, res) {

    try {

        const {id} = req.params;

        const product = await prisma.products.update({

            where: {
                id: id
            },

            data: {
                name: req.body.name,
                quantity: req.body.quantity,
                price: req.body.price,
                image: req.body.image
            }

        });

        if(!product) {
            return res.status(404).json({message: `Cannot find any product with ID ${id}`})
        }

        const updatedProduct = await prisma.products.findUnique({

            where: {
                id: id
            }

        });

        res.status(200).json(updatedProduct);

    } catch (error) {

        res.status(500).json({message: error.message});

    }

}

async function remove(req, res) {

    try {

        const {id} = req.params;
        
        const product = await prisma.products.delete({

            where: {
                id: id
            }

        });

        if(!product) {
            return res.status(404).json({message: `Cannot find any product with ID ${id}`})
        }

        res.status(200).json(product);

    } catch (error) {

        res.status(500).json({message: error.message});

    }

}

module.exports = {seed, index, read, store, update, remove};