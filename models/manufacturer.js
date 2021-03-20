const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ManufacturerSchema = new Schema (
    {
        name: { type: String, required: true },
        car: { type: Schema.Types.ObjectId, ref: "Car", required: true },
        country: { type: String }
    }
);

// Virtual for manufacturer url
ManufacturerSchema
.virtual("url")
.get( function () {
    return "/inventory/manufacturer/" + this._id;
});

module.exports = mongoose.model("Manufacturer", ManufacturerSchema);