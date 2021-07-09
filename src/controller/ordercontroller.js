const Order = require('../models/Order');
const Menu = require('../Models/Menu');
const checker = require('../helper/objectIdChecker');


const makeOrder = async (req, res) => {
    /*
        {
            //header -> token
            "dishItems": ["{
                orderId: ,
                quantity : ,
                type: //0 or 1
            }"]
            "restId":""
        }
    */
    const { dishItems, restId } = req.body;
    const { _id, address } = req.user;
    if (!checker(restId))
        return res.status(303).json({
            status: 'ERROR',
            message: 'You should send right id',
        })
    else if (dishItems.length === 0)
        return res.status(303).json({
            status: 'ERROR',
            message: 'Your order is empty',
        })
    else if (!address) {
        return res.status(303).json({
            status: 'ERROR',
            message: 'You should add your address first',
        })
    }
    else {
        let menu = await Menu.findOne({ resturant: restId });

        if (!menu)
            return res.status(303).json({
                status: 'ERROR',
                message: 'Your resturant id is wrong',
            })
        else {
            let orderArr = [];
            let totalPrice = 0;
            for (i = 0; i < dishItems.length; i++) {
                let j;
                let item;
                if (dishItems[i].type == 0) {
                    for (j = 0; j < menu.dishes.length; j++) {
                        if (dishItems[i].orderId == menu.dishes[j]._id)
                            break;
                    }
                    item = menu.dishes[j];
                }
                else {
                    for (j = 0; j < menu.appetizers.length; j++) {
                        if (dishItems[i].orderId == menu.appetizers[j]._id)
                            break;
                    }
                    item = menu.appetizers[j]
                }
                totalPrice += item.price * dishItems[i].quantity;

                item = {
                    orderId: item._id,
                    name: item.name,
                    price: item.price,
                    quantity: dishItems[i].quantity
                };

                orderArr.push(item);
            }
            order = await new Order({
                user: _id,
                orderItem: orderArr,
                restId,
                totalPrice,
                address
            }).save();
            return res.status(200).json({
                order
            })

        }
    }
}

const getOrder = async (req, res) => {
    /*
    {
        ""
    }
    */

    const { orderId } = req.params;
    if (!checker(orderId)) {
        return res.status(303).json({
            status: 'ERROR',
            message: 'You should send right id',
        })
    }
    else {
        let order = await Order.findById(orderId);
        if (!order)
            return res.status(404).json({
                status: 'ERROR',
                message: 'Your order does not exist',
            })
        else
            return res.status(200).json({
                order
            })

    }
}

module.exports = { makeOrder ,getOrder}