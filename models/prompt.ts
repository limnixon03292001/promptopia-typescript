import { Schema, model, models } from "mongoose"

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required']
    },
    tag: {
        type: String,
        required: [true, 'Tag is required']
    }
})

//if prompt model exist use that, else create prompt model
const Prompt = models.Prompt || model('Prompt', PromptSchema)

export default Prompt