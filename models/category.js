const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema (
    {
        car: { type: Schema.Types.ObjectId, ref: "Car", required: true },
        category: { type: String, required: true, enum: ["Exotic", "Muscle", "Tuner"] }
    }
);

// Virtual for category url
CategorySchema
.virtual("url")
.get( function () {
    return "/inventory/category/" + this._id;
});

module.exports = mongoose.model("Category", CategorySchema);

