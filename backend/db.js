const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/foodieemern';

const mongoDB = async () => {
    try {
        // Establish a connection to MongoDB
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true, // Use Unified Topology for better compatibility
        });
        console.log('Connected to MongoDB');

        // Fetch data from the collection after successful connection
        const fetched_data = mongoose.connection.db.collection('food_items'); // Use collection name as a string
        const data = await fetched_data.find({}).toArray();
        // Fetch data from the foodCategory collection after successful connection
        const foodCategory = mongoose.connection.db.collection('foodCategory');
        const catData = await foodCategory.find({}).toArray();
        
        // Store fetched data in a global variable for later use
        global.food_items=data;
        global.foodCategory = catData;

        // Log the fetched data for verification/Debugging.
        // console.log(global.food_items);
        //console.log('global.food_Category);
        

    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        
    }
};

module.exports = mongoDB;

//----------------------------------------------------------------------------------------------------------------

// const mongoose = require('mongoose');
// const mongoURI = 'mongodb://localhost:27017/foodieemern'
// const mongoDB = async() => {
//     await mongoose.connect(mongoURI, {useNewUrlParser:true},async(err,result) => {
//        if(err) console.log("---",err);
//         else{
//             console.log('connected to db');
//         const fetched_data=await mongoose.connection.db.collection(food_items);
//         fetched_data.find({}).toArray( function(err,data){
//             if(err) console.log(err);
//             else console.log(data)
//         })
//         }
//     });

// }

// module.exports = mongoDB;
// const Schema = mongoose.Schema;

//----Rashmi MAM mmethod
// mongoose.connect('mongodb://127.0.0.1:27017/foodiemern')
// .then(()=>{console.log('Connected successfully ')})
// .catch((err)=>{console.log("err")})          
