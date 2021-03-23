const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CarInStockSchema = new Schema (
    {
        car: { type: Schema.Types.ObjectId, ref: "Car", required: true },
        in_stock: { type: Number, min: 1, required: true }
    }
);

//virtual for carinstock url
CarInStockSchema
.virtual("url")
.get( function () {
 return "/inventory/carsinstock/" + this._id;
});

module.exports = mongoose.model("CarInStock", CarInStockSchema);