const Resturant = require('../models/Resturant');

const createResturant = async (req, res) => {
    const { name, logo, location ,info} = req.body;
    try {
        if (!name || !location)
            return res.status(500).json({
                status: 'ERROR',
                message: 'You should Add in a correct format'
            })
        const resturant = await new Resturant({
            name,
            logo,
            location,
            info
        }).save();

        return res.status(200).json({
            resturant
        });
    } catch (error) {
        console.log(error)
    }
}

const getResturant = async (req, res) => {
    const { restId } = req.params;
    const resturant = await Resturant.findOne({ _id: restId });

    if (!resturant)
        return res.status(404).json({
            status: 'ERROR',
            message: 'Not Found'
        })

    return res.status(200).json({
        resturant
    });
}

const getResturants = async (req, res) => {

    const resturants = await Resturant.find();

    if (!resturants)
        return res.status(404).json({
            status: 'ERROR',
            message: 'Not Found'
        })
    else
        return res.status(200).json({
            resturants
        });
}


module.exports = { createResturant, getResturant,getResturants }