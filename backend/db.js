const mongoose = require('mongoose');
const mongoUri = "mongodb+srv://foodapp:foodapp@cluster0.mxx2dv5.mongodb.net/foodapp?retryWrites=true&w=majority&appName=Cluster0";
const mongoDB = async () => {
    await mongoose.connect(mongoUri, { useNewUrlParser: "true" }, async (err, result) => {
        if (err) console.log("----", err);
        else {
            console.log("connected");
            const fetch_data = await mongoose.connection.db.collection("foodapp")
            fetch_data.find({}).toArray(async function (err, data) {
                const foodCategory = await mongoose.connection.db.collection("foodcategory");
                foodCategory.find({}).toArray(function (err, catData) {
                    if (err) console.log(err);
                    else {
                        // declare food_item as a globally
                        global.food_items = data;
                        global.foodCategory = catData;
                    }
                });
               
            });

        }

    })
}
module.exports = mongoDB;
