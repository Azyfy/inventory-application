const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CarSchema = new Schema(
    {
        model: { type: String, required: true, maxlength: 20 },
        manufacturer: { type: Schema.Types.ObjectId, ref: "Manufacturer", required: true },
        category: { type: Schema.Types.ObjectId, ref: "Category" },
        m_year_start: { type: Number, min: 1886 },
        m_year_end: { type: Number, min: 1886 },
        horsepower: { type: Number, min: 1 },
        top_speed: { type: Number, min: 1 },
        price: { type: Number, min: 1, required: true }
    }
);

// Virtual for cars url
CarSchema
.virtual("url")
.get( function () {
    return "/inventory/car/" + this._id;
});

// Virtual for cars manufacturer-model name
CarSchema
.virtual("name")
.get( function () {
    return this.manufacturer + " " + this.model;
});


module.exports = mongoose.model("Car", CarSchema);