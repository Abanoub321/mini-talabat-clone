const Menu = require('../Models/Menu');
const checker = require('../helper/objectIdChecker');

const createMenu = async (req, res) => {
    /*
        "restId": ""
    */
    const { restId } = req.body;
    if (checker(restId)) {

        await Menu.findOne({ resturant: restId }, async (err, docs) => {
            if (err)
                return res.status(303).json({
                    status: 'ERROR',
                    message: err,
                })
            if (docs)
                return res.status(303).json({
                    status: 'ERROR',
                    message: 'Menu already exist, You should modify it',
                })
            else {
                let menu = await new Menu(
                    {
                        resturant: restId,
                        dishes: [],
                        appetizers: []
                    }
                ).save();
                if (menu)
                    return res.status(200).json({
                        menu
                    });
            }
        });
    }
    else {
        return res.status(303).json({
            status: 'ERROR',
            message: 'You should send right id',
        })
    }
}


const getMenu = async (req, res) => {
    /*
       "restId": ""
   */
    const { restId } = req.params;

    if (!checker(restId)) {
        return res.status(303).json({
            status: 'ERROR',
            message: 'You should send right id',
        })
    }
    else {

        const menu = await Menu.findOne({ resturant: restId });
        if (menu)
            return res.status(200).json({
                menu
            });
        else
            return res.status(404).json({
                status: 'ERROR',
                message: 'Menu does not exist',
            })
    }
}

const updateMenu = async (req, res) => {
    /*
        {
            menuId,
            dishes :[ {name,price}],
            appitizer :[{name,price}]
        }
    */
    const { menuId, dishes, appetizers } = req.body;

    if (!checker(menuId)) {
        return res.status(303).json({
            status: 'ERROR',
            message: 'You should send right id',
        })
    }
    else {
        await Menu.findOneAndUpdate(
            { _id: menuId },
            {
                $addToSet: {
                    dishes,
                    appetizers
                }
            },
            {
                new: true
            }
            ,
            (err, doc) => {
                if (err)
                    return res.status(303).json({
                        status: 'ERROR',
                        message: err,
                    })
                else if (!doc) {
                    return res.status(404).json({
                        status: 'ERROR',
                        message: 'Menu does not exist',
                    })
                }
                else
                    return res.status(200).json({
                        menu: doc
                    });
            }
        );
    }

}

const deleteFromMenu = async (req, res) => {
    /*
    {
        "menuId":"",
        itemId : "",
        arrayId : , //0 -> dish //1->appetizers
    }
    */
    const { menuId, itemId, arrayId } = req.body;
    let arr = "";
    switch (arrayId) {
        case 0:
            arr = "dishes";
            break;
        case 1:
            arr = "appetizers";
            break;
        default:
            return res.status(303).json({
                status: 'ERROR',
                message: "You have sent wrong id",
            })
    }

    if (!checker(menuId) || !checker(itemId)) {
        return res.status(303).json({
            status: 'ERROR',
            message: 'You should send right id',
        })
    }
    else {
        await Menu.findOneAndUpdate(
            {
                _id: menuId
            },
            {
                "$pull": {
                    [arr]: {_id:itemId}
                }
            },
            {
                new: true
            },
            (err, doc) => {
                if (err)
                    return res.status(303).json({
                        status: 'ERROR',
                        message: err,
                    })
                else if (!doc) {
                    return res.status(404).json({
                        status: 'ERROR',
                        message: 'Menu does not exist',
                    })
                }
                else
                    return res.status(200).json({
                        menu: doc
                    });
            }
        )
    }
}


module.exports = { createMenu, getMenu, updateMenu, deleteFromMenu }