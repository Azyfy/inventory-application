const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CarSchema = new Schema(
    {
        model: { type: string, required: true, maxlength: 20 },
        manufacturer: { type: Schema.Types.ObjectId, ref: "Manufacturer", required: true },
        category: { type: Schema.Types.ObjectId, ref: "Category" },
        m_year_start: { type: number, min: 1886 },
        m_year_end: { type: number, min: 1886 },
        horsepower: { type: number, min: 1 },
        top_speed: { type: number, min: 1 }
    }
);

// Virtual for cars url
CarSchema
.virtual("url")
.get( function () {
    return "/inventory/car/" + this._id;
});

module.exports = mongoose.model("Car", CarSchema);